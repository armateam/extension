import React from 'react';
import style from './style.css';

// ## //

export default class Online extends React.Component {
    openChannel(url, e) {
        chrome.tabs.create({
            url: url
        });

        window.close();
    }

    render() {
        const { channel } = this.props;

        return (
            <div className={ style.block }>
                <div className={ style.title }>
                    { channel.channel.status }
                </div>
                <a className={ style.link } onClick={ this.openChannel.bind(this, channel.channel.url) }>
                    <img className={ style.preview } src={ channel.preview.medium } alt='' />
                </a>
            </div>
        );
    }
}
