
import { Geo } from "../../enums/geo.enum";
import { IIndicatorValue } from "../../interfaces/indicator/indicator-value.interface";

export class IndicatorValue {
    public value: number;
    public dates: { utc: string, local: string };
    public geo: Geo;

    constructor(json: IIndicatorValue) {
        this.value = json.value;
        this.dates = { utc: json.datetime_utc, local: json.datetime };
        this.geo = json.geo_id as Geo;
    }
}