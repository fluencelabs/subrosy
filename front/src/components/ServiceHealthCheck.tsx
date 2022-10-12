import { Box, Card, CardContent, CardHeader, InputLabel, TextField, Typography } from '@mui/material';
import moment from 'moment';
import Adjust from '@mui/icons-material/Adjust';

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
            <CardHeader
                title={props.alias}
                sx={{
                    marginBottom: 0,
                    paddingBottom: 0,
                }}
                action={<Adjust color={props.status === 'alive' ? 'success' : 'error'} />}
            />
            <CardContent>
                <Box marginY={1}>
                    <InputLabel>Service ID</InputLabel>
                    <Typography variant="body1">{props.serviceId}</Typography>
                </Box>

                <Box marginY={1}>
                    <InputLabel>Host peer ID</InputLabel>
                    <Typography variant="body1">{props.hostPeerId}</Typography>
                </Box>

                <Box marginY={1}>
                    <InputLabel>Creator peer ID</InputLabel>
                    <Typography variant="body1">{props.creatorPeerId}</Typography>
                </Box>

                <Typography align="right" variant="body2">
                    {moment(props.timestamp).fromNow()}
                </Typography>
            </CardContent>
        </Card>
    );
};
