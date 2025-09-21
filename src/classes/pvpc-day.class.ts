import { IPVPCDay } from "../interfaces/pvpc-day.interface";
import { PVPCDayZonedGeneral } from "./pvpc-day-zoned-general.class";
import { PVPCDayZonedSpecial } from "./pvpc-day-zoned-special.class";

export class PVPCDay {
    public date: Date;
    public general: PVPCDayZonedGeneral;
    public special: PVPCDayZonedSpecial;

    constructor(day: IPVPCDay) {
        this.date = new Date(day.PVPC[0].Dia);
        this.general = new PVPCDayZonedGeneral(day.PVPC);
        this.special = new PVPCDayZonedSpecial(day.PVPC);
    }
}