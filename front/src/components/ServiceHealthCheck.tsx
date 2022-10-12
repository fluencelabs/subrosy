import { Card, CardContent } from '@mui/material';

export interface ServiceHealthCheckProps {
    hostPeerId: string;
    serviceId: string;
    creatorPeerId: string;
    alias: string;
    status: 'dead' | 'alive';
    timestamp: Date;
}

export const ServiceHealthCheck = (props: ServiceHealthCheckProps) => {
    return (
        <Card sx={{ width: 300 }}>
            <CardContent>
                <p>{props.hostPeerId}</p>
                <p>{props.serviceId}</p>
                <p>{props.creatorPeerId}</p>
                <p>{props.status}</p>
                <p>{props.alias}</p>
                <p>{props.timestamp.toISOString()}</p>
            </CardContent>
        </Card>
    );
};
