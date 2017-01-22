import React, { PropTypes } from 'react';

import { connect } from 'react-redux';

import Online from './components/Online';
import Offline from './components/Offline';

// ## //

class Popup extends React.Component {
    static propTypes = {
        channel: PropTypes.object.isRequired,
    };

    render() {
        const { channel } = this.props;

        return channel.channel ?
            <Online channel={ channel.channel }/> :
            <Offline />;
    }
}

export default connect(state => state)(Popup);
