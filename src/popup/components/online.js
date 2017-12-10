import React from 'react'
import PropTypes from 'prop-types'

import RefreshIcon from 'react-icons/lib/fa/refresh'
import DesktopIcon from 'react-icons/lib/fa/desktop'
import UserIcon from 'react-icons/lib/fa/user'

import Widget from './widget'

// ## //

export default class Online extends React.Component {
    static propTypes = {
      channel: PropTypes.object.isRequired,
      status: PropTypes.string.isRequired,
      refreshing: PropTypes.bool.isRequired
    }

    openChannel = url => {
      chrome.tabs.create({
        url: url
      })

      window.close()
    }

    render() {
      const { channel, refreshing, status } = this.props

      return (
        <main>
          <h1>{status}</h1>
          <a onClick={() => this.openChannel(channel.channel.url)}>
            <img alt='' src={channel.preview.medium} />
            <div className='left'>
              {refreshing && <Widget icon={<RefreshIcon />} spin />}
            </div>
            <div className='right'>
              <Widget icon={<DesktopIcon />} label={`${channel.video_height}p`} />
              <Widget icon={<UserIcon />} label={channel.viewers.toLocaleString()} />
            </div>
          </a>

          <style jsx>{`
            main {
              width: 340px;
              padding: 10px;
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
              opacity: 0.9;
            }

            a {
              width: 320px;
              height: 180px;
              display: block;
              cursor: pointer;
              position: relative;

              &:focus {
                outline: none;
              }

              &:hover {
                img {
                  opacity: 1;
                }
              }
            }

            .left {
              position: absolute;
              bottom: 4px;
              left: 4px;
            }

            .right {
              position: absolute;
              bottom: 4px;
              right: 4px;
            }
          `}</style>
        </main>
      )
    }
}
