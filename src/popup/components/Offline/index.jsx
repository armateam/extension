import React from 'react';
import style from './style.less';

// ## //

export default class Offline extends React.Component {
    constructor(props) {
        super(props);

        this.twitter = 'https://twitter.com/armateam';
        this.twitch = 'https://www.twitch.tv/armatvhs';
        this.facebook = 'https://www.facebook.com/armateam.org/';
        this.website = 'http://www.armateam.org/';
    }

    openLink(url) {
        chrome.tabs.create({
            url: url
        });

        window.close();
    }

    render() {
        return (
            <div className={ style.block }>
                <p className={ style.offline }>L’ArmaTeam est hors-ligne :(</p>
                <div>
                    <a className={ style.link } onClick={ this.openLink.bind(this, this.twitter) }>
                        <i className="fa fa-twitter" />
                    </a>
                    <a className={ style.link } onClick={ this.openLink.bind(this, this.twitch) }>
                        <i className="fa fa-twitch" />
                    </a>
                    <a className={ style.link } onClick={ this.openLink.bind(this, this.facebook) }>
                        <i className="fa fa-facebook" />
                    </a>
                    <a className={ style.link } onClick={ this.openLink.bind(this, this.website) }>
                        <i className="fa fa-globe" />
                    </a>
                </div>
            </div>
        );
    }
}
