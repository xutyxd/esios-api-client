import { IPVPCHour } from "../interfaces/pvpc-hour.interface";
import { PVPCDayZoned } from "./pvpc-day-zoned.class";

export class PVPCDayZonedGeneral extends PVPCDayZoned {
    constructor(hours: IPVPCHour[]) {
        const normalized = hours.map((hour) => {
            return {
                day: hour.Dia,
                hour: hour.Hora,
                total: hour.PCB,
                ccv: hour.CCVPCB,
                cof2TD: hour.COF2TD,
                edsr: hour.EDSRPCB,
                fom: hour.FOMPCB,
                fos: hour.FOSPCB,
                int: hour.INTPCB,
                pcap: hour.PCAPPCB,
                pmh: hour.PMHPCB,
                sah: hour.SAHPCB,
                tah: hour.TAHPCB,
                teu: hour.TEUPCB
            };
        });

        super(normalized);
    }
}