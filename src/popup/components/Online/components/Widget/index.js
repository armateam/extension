import React from 'react'
import PropTypes from 'prop-types'
import style from './style.less'

// ## //

export default class Widget extends React.Component {
    static propTypes = {
      icon: PropTypes.string.isRequired,
      label: PropTypes.string,
      spin: PropTypes.bool
    }

    render() {
      const { icon, label, spin } = this.props
      let iconClass = `fa fa-${icon}`
      if (spin) {
        iconClass = `${iconClass} fa-spin`
      }

      return (
        <div className={style.widget}>
          <i className={iconClass} />
          { label && <span className={style.label}>
            { label }
          </span> }
        </div>
      )
    }
}
