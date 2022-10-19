import { get_health } from '../aqua/main';
import { ServiceHealthCheckProps } from '../components/ServiceHealthCheck';

export const services: Array<ServiceHealthCheckProps> = Array.from({ length: 20 }, (v, k) => {
    return {
        alias: 'alias ' + k,
        creatorPeerId: 'creatorPeerId ' + k,
        hostPeerId: 'hostPeerId ' + k,
        serviceId: 'serviceId ' + k,
        status: k % 2 === 0 ? 'dead' : 'alive',
        timestamp: new Date(),
    };
});

/*
export const getServices = async (subnet: string) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
    return services;
};
*/

type Unarray<T> = T extends Array<infer U> ? U : T;

type HealthCheck = Unarray<Unarray<Awaited<ReturnType<typeof get_health>>>>;

export const getServices = async (subnet: string) => {
    const rawData = await get_health(subnet);
    return rawData.flatMap((list) => list.map(mapHealthChecks));
};

const mapHealthChecks = (x: HealthCheck) => {
    console.log(x.status);
    return {
        alias: '',
        creatorPeerId: x.peer_id,
        hostPeerId: '',
        serviceId: x.service_id,
        status: 'alive' as const,
        timestamp: new Date(x.last_update),
    };
};
