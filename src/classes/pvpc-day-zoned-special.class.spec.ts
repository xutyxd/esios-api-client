import { PVPCDayZonedSpecial } from "./pvpc-day-zoned-special.class";
import { PVPCHour } from "./pvpc-hour.class";

import day from '../../mocks/01-06-2021.json';

describe('PVPCDayZonedSpecial class', () => {
    describe('PVPCDayZonedSpecial instance', () => {
        it('should instance', () => {
            const instance = new PVPCDayZonedSpecial(day.PVPC);

            expect(instance).toBeInstanceOf(PVPCDayZonedSpecial);
        });
    })

    describe('PVPCDayZonedSpecial hours', () => {
        it('should return an array of PVPCHour', () => {
            const instance = new PVPCDayZonedSpecial(day.PVPC);
            expect(instance.hours).toBeInstanceOf(Array);
            expect(instance.hours.length).toBe(24);
            expect(instance.hours[0]).toBeInstanceOf(PVPCHour);
        });

        it('should calculate min', () => {
            const instance = new PVPCDayZonedSpecial(day.PVPC);

            expect(instance.min).toBeInstanceOf(PVPCHour);
            expect(instance.min.price).toBe(114.84);
            expect(instance.min.hour).toBe(4);
        });

        it('should calculate max', () => {
            const instance = new PVPCDayZonedSpecial(day.PVPC);

            expect(instance.max).toBeInstanceOf(PVPCHour);
            expect(instance.max.price).toBe(249.41);
            expect(instance.max.hour).toBe(22);
        });

        it('should calculate average', () => {
            const instance = new PVPCDayZonedSpecial(day.PVPC);

            expect(instance.average).toBe(166.77833333333334);
        });
    });
});