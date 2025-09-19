import { IPVPCHourNormalized } from "../interfaces/pvpc-hour-normalized.interface";
import { PVPCHour } from "./pvpc-hour.class";

export class PVPCDayZoned {
    public hours: PVPCHour[];

    public min: PVPCHour;
    public max: PVPCHour;

    constructor(normalized: IPVPCHourNormalized[]) {
        this.hours = normalized.map((hour) => new PVPCHour(hour));
        this.min = this.hours.reduce((min, hour) => hour.price < min.price ? hour : min);
        this.max = this.hours.reduce((max, hour) => hour.price > max.price ? hour : max);
    }
}