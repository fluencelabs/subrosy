import React from 'react';
import Moment from 'react-moment';

export interface ServiceHealthCheckProps {
    key: string;
    peerId: string;
    serviceId: string;
    status: 'dead' | 'alive';
    timestamp: Date;
}

export const ServiceHealthCheck = (props: ServiceHealthCheckProps) => {
    const className = props.status === 'alive' ? 'card card-alive' : 'card card-dead';

    return (
        <div className={className} key={props.key}>
            <div className="title">Host peer ID</div>
            <div className="val">{props.peerId}</div>

            <div className="title">Service ID</div>
            <div className="val">{props.serviceId}</div>

            <div className="updated">
                <span>Updated: </span>
                <span>
                    <Moment fromNow>{props.timestamp}</Moment>
                </span>
            </div>
        </div>
    );
};
