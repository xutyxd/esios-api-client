import { ESIOSApiClient } from "./esios-api-client.class";
import { PVPCDay } from "./pvpc-day.class";

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
        });
    });
});