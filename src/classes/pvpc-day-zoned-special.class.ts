import { IPVPCHour } from "../interfaces/pvpc-hour.interface";
import { PVPCDayZoned } from "./pvpc-day-zoned.class";

export class PVPCDayZonedSpecial extends PVPCDayZoned {
    constructor(hours: IPVPCHour[]) {
        const normalized = hours.map((hour) => {
            return {
                day: hour.Dia,
                hour: hour.Hora,
                total: hour.CYM,
                ccv: hour.CCVCYM,
                cof2TD: hour.COF2TD,
                edsr: hour.EDSRCYM,
                fom: hour.FOMCYM,
                fos: hour.FOSCYM,
                int: hour.INTCYM,
                pcap: hour.PCAPCYM,
                pmh: hour.PMHCYM,
                sah: hour.SAHCYM,
                tah: hour.TAHCYM,
                teu: hour.TEUCYM
            };
        });

        super(normalized);
    }
}