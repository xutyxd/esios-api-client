import { IndicatorValue } from "./indicator-value.class"

import dayPVPCBefore from '../../../mocks/indicator-pvpc-30-09-2025.json';
import dayPVPCChange from '../../../mocks/indicator-pvpc-01-10-2025.json';

import daySpotBefore from '../../../mocks/indicator-spot-30-09-2025.json';
import daySpotChange from '../../../mocks/indicator-spot-01-10-2025.json';

describe('IndicatorValue class', () => {
    describe('IndicatorValue instance', () => {
        it('should instance with PVPC before 01-10-2025', () => {
            const instance = new IndicatorValue(dayPVPCBefore.indicator.values[2]);

            expect(instance).toBeInstanceOf(IndicatorValue);
        });

        it('should instance with PVPC for 01-10-2025', () => {
            const instance = new IndicatorValue(dayPVPCChange.indicator.values[2]);

            expect(instance).toBeInstanceOf(IndicatorValue);
        });

        it('should instance with spot before 01-10-2025', () => {
            const instance = new IndicatorValue(daySpotBefore.indicator.values[2]);

            expect(instance).toBeInstanceOf(IndicatorValue);
        });

        it('should instance with spot for 01-10-2025', () => {
            const instance = new IndicatorValue(daySpotChange.indicator.values[2]);

            expect(instance).toBeInstanceOf(IndicatorValue);
        });
    });
});