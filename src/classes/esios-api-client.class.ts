import { IPVPCDay } from "../interfaces/pvpc-day.interface";
import { PVPCDay } from "./pvpc-day.class";

export class ESIOSApiClient {
    private readonly baseUrl = 'https://api.esios.ree.es';
    constructor() {
        console.log('ESIOSApiClient');
    }

    public archives = {
        pvpc: async (date: Date, locale: 'es' | 'en' = 'es'): Promise<PVPCDay> => {
            // Min date is 2021/06/01, before have another format
            const minDate = new Date('2021/06/01');
            // Check it
            if (date < minDate) {
                throw new Error('Date is too early. Only supported from 2021-06-01');
            }
            // Archive ID to get
            const ARCHIVE_ID = '70';
            const [ formatted ] = date.toISOString().split("T")[0];
            const params = new URLSearchParams({
                date: formatted,
                locale
            });
            // Format url
            const url = `${this.baseUrl}/archives/${ARCHIVE_ID}?${params.toString()}`;

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Error fetching archives');
                }

                const json = await response.json() as IPVPCDay;

                return new PVPCDay(json);
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching archives');
            }
        }
    }
}