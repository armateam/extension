import React, { PropTypes } from 'react';
import style from './style.less';

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
                    { refreshing &&
                        <div className={ style.refreshing }>
                            <i className="fa fa-refresh fa-spin" />
                        </div>
                    }
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
