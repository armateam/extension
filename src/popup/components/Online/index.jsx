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
                    <div className={ style.leftWidgets }>
                        { refreshing &&
                            <div className={ style.widget }>
                                <i className="fa fa-refresh fa-spin" />
                            </div>
                        }
                    </div>
                    <div className={ style.rightWidgets }>
                        <div className={ style.widget }>
                            <i className="fa fa-desktop" />
                            <span className={ style.widgetLabel }>
                                { channel.video_height }p
                            </span>
                        </div>
                        <div className={ style.widget }>
                            <i className="fa fa-user" />
                            <span className={ style.widgetLabel }>
                                { channel.viewers.toLocaleString() }
                            </span>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}
