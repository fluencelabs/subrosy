import { get_health } from '../aqua/main';
import { ServiceHealthCheckProps } from '../components/ServiceHealthCheck';

type Unarray<T> = T extends Array<infer U> ? U : T;

export type HealthCheck = Unarray<Unarray<Awaited<ReturnType<typeof get_health>>>>;

const mockdata = [
    {
        peer_id: '12D3KooWHCJbJKGDfCgHSoCuK9q4STyRnVveqLoXAPBbXHTZx9Cv',
        services: [
            '6c283abf-735d-4c5b-8ee3-ab6f97e19fe9',
            '7416f7ae-0a0d-42ac-9223-6ce36a75aa8e',
            '62a0064c-e35a-4d31-82bc-b4600daba34c',
            'be919e08-2b06-475a-9b2f-ad8773c90f3a',
        ],
    },
    {
        peer_id: '12D3KooWMigkP4jkVyufq5JnDJL6nXvyjeaDNpRfEZqQhsG3sYCU',
        services: [
            '34e85d52-b0ad-454f-a48d-0eb79507cdf7',
            '677b2962-9160-422a-869e-bd30d02b9ff4',
            '875e2067-5a58-4b57-9fbe-73b17869e4d7',
            '91bf0b97-301a-4dfe-bcec-72fdb225374b',
        ],
    },
    {
        peer_id: '12D3KooWMMGdfVEJ1rWe1nH1nehYDzNEHhg5ogdfiGk88AupCMnf',
        services: [
            '45911408-c685-4b6a-8152-12eddc1d7d51',
            'b4dfb14d-d70a-44ae-8113-56b856c9531c',
            '07da3bb3-4507-41f4-ae88-ee115e2ac0ca',
        ],
    },
    {
        peer_id: '12D3KooWJ4bTHirdTFNZpCS72TAzwtdmavTBkkEXtzo6wHL25CtE',
        services: ['84d83d3a-edf7-4f37-8051-24e29339c32b'],
    },
    {
        peer_id: '12D3KooWAKNos2KogexTXhrkMZzFYpLHuWJ4PgoAhurSAv7o5CWA',
        services: [
            '395c8723-7f80-48b7-8960-96056e143f7c',
            '248d27e9-aded-4c74-902e-ecc67bac0973',
            '95f19b0c-cdaa-4185-a96f-4fe972b3f407',
            '773abc1d-c7f2-49cd-84da-25c911baec4e',
        ],
    },
    {
        peer_id: '12D3KooWDcpWuyrMTDinqNgmXAuRdfd2mTdY9VoXZSAet2pDzh6r',
        services: [
            '7ae8822b-525f-402b-8a2f-593042f6a1ea',
            '4073524b-61e5-4ac5-ac23-551d32c765d5',
            '6b151bff-b4e7-4d14-9796-199be5918b62',
            '345ad069-f872-4765-a2c9-733507d21284',
        ],
    },
];

const isAlive = () => {
    return Math.random() > 0.1;
};

const mapHealthChecks = (x: HealthCheck): ServiceHealthCheckProps => {
    console.log(x.status);
    return {
        peerId: x.peer_id,
        serviceId: x.service_id,
        status: isAlive() ? 'alive' : 'dead',
        timestamp: new Date(x.last_update),
    };
};

export const getServices = async (subnet: string): Promise<Array<ServiceHealthCheckProps>> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
    if (subnet === 'awesome_fluence') {
        const kindaRawData = mockdata.flatMap((x) => {
            return x.services.map((srv) => {
                return {
                    last_update: Date.now(),
                    peer_id: x.peer_id,
                    service_id: srv,
                    status: isAlive() ? 'alive' : ('dead' as const),
                };
            });
        });

        return kindaRawData.map(mapHealthChecks);
    }

    return [];
};

/*
export const getServices = async (subnet: string) => {
    const rawData = await get_health(subnet, { ttl: 15000 });
    return rawData.flatMap((list) => list.map(mapHealthChecks));
};

*/
