import React from 'react'
import PropTypes from 'prop-types'

function Title({children}) {
  return (
    <div>
      {children}

      <style jsx>{`
        div {
          display: inline-block;
          background-color: rgba(255, 255, 255, 0.96);
          color: black;
          font-weight: 500;
          padding: 3px 7px 3px 6px;
          font-size: 14px;
        }
      `}</style>
    </div>
  )
}

Title.propTypes = {
  children: PropTypes.node.isRequired
}

export default Title
