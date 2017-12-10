import React from 'react'

import TwitterIcon from 'react-icons/lib/fa/twitter'
import TwitchIcon from 'react-icons/lib/fa/twitch'
import FacebookIcon from 'react-icons/lib/fa/facebook'
import WebsiteIcon from 'react-icons/lib/fa/globe'

// ## //

export default class Offline extends React.Component {
  constructor(props) {
    super(props)

    this.twitter = 'https://twitter.com/armateam'
    this.twitch = 'https://www.twitch.tv/armatvhs'
    this.facebook = 'https://www.facebook.com/armateam.org/'
    this.website = 'http://www.armateam.org/'
  }

  openLink = url => {
    chrome.tabs.create({
      url: url
    })

    window.close()
  }

  render() {
    const logoUrl = chrome.extension.getURL('images/arma-96-gs.png')

    return (
      <main>
        <div className='inner'>
          <div className='logo'>
            <img alt='ArmaTeam' src={logoUrl} />
          </div>

          <p>{chrome.i18n.getMessage('popupOfflineMessage')}</p>

          <div className='links'>
            <a onClick={() => this.openLink(this.twitter)}>
              <TwitterIcon />
            </a>
            <a onClick={() => this.openLink(this.twitch)}>
              <TwitchIcon />
            </a>
            <a onClick={() => this.openLink(this.facebook)}>
              <FacebookIcon />
            </a>
            <a onClick={() => this.openLink(this.website)}>
              <WebsiteIcon />
            </a>
          </div>
        </div>

        <style jsx>{`
          main {
            padding: 20px 10px;
            color: grey;
          }

          .logo {
            margin: 20px auto;
            text-align: center;

            img {
              width: 70px;
              height: 70px;
              opacity: 0.7;
            }
          }

          p {
            margin: 0 0 30px 0;
            text-align: center;
          }

          .links {
            text-align: center;
          }

          a {
            font-size: 18px;
            margin-right: 15px;
            cursor: pointer;
            color: inherit;

            &:hover {
              color: #880d10;
            }

            &:last-child {
              margin-right: 0;
            }
          }
        `}</style>
      </main>
    )
  }
}
