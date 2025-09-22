export function formatDate(date: Date): string {
    // Pad helper
    const pad = (number: number, width = 2) => String(number).padStart(width, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are 0-based
    const day = pad(date.getDate());

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    // Timezone offset in minutes
    const tzOffset = -date.getTimezoneOffset(); // inverted sign
    const sign = tzOffset >= 0 ? '+' : '-';
    const tzHours = pad(Math.floor(Math.abs(tzOffset) / 60));
    const tzMinutes = pad(Math.abs(tzOffset) % 60);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${sign}${tzHours}${tzMinutes}`;
}