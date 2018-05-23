import React from 'react'
import PropTypes from 'prop-types'

import RefreshIcon from 'react-icons/lib/fa/refresh'
import DesktopIcon from 'react-icons/lib/fa/desktop'
import UserIcon from 'react-icons/lib/fa/user'
import DelayIcon from 'react-icons/lib/fa/hourglass'

import Title from './title'
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
        url
      })

      window.close()
    }

    generatePreviewUrl = (width, height) => {
      const {channel} = this.props

      return channel.preview.template
        .replace('{width}', width)
        .replace('{height}', height) + `?${channel.channel.updated_at}`
    }

    render() {
      const {channel, refreshing, status} = this.props

      return (
        <main>
          <a onClick={() => this.openChannel(channel.channel.url)}>
            <img alt='' src={this.generatePreviewUrl(400, 225)} />
            <div className='top'>
              <Title>{status}</Title>
            </div>
            <div className='left'>
              {refreshing && <Widget icon={<RefreshIcon />} spin />}
            </div>
            <div className='right'>
              {channel.delay > 0 && (
                <Widget icon={<DelayIcon />} label={chrome.i18n.getMessage('delay')} />
              )}
              <Widget icon={<DesktopIcon />} label={`${channel.video_height}p`} />
              <Widget icon={<UserIcon />} label={channel.viewers.toLocaleString()} />
            </div>
          </a>

          <style jsx>{`
            main {
              position: absolute;
              left: 0;
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
              top: 4px;
              left: 4px;
              right: 4px;
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
