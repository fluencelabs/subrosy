import React from 'react';
import './App.css';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { services } from './data/mockData';
import { ServiceHealthCheck } from './components/ServiceHealthCheck';

function App() {
    return (
        <>
            <AppBar position="static" style={{ marginBottom: 40 }}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        Subrosy
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Key: 'mykey'
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl">
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 20,
                    }}
                >
                    {services.map((x) => (
                        <ServiceHealthCheck {...x} />
                    ))}
                </div>
            </Container>
        </>
    );
}

export default App;
