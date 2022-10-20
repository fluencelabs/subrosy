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
import { getServices, HealthCheck } from './data/mockData';
import { ServiceHealthCheck, ServiceHealthCheckProps } from './components/ServiceHealthCheck';
import { styled, alpha } from '@mui/material/styles';
import Lan from '@mui/icons-material/Lan';
import { get_health } from './aqua/main';
import { init } from './fluence';
import {
    Experimental_CssVarsProvider as CssVarsProvider,
    experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import { pink, indigo } from '@mui/material/colors';

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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(2em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '40ch',
            '&:focus': {
                width: '60ch',
            },
        },
    },
}));

function App() {
    const [subnet, setSubnet] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [services, setServices] = useState<ServiceHealthCheckProps[]>([]);

    useEffect(() => {
        init();
        setServices(getServices('awesome_fluence'));
    }, []);

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
        setIsLoading(false);
        setServices(res);
    };

    let content;
    if (isLoading) {
        content = <LinearProgress />;
    } else if (services.length === 0) {
        content = <div className="not-found">Subnet not found</div>;
    } else {
        content = (
            <div className="main-content">
                {services.map((x) => (
                    <ServiceHealthCheck {...x} />
                ))}
            </div>
        );
    }

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
            {/* <AppBar position="static" style={{ marginBottom: 40 }}>
                <Toolbar variant="regular">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        Subrosy
                    </IconButton>
                    <Search>
                        <SearchIconWrapper>
                            <Lan />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Subnet key..."
                            inputProps={{ 'aria-label': 'search' }}
                            onBlur={search}
                        />
                    </Search>
                </Toolbar>
            </AppBar> */}
            <Container maxWidth="xl">{content}</Container>
        </CssVarsProvider>
    );
}

export default App;
