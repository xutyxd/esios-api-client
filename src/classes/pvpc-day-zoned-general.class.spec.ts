import { PVPCDayZonedGeneral } from "./pvpc-day-zoned-general.class";
import { PVPCHour } from "./pvpc-hour.class";

import day from '../../mocks/01-06-2021.json';

describe('PVPCDayZonedGeneral class', () => {
    describe('PVPCDayZonedGeneral instance', () => {
        it('should instance', () => {
            const instance = new PVPCDayZonedGeneral(day.PVPC);

            expect(instance).toBeInstanceOf(PVPCDayZonedGeneral);
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
            expect(instance.min.price).toBe(114.84);
            expect(instance.min.hour).toBe(4);
        });

        it('should calculate max', () => {
            const instance = new PVPCDayZonedGeneral(day.PVPC);

            expect(instance.max).toBeInstanceOf(PVPCHour);
            expect(instance.max.price).toBe(248.08);
            expect(instance.max.hour).toBe(21);
        });

        it('should calculate average', () => {
            const instance = new PVPCDayZonedGeneral(day.PVPC);

            expect(instance.average).toBe(166.77124999999998);
        });
    });
});