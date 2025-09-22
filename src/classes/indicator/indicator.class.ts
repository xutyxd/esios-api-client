import { IIndicatorValue } from "../../interfaces/indicator/indicator-value.interface";
import { IIndicator } from "../../interfaces/indicator/indicator.interface";
import { IGeo, IMagnitude, ITime } from "../../interfaces/shared";

export class Indicator {
    public name: string;
    public short_name: string;
    public id: number;
    public composited: boolean;
    public step_type: string;
    public disaggregated: boolean;
    public magnitud: IMagnitude[];
    public tiempo: ITime[];
    public geos: IGeo[];
    public values_updated_at: string;
    public values: IIndicatorValue[];

    constructor(json: IIndicator) {
        this.name = json.name;
        this.short_name = json.short_name;
        this.id = json.id;
        this.composited = json.composited;
        this.step_type = json.step_type;
        this.disaggregated = json.disaggregated;
        this.magnitud = json.magnitud;
        this.tiempo = json.tiempo;
        this.geos = json.geos;
        this.values_updated_at = json.values_updated_at;
        this.values = json.values;
    }
}