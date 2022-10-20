import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { randomAlive } from '../data/mockData';

export interface ServiceHealthCheckProps {
    key: string;
    peerId: string;
    serviceId: string;
    status: 'dead' | 'alive';
    timestamp: Date;
}

export const ServiceHealthCheck = (props: ServiceHealthCheckProps) => {
    const [status, setStatus] = useState(props.status);
    const [timestamp, setTimestamp] = useState(props.timestamp);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.1) {
                return;
            }

            setTimestamp(new Date());
            setStatus(randomAlive());
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const className = status === 'alive' ? 'card card-alive' : 'card card-dead';

    return (
        <div className={className} key={props.key}>
            <div className="title">Host peer ID</div>
            <div className="val">{props.peerId}</div>

            <div className="title">Service ID</div>
            <div className="val">{props.serviceId}</div>

            <div className="updated">
                <span>Updated: </span>
                <span>
                    <Moment fromNow>{timestamp}</Moment>
                </span>
            </div>
        </div>
    );
};
