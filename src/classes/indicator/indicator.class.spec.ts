import { Indicator } from "./indicator.class"

import dayPVPCBefore from '../../../mocks/indicator-pvpc-30-09-2025.json';
import dayPVPCChange from '../../../mocks/indicator-pvpc-01-10-2025.json';

import daySpotBefore from '../../../mocks/indicator-spot-30-09-2025.json';
import daySpotChange from '../../../mocks/indicator-spot-01-10-2025.json';

describe('Indicator class', () => {
    describe('Indicator instance', () => {
        it('should instance with PVPC before 01-10-2025', () => {
            const instance = new Indicator(dayPVPCBefore.indicator);

            expect(instance).toBeInstanceOf(Indicator);
        });

        it('should instance with PVPC for 01-10-2025', () => {
            const instance = new Indicator(dayPVPCChange.indicator);

            expect(instance).toBeInstanceOf(Indicator);
        });

        it('should instance with spot before 01-10-2025', () => {
            const instance = new Indicator(daySpotBefore.indicator);

            expect(instance).toBeInstanceOf(Indicator);
        });

        it('should instance with spot for 01-10-2025', () => {
            const instance = new Indicator(daySpotChange.indicator);

            expect(instance).toBeInstanceOf(Indicator);
        });
    });
});