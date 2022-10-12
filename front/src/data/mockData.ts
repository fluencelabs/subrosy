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
