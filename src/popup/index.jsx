import React from 'react';
import ReactDOM from 'react-dom';
import Storage from './lib/storage';

import Online from './components/Online';
import Offline from './components/Offline';

// ## //

class Popup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            online: false
        };

        try {
            this.state = JSON.parse(localStorage.state);
        }
        catch (Error) {
            // If the cached data is not a valid JSON,
            // we ignore it and assume that the channel
            // is offline, for now.
            // The status will be requested once the
            // component is mounted.
        }
    }

    componentDidMount() {
        this.requestUpdate();

        this.messageHandler = this.onMessage.bind(this);
        chrome.runtime.onMessage.addListener(this.messageHandler);
    }

    componentWillUnmount() {
        chrome.runtime.onMessage.removeListener(this.messageHandler);
    }

    requestUpdate() {
        chrome.runtime.sendMessage({
            name: 'armateam.ping'
        });
    }

    onMessage(message, sender, sendResponse) {
        switch (message.name) {
            case 'armateam.pong':
                localStorage.state = JSON.stringify({
                    online: message.data.online,
                    channel: message.data.channel
                });

                this.setState({
                    online: message.data.online,
                    channel: message.data.channel
                });

                break;
        }
    }

    render() {
        const { online, channel } = this.state;

        return online
            ? <Online channel={channel}/>
            : <Offline/>;
    }
}

ReactDOM.render(<Popup/>, document.getElementById('app'));
