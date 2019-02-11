import React, {useCallback} from 'react'
import {useMappedState} from 'redux-react-hook'

import Online from './online'
import Offline from './offline'

function Popup() {
  const mapState = useCallback(
    state => ({
      channel: state.channel.channel,
      refreshing: state.channel.isFetching,
      status: state.status.clean
    }),
    []
  )

  const {channel, refreshing, status} = useMappedState(mapState)

  return channel ? (
    <Online
      channel={channel}
      refreshing={refreshing}
      status={status}
    />
  ) : (
    <Offline />
  )
}

export default Popup
