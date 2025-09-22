import { IPVPCHourNormalized } from "../../interfaces/pvpc/pvpc-hour-normalized.interface";

export class PVPCHour {
    public readonly raw: IPVPCHourNormalized;
    public readonly day: Date;
    public readonly hour: number;
    public readonly price: number;

    constructor(hour: IPVPCHourNormalized) {
        this.raw = hour;

        this.day = new Date(hour.day);
        this.hour = Number(hour.hour.split('-')[0]);
        this.price = Number(hour.total.replace(',', '.'));
    }
}