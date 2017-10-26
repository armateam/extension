import React from 'react'

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
              <i className='fa fa-twitter' />
            </a>
            <a onClick={() => this.openLink(this.twitch)}>
              <i className='fa fa-twitch' />
            </a>
            <a onClick={() => this.openLink(this.facebook)}>
              <i className='fa fa-facebook' />
            </a>
            <a onClick={() => this.openLink(this.website)}>
              <i className='fa fa-globe' />
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
