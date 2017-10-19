import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Online from './components/Online';
import Offline from './components/Offline';

// ## //

class Popup extends React.Component {
    static propTypes = {
        channel: PropTypes.object.isRequired,
        status: PropTypes.object.isRequired
    };

    render() {
        const { channel, status } = this.props;

        return channel.channel ?
            <Online
                channel={ channel.channel }
                refreshing={ channel.isFetching }
                status={ status.clean }
            /> :
            <Offline />;
    }
}

export default connect(state => state)(Popup);
