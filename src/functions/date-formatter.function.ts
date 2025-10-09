const pad = (n: number) => String(n).padStart(2, '0');

function findUtcForLocal(
    y: number, m: number, d: number, hh: number, mm: number, ss: number, timeZone = 'Europe/Madrid'
): number {
    const fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
    const guess = Date.UTC(y, m - 1, d, hh, mm, ss);
    // search ±48h in 1-minute steps to find the UTC instant whose representation in the timezone matches the target local fields
    const stepMs = 60_000;
    const rangeMinutes = 48 * 60;
    for (let i = -rangeMinutes; i <= rangeMinutes; i++) {
        const t = guess + i * stepMs;
        const parts = fmt.formatToParts(new Date(t));
        const get = (type: string) => parts.find(p => p.type === type)?.value;
        if (
            Number(get('year')) === y &&
            Number(get('month')) === m &&
            Number(get('day')) === d &&
            Number(get('hour')) === hh &&
            Number(get('minute')) === mm &&
            Number(get('second')) === ss
        ) return t;
    }
    throw new Error('Could not resolve UTC instant for local time (unexpected)');
}

function offsetMinutesForInstant(date: Date, timeZone = 'Europe/Madrid'): number {
    // first try to parse timeZoneName (formats like "GMT+02:00", "UTC+2", "+0200")
    const tzNameParts = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'shortOffset' }).formatToParts(date);
    const tzName = tzNameParts.find(p => p.type === 'timeZoneName')?.value ?? '';

    const m = tzName.match(/(?:GMT|UTC)?\s*([+-])\s*(\d{1,2})(?::?(\d{2}))?/i);
    if (m) {
        const sign = m[1] === '-' ? -1 : 1;
        const hours = Number(m[2]);
        const mins = m[3] ? Number(m[3]) : 0;

        return sign * (hours * 60 + mins);
    }

    // fallback: numeric computation using formatToParts
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).formatToParts(date);
    const get = (t: string) => Number(parts.find(p => p.type === t)!.value);
    const Y = get('year'), Mo = get('month'), D = get('day'), H = get('hour'), Mi = get('minute'), S = get('second');
    const utcForLocal = Date.UTC(Y, Mo - 1, D, H, Mi, S);
    return Math.round((utcForLocal - date.getTime()) / 60000);
}

function formatInstantAsMadridString(ms: number): string {
    const timeZone = 'Europe/Madrid';
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).formatToParts(new Date(ms));

    const get = (t: string) => parts.find(p => p.type === t)!.value;
    const Y = get('year'), Mo = get('month'), D = get('day'),
        H = get('hour'), Mi = get('minute'), S = get('second');

    const off = offsetMinutesForInstant(new Date(ms), timeZone);
    const sign = off >= 0 ? '+' : '-';
    const abs = Math.abs(off);
    const oh = pad(Math.floor(abs / 60));
    const om = pad(abs % 60);

    return `${Y}-${Mo}-${D} ${H}:${Mi}:${S} ${sign}${oh}${om}`;
}

/**
 * Returns start and end of the given date in Spain (Europe/Madrid),
 * formatted as "YYYY-MM-DD HH:mm:ss +ZZZZ".
 *
 * @param baseDate - Date or date-string for which to compute the Madrid day range
 */
export function getSpanishDayRange(baseDate: Date | string) {
    const d = typeof baseDate === 'string' ? new Date(baseDate) : baseDate;
    const timeZone = 'Europe/Madrid';

    // extract Madrid Y/M/D for the provided date
    const dateParts = new Intl.DateTimeFormat('en-GB', {
        timeZone, year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(d);
    const y = Number(dateParts.find(p => p.type === 'year')!.value);
    const mo = Number(dateParts.find(p => p.type === 'month')!.value); // 1..12
    const day = Number(dateParts.find(p => p.type === 'day')!.value);

    // find exact UTC instants that correspond to local 00:00:00 and 23:59:59 Madrid time
    const startMs = findUtcForLocal(y, mo, day, 0, 0, 0, timeZone);
    const endMs = findUtcForLocal(y, mo, day, 23, 59, 59, timeZone);

    return {
        start: formatInstantAsMadridString(startMs),
        end: formatInstantAsMadridString(endMs)
    };
}
