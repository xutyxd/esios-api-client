export function formatDate(date: Date): string {
    const formatter = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Europe/Madrid'
    });
    const parts = formatter.formatToParts(date);
    const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));

    // Manually build YYYY-MM-DD HH:mm:ss +offset
    const tzOffsetMinutes = new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/Madrid', timeZoneName: 'shortOffset' })
        .match(/GMT([+-]\d{2})(\d{2})?/);

    const sign = tzOffsetMinutes ? tzOffsetMinutes[1][0] : '+';
    const tzHours = tzOffsetMinutes ? tzOffsetMinutes[1].padStart(2, '0') : '00';
    const tzMinutes = tzOffsetMinutes && tzOffsetMinutes[2] ? tzOffsetMinutes[2].padStart(2, '0') : '00';

    return `${lookup.year}-${lookup.month}-${lookup.day} ${lookup.hour}:${lookup.minute}:${lookup.second} ${sign}${tzHours}${tzMinutes}`;
}