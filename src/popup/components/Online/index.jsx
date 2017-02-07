import React, { PropTypes } from 'react';
import style from './style.less';

import Widget from './components/Widget';

// ## //

export default class Online extends React.Component {
    static propTypes = {
        channel: PropTypes.object.isRequired,
        status: PropTypes.string.isRequired,
        refreshing: PropTypes.bool.isRequired
    }

    openChannel(url) {
        chrome.tabs.create({
            url: url
        });

        window.close();
    }

    render() {
        const { channel, refreshing, status } = this.props;

        return (
            <div className={ style.block }>
                <div className={ style.title }>
                    { status }
                </div>
                <a className={ style.link } onClick={ this.openChannel.bind(this, channel.channel.url) }>
                    <img alt='' className={ style.preview } src={ channel.preview.medium } />
                    <div className={ style.leftWidgets }>
                        { refreshing && <Widget icon='refresh' spin /> }
                    </div>
                    <div className={ style.rightWidgets }>
                        <Widget icon='desktop' label={ `${channel.video_height}p` } />
                        <Widget icon='user' label={ channel.viewers.toLocaleString() } />
                    </div>
                </a>
            </div>
        );
    }
}
