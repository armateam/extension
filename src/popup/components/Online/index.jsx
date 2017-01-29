import React, { PropTypes } from 'react';
import style from './style.less';

// ## //

export default class Online extends React.Component {
    static propTypes = {
        channel: PropTypes.object.isRequired,
        status: PropTypes.string.isRequired
    }

    openChannel(url) {
        chrome.tabs.create({
            url: url
        });

        window.close();
    }

    render() {
        const { channel, status } = this.props;

        return (
            <div className={ style.block }>
                <div className={ style.title }>
                    { status }
                </div>
                <a className={ style.link } onClick={ this.openChannel.bind(this, channel.channel.url) }>
                    <img alt='' className={ style.preview } src={ channel.preview.medium } />
                    <div className={ style.viewers }>
                        <i className="fa fa-user" />
                        <span className={ style.viewerCount }>
                            { channel.viewers.toLocaleString() }
                        </span>
                    </div>
                </a>
            </div>
        );
    }
}
