import React, { useEffect, useState } from 'react';
import './App.css';
import {
    AppBar,
    Box,
    CircularProgress,
    IconButton,
    InputBase,
    LinearProgress,
    Toolbar,
    Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { getServices, HealthCheck, randomAlive } from './data/mockData';
import { ServiceHealthCheck, ServiceHealthCheckProps } from './components/ServiceHealthCheck';
import Lan from '@mui/icons-material/Lan';
import { init } from './fluence';
import {
    Experimental_CssVarsProvider as CssVarsProvider,
    experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import { indigo } from '@mui/material/colors';

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: indigo['900'],
                },
            },
        },
    },
});

function App() {
    const [subnet, setSubnet] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [services, setServices] = useState<ServiceHealthCheckProps[]>([]);

    useEffect(init, []);

    const search: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = async (arg) => {
        const newSubnet = arg.target.value;
        if (subnet === newSubnet || newSubnet === '') {
            return;
        }

        setSubnet(newSubnet);
        setIsLoading(true);
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
        const res = getServices(newSubnet);
        setServices(res);
        setIsLoading(false);
    };

    return (
        <CssVarsProvider theme={theme}>
            <div className="header">
                <h1>SUBROSY</h1>
                <Lan
                    style={{
                        position: 'relative',
                        verticalAlign: 'center',
                        left: 90,
                        textAlign: 'center',
                    }}
                />
                <input type="text" onBlur={search}></input>
            </div>
            {isLoading && <LinearProgress />}
            <Container maxWidth="xl">
                {!isLoading &&
                    (services.length === 0 ? (
                        <div className="not-found">Subnet not found</div>
                    ) : (
                        <div className="main-content">
                            {services.map((x) => (
                                <ServiceHealthCheck {...x} />
                            ))}
                        </div>
                    ))}
            </Container>
        </CssVarsProvider>
    );
}

export default App;
