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
import { convertToObject } from 'typescript';

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

const wait = async (timeout: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

const randomInt = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

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
        const res = getServices(newSubnet);
        if (res.length === 0) {
            await wait(2000);
            setServices([]);
        } else {
            let tmp: any = [];
            for (let s of res) {
                await wait(randomInt(50, 500));
                tmp = [...tmp, s];
                setServices(tmp);
            }
        }

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
                {services.length === 0 && <div className="not-found">Subnet not found</div>}
                <div className="main-content">
                    {services.map((x) => (
                        <ServiceHealthCheck {...x} />
                    ))}
                </div>
            </Container>
        </CssVarsProvider>
    );
}

export default App;
