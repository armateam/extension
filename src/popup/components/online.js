import React from 'react'
import PropTypes from 'prop-types'

import RefreshIcon from 'react-icons/lib/fa/refresh'
import DesktopIcon from 'react-icons/lib/fa/desktop'
import UserIcon from 'react-icons/lib/fa/user'
import DelayIcon from 'react-icons/lib/fa/hourglass'

import {openTab} from '../lib/chrome'

import Title from './title'
import Widget from './widget'

function Online({channel, refreshing, status}) {
  return (
    <main>
      <a onClick={() => openTab(channel.channel.url)}>
        <img alt='' src={channel.preview.large} />
        <div className='top'>
          <Title>{status}</Title>
        </div>
        <div className='left'>
          {refreshing && <Widget spin icon={<RefreshIcon />} />}
        </div>
        <div className='right'>
          {channel.delay > 0 && (
            <Widget icon={<DelayIcon />}>
              {chrome.i18n.getMessage('delay')}
            </Widget>
          )}
          <Widget icon={<DesktopIcon />}>
            {channel.video_height}p
          </Widget>
          <Widget icon={<UserIcon />}>
            {channel.viewers.toLocaleString()}
          </Widget>
        </div>
      </a>

      <style jsx>{`
        main {
          position: absolute;
          left: 2px;
          right: 0;
          top: 0;
          bottom: 0;
        }

        h1 {
          color: #880d10;
          margin: 2px 0 13px 0;
          font-size: 12px;
          font-weight: 500;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        img {
          opacity: 0.95;
          transition: opacity 0.1s ease-in-out;
          width: 400px;
          height: 225px;
        }

        a {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: block;
          cursor: pointer;

          &:focus {
            outline: none;
          }

          &:hover {
            img {
              opacity: 1;
            }
          }
        }

        .top {
          position: absolute;
          top: 5px;
          left: 5px;
          right: 5px;
        }

        .left {
          position: absolute;
          bottom: 2px;
          left: 5px;
        }

        .right {
          position: absolute;
          bottom: 2px;
          right: 5px;
        }
      `}</style>
    </main>
  )
}

Online.propTypes = {
  channel: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  refreshing: PropTypes.bool.isRequired
}

export default Online
