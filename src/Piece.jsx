import React from "react"
import PropTypes from "prop-types"
import "./piece.css"

const Piece = props => {
  return (
    <div className="piece-out-box">
      <div className="piece-in-box" style={{ backgroundColor: props.color }}>
        {props.value}
      </div>
    </div>
  )
}

Piece.propTypes = {
  value: PropTypes.number
}

Piece.defaultProps = {
  value: 1
}

export default Piece
