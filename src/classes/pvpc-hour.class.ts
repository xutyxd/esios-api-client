import { IPVPCHourNormalized } from "../interfaces/pvpc-hour-normalized.interface";

export class PVPCHour {
    public readonly day: Date;
    public readonly hour: number;
    public readonly price: number;

    constructor(hour: IPVPCHourNormalized) {
        this.day = new Date(hour.day);
        this.hour = Number(hour.hour.split('-')[0]);
        this.price = Number(hour.total.replace(',', '.'));
    }
}