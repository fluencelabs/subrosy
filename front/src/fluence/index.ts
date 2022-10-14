import { Fluence, KeyPair, PeerConfig, setLogLevel } from '@fluencelabs/fluence';
import { krasnodar, stage } from '@fluencelabs/fluence-network-environment';
import { Buffer } from 'buffer';
import { registerConsole } from '../aqua/main';

setLogLevel('INFO');

export const initAsync = async (): Promise<void> => {
    const sk = Buffer.from('SVz4T4yW718wt0rziDVOfiv6+WQbS4lvEtJHEieXcAk=', 'base64');

    const peerConfig: PeerConfig = {
        KeyPair: await KeyPair.fromEd25519SK(sk),
        connectTo: stage[5],
        // connectTo: krasnodar[3],
        skipCheckConnection: true,
    };

    try {
        await Fluence.start(peerConfig);

        console.log('FluenceJS connected');
        console.log('peer id: ', Fluence.getStatus().peerId);
        console.log('relay: ', Fluence.getStatus().relayPeerId);

        registerConsole({
            print(msgs) {
                console.log(msgs);
            },
        });
    } catch (err) {
        console.log('FluenceJS initialization failed', err);
    }
};

export const init = (): void => {
    initAsync();
};
