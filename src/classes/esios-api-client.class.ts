
import { ArchiveID } from "../enums";
import { Geo } from "../enums/geo.enum";
import { IndicatorID } from "../enums/indicator-id.enum";
import { getSpanishDayRange } from "../functions/date-formatter.function";
import { IIndicator } from "../interfaces/indicator/indicator.interface";

import { IPVPCDay } from "../interfaces/pvpc/pvpc-day.interface";
import { Indicator } from "./indicator/indicator.class";
import { PVPCDay } from "./pvpc/pvpc-day.class";

export class ESIOSApiClient {
    private readonly baseUrl = 'https://api.esios.ree.es';
    private authentication?: string;

    private formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    constructor() { }

    private async loadAuthentication() {
        if (this.authentication) {
            return this.authentication;
        }

        try {
            const url = 'https://www.esios.ree.es/environment.json'
            const response = await fetch(url);
            const json = await response.json() as Partial<{ API_X_KEY: string }>;

            this.authentication = json.API_X_KEY;
        } catch { }

        return this.authentication;
    }

    public auth = {
        set: (key: string) => {
            this.authentication = key;
        },
        get: () => {
            return this.authentication;
        }
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
            const action = 'download_json';
            // Use formatter to get date for Spain
            const parts = this.formatter.formatToParts(date);
            const day = parts.find(p => p.type === "day")?.value;
            const month = parts.find(p => p.type === "month")?.value;
            const year = parts.find(p => p.type === "year")?.value;
            const formatted = `${year}-${month}-${day}`

            const params = new URLSearchParams({
                date: formatted,
                locale
            });
            // Format url
            const url = `${this.baseUrl}/archives/${ArchiveID.PVPC}/${action}?${params.toString()}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw 'Something went wrong';
                }

                const json = await response.json() as IPVPCDay | { message: string };

                if ('message' in json) {
                    throw json.message;
                }

                return new PVPCDay(json);
            } catch (error) {
                throw new Error(typeof error === 'string' ? error : 'Error fetching archives');
            }
        }
    }

    public indicators = {
        it: async (indicator: `${number}`, date: Date, geo: Geo, locale: 'es' | 'en' = 'es') => {
            const authentication = await this.loadAuthentication();

            if (!authentication) {
                throw new Error('Could not load authentication');
            }

            const { start: start_date, end: end_date } = getSpanishDayRange(date);

            const params = new URLSearchParams({
                start_date,
                end_date,
                "geo_ids[]": `${geo}`,
                locale
            });

            const url = `${this.baseUrl}/indicators/${indicator}?${params.toString()}`;

            try {
                const response = await fetch(url, {
                    headers: {
                        'x-api-key': `${authentication}`
                    }
                });
                if (!response.ok) {
                    throw 'Something went wrong';
                }

                const json = await response.json() as { indicator: IIndicator } | { message: string };

                if ('message' in json) {
                    throw json.message;
                }

                return new Indicator(json.indicator);
            } catch (error) {
                console.log(error);
                throw new Error(typeof error === 'string' ? error : 'Error fetching indicator');
            }
        },
        pvpc: async (date: Date, geo: Geo, locale: 'es' | 'en' = 'es') => {
            return this.indicators.it(IndicatorID.PVPC, date, geo, locale);
        },
        spot: async (date: Date, geo: Geo, locale: 'es' | 'en' = 'es') => {
            return this.indicators.it(IndicatorID.SPOT, date, geo, locale);
        }
    }
}