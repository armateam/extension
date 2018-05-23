import React from 'react'
import PropTypes from 'prop-types'

// ## //

const Widget = ({label, icon, spin}) => (
  <div className={spin && 'spin'}>
    {icon}
    {label && <span>{label}</span>}

    <style jsx>{`
      @keyframes icon-spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(359deg);
        }
      }

      div {
        display: inline-block;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 3px 7px;
        font-size: 11px;
        border-radius: 10px;
        margin-left: 4px;

        & :global(svg) {
          font-size: 12px;
          vertical-align: -2px !important;
        }
      }

      .spin :global(svg) {
        animation: icon-spin 2s infinite linear;
      }

      span {
        margin-left: 5px;
      }
    `}</style>
  </div>
)

Widget.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string,
  spin: PropTypes.bool
}

Widget.defaultProps = {
  label: null,
  spin: false
}

export default Widget
