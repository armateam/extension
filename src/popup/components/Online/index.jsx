import React, { PropTypes } from 'react';
import style from './style.less';

// ## //

export default class Online extends React.Component {
    static propTypes = {
        channel: PropTypes.object.isRequired
    }

    openChannel(url) {
        chrome.tabs.create({
            url: url
        });

        window.close();
    }

    render() {
        const { channel } = this.props;

        let status = channel.channel.status;
        if (status.indexOf('[FR] ') === 0) {
            status = status.substring(5);
        }

        return (
            <div className={ style.block }>
                <div className={ style.title }>
                    { status }
                </div>
                <a className={ style.link } onClick={ this.openChannel.bind(this, channel.channel.url) }>
                    <img alt='' className={ style.preview } src={ channel.preview.medium } />
                </a>
            </div>
        );
    }
}
