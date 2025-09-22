import { PVPCDayZonedGeneral } from "./pvpc-day-zoned-general.class";
import { PVPCHour } from "./pvpc-hour.class";

import day from '../../mocks/21-09-2025.json';

describe('PVPCDayZonedGeneral class', () => {
    describe('PVPCDayZonedGeneral instance', () => {
        it('should instance', () => {
            const instance = new PVPCDayZonedGeneral(day.PVPC);

            expect(instance).toBeInstanceOf(PVPCDayZonedGeneral);
            expect(instance.hours.length).toBe(24);
            expect(instance.min.day).toStrictEqual(new Date('2025-09-21'));
            expect(instance.max.day).toStrictEqual(new Date('2025-09-21'));
            expect(instance.min.raw.day).toStrictEqual('2025-09-21');
            expect(instance.max.raw.day).toStrictEqual('2025-09-21');
        });
    })

    describe('PVPCDayZonedGeneral hours', () => {
        it('should return an array of PVPCHour', () => {
            const instance = new PVPCDayZonedGeneral(day.PVPC);

            expect(instance.hours).toBeInstanceOf(Array);
            expect(instance.hours.length).toBe(24);
            expect(instance.hours[0]).toBeInstanceOf(PVPCHour);
        });

        it('should calculate min', () => {
            const instance = new PVPCDayZonedGeneral(day.PVPC);

            expect(instance.min).toBeInstanceOf(PVPCHour);
            expect(instance.min.price).toBe(57.51);
            expect(instance.min.hour).toBe(14);
        });

        it('should calculate max', () => {
            const instance = new PVPCDayZonedGeneral(day.PVPC);

            expect(instance.max).toBeInstanceOf(PVPCHour);
            expect(instance.max.price).toBe(149.08);
            expect(instance.max.hour).toBe(7);
        });

        it('should calculate average', () => {
            const instance = new PVPCDayZonedGeneral(day.PVPC);

            expect(instance.average).toBe(103.02083333333331);
        });
    });
});