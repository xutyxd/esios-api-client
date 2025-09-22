import { IPVPCDay } from "../../interfaces/pvpc/pvpc-day.interface";
import { PVPCDayZonedGeneral } from "./pvpc-day-zoned-general.class";
import { PVPCDayZonedSpecial } from "./pvpc-day-zoned-special.class";

export class PVPCDay {
    public date: Date;
    public general: PVPCDayZonedGeneral;
    public special: PVPCDayZonedSpecial;

    constructor(date: IPVPCDay) {
        const [day, month, year] = date.PVPC[0].Dia.split("/");

        this.date = new Date([year, month, day].join("-"));
        this.general = new PVPCDayZonedGeneral(date.PVPC);
        this.special = new PVPCDayZonedSpecial(date.PVPC);
    }
}