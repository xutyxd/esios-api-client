import { IPVPCHourNormalized } from "../interfaces/pvpc-hour-normalized.interface";
import { PVPCHour } from "./pvpc-hour.class";

export class PVPCDayZoned {
    public hours: PVPCHour[];

    public min: PVPCHour;
    public max: PVPCHour;

    public average: number;

    constructor(normalized: IPVPCHourNormalized[]) {
        const [day, month, year] = normalized[0].day.split("/");
        const date = new Date([year, month, day].join("-")).toISOString().split("T")[0];

        this.hours = normalized.map((hour) => new PVPCHour({ ...hour, day: date }));
        this.min = this.hours.reduce((min, hour) => hour.price < min.price ? hour : min);
        this.max = this.hours.reduce((max, hour) => hour.price > max.price ? hour : max);

        this.average = this.hours.reduce((total, { price }) => total + price, 0) / this.hours.length;
    }
}