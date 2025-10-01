import { ESIOSApiClient } from "./esios-api-client.class";

import { Indicator } from "./indicator/indicator.class";
import { PVPCDay } from "./pvpc/pvpc-day.class";

import { IndicatorID, Geo, Time } from "../enums";
import { PVPCDayZonedGeneral } from "./pvpc/pvpc-day-zoned-general.class";
import { PVPCDayZonedSpecial } from "./pvpc/pvpc-day-zoned-special.class";

describe('ESIOSApiClient class', () => {
    describe('ESIOSApiClient instance', () => {
        it('should instance', () => {
            const instance = new ESIOSApiClient();

            expect(instance).toBeInstanceOf(ESIOSApiClient);
        });
    })

    describe('archives', () => {
        describe('pvpc', () => {
            it('should throw an error if date is early of new gen', async () => {
                const instance = new ESIOSApiClient();
                const date = new Date('2021/05/31');

                await expect(instance.archives.pvpc(date)).rejects.toThrow('Date is too early. Only supported from 2021-06-01');
            });

            it('should throw an error if date is invalid', async () => {
                const instance = new ESIOSApiClient();
                const date = new Date('2023/06/32');

                await expect(instance.archives.pvpc(date)).rejects.toThrow('Invalid time value');
            });

            it('should throw an error if date is for tomorrow or later, depend of hour', async () => {
                const instance = new ESIOSApiClient();
                const afterTwoDays = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

                await expect(instance.archives.pvpc(afterTwoDays)).rejects.toThrow('No values for specified archive');
            });


            it('should return a PVPCDay instance', async () => {
                const instance = new ESIOSApiClient();
                const date = new Date('2023/06/01');
                const result = await instance.archives.pvpc(date);

                expect(result).toBeInstanceOf(PVPCDay);
            });

            it('should return a valid PVPCDay before 01-10-2025', async () => {
                const instance = new ESIOSApiClient();
                const date = new Date('2025/09/30');
                const result = await instance.archives.pvpc(date);

                expect(result).toBeInstanceOf(PVPCDay);
                expect(result.date).toStrictEqual(new Date('2025-09-30T00:00:00.000Z'));
                expect(result.general).toBeInstanceOf(PVPCDayZonedGeneral);
                expect(result.special).toBeInstanceOf(PVPCDayZonedSpecial);

                expect(result.general.hours.length).toBe(24);
                expect(result.special.hours.length).toBe(24);
            });

            it('should return a valid PVPCDay for 01-10-2025', async () => {
                const instance = new ESIOSApiClient();
                const date = new Date('2025/10/01');
                const result = await instance.archives.pvpc(date);

                expect(result).toBeInstanceOf(PVPCDay);
                expect(result.date).toStrictEqual(new Date('2025-10-01T00:00:00.000Z'));
                expect(result.general).toBeInstanceOf(PVPCDayZonedGeneral);
                expect(result.special).toBeInstanceOf(PVPCDayZonedSpecial);

                expect(result.general.hours.length).toBe(24);
                expect(result.special.hours.length).toBe(24);
            });
        });
    });

    describe('indicators', () => {
        describe('pvpc', () => {
            it('should throw an error if authentication fails', async () => {
                const instance = new ESIOSApiClient();
                instance['loadAuthentication'] = async () => undefined;

                await expect(instance.indicators.pvpc(new Date(), Geo.ES)).rejects.toThrow('Could not load authentication');
            });

            it('should return an Indicator instance', async () => {
                const instance = new ESIOSApiClient();
                const date = new Date('2023/06/01');
                const result = await instance.indicators.pvpc(date, Geo.ES);

                expect(result).toBeInstanceOf(Indicator);
            });

            it('should get a valid pvpc indicator before 01-10-2025', async () => {
                const instance = new ESIOSApiClient();
                const date = new Date('2025/09/30');
                const result = await instance.indicators.pvpc(date, Geo.PENINSULA);

                expect(result).toBeInstanceOf(Indicator);
                expect(result.id).toBe(Number(IndicatorID.PVPC));
                expect(result.composited).toBe(false);
                expect(result.stepType).toBe('linear');
                expect(result.disaggregated).toBe(true);
                expect(result.magnitude[0].id).toBe(23);
                expect(result.time[0].id).toBe(Time.HOUR);
                expect(result.geos.length).toBe(1);
                expect(result.geos[0].id).toBe(Geo.PENINSULA);
                expect(result.values.length).toBe(24);
            });

            it('should get a valid pvpc indicator for 01-10-2025', async () => {
                const instance = new ESIOSApiClient();
                const date = new Date('2025/10/01');
                const result = await instance.indicators.pvpc(date, Geo.PENINSULA);

                expect(result).toBeInstanceOf(Indicator);
                expect(result.id).toBe(Number(IndicatorID.PVPC));
                expect(result.composited).toBe(false);
                expect(result.stepType).toBe('linear');
                expect(result.disaggregated).toBe(true);
                expect(result.magnitude[0].id).toBe(23);
                expect(result.time[0].id).toBe(Time.HOUR);
                expect(result.geos.length).toBe(1);
                expect(result.geos[0].id).toBe(Geo.PENINSULA);
                expect(result.values.length).toBe(24);
            });
        });

        describe('spot', () => {
            it('should throw an error if authentication fails', async () => {
                const instance = new ESIOSApiClient();
                instance['loadAuthentication'] = async () => undefined;

                await expect(instance.indicators.spot(new Date(), Geo.ES)).rejects.toThrow('Could not load authentication');
            });

            it('should return an Indicator instance', async () => {
                const instance = new ESIOSApiClient();
                const date = new Date('2023/06/01');
                const result = await instance.indicators.spot(date, Geo.ES);

                expect(result).toBeInstanceOf(Indicator);
            });

            it.only('should get a valid spot indicator before 01-10-2025', async () => {
                const instance = new ESIOSApiClient();
                const date = new Date('2025/09/30');
                const result = await instance.indicators.spot(date, Geo.ES);

                expect(result).toBeInstanceOf(Indicator);
                expect(result.id).toBe(Number(IndicatorID.SPOT));
                expect(result.composited).toBe(false);
                expect(result.stepType).toBe('linear');
                expect(result.disaggregated).toBe(true);
                expect(result.magnitude[0].id).toBe(23);
                expect(result.time[0].id).toBe(Time.HOUR);
                expect(result.geos.length).toBe(1);
                expect(result.geos[0].id).toBe(Geo.ES);
                expect(result.values.length).toBe(24);
            });

            it('should get a valid spot indicator for 01-10-2025', async () => {
                const instance = new ESIOSApiClient();
                const date = new Date('2025/10/01');
                const result = await instance.indicators.spot(date, Geo.ES);

                expect(result).toBeInstanceOf(Indicator);
                expect(result.id).toBe(Number(IndicatorID.SPOT));
                expect(result.composited).toBe(false);
                expect(result.stepType).toBe('linear');
                expect(result.disaggregated).toBe(true);
                expect(result.magnitude[0].id).toBe(23);
                expect(result.time[0].id).toBe(Time.QUARTER);
                expect(result.geos.length).toBe(1);
                expect(result.geos[0].id).toBe(Geo.ES);
                expect(result.values.length).toBe(24 * 4);
            });
        });
    });
});