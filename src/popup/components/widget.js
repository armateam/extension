import React from 'react'
import PropTypes from 'prop-types'

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
        <div>
          <i className={iconClass} />
          {label && <span>{label}</span>}

          <style jsx>{`
            div {
              display: inline-block;
              background-color: rgba(0, 0, 0, 0.7);
              color: white;
              padding: 3px 7px;
              font-size: 11px;
              border-radius: 10px;
              margin-left: 4px;
            }

            span {
              margin-left: 5px;
            }
          `}</style>
        </div>
      )
    }
}
