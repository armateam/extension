import React from 'react'

import TwitterIcon from 'react-icons/lib/fa/twitter'
import TwitchIcon from 'react-icons/lib/fa/twitch'
import FacebookIcon from 'react-icons/lib/fa/facebook'
import WebsiteIcon from 'react-icons/lib/fa/globe'

import {openTab} from '../lib/chrome'

const TWITTER_URL = 'https://twitter.com/armateam'
const TWITCH_URL = 'https://www.twitch.tv/armatvhs'
const FACEOOK_URL = 'https://www.facebook.com/armateam.org/'
const WEBSITE_URL = 'http://www.armateam.org/'

function Offline() {
  const logoUrl = chrome.extension.getURL('images/arma-96-gs.png')

  return (
    <main>
      <div className='inner'>
        <div className='logo'>
          <img alt='ArmaTeam' src={logoUrl} />
        </div>

        <p>{chrome.i18n.getMessage('popupOfflineMessage')}</p>

        <div className='links'>
          <a onClick={() => openTab(TWITTER_URL)}>
            <TwitterIcon />
          </a>
          <a onClick={() => openTab(TWITCH_URL)}>
            <TwitchIcon />
          </a>
          <a onClick={() => openTab(FACEOOK_URL)}>
            <FacebookIcon />
          </a>
          <a onClick={() => openTab(WEBSITE_URL)}>
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
          transition: color 0.1s ease-in-out;

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

export default Offline
