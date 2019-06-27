import React from "react"
import PropTypes from "prop-types"
import "./piece.css"

const Piece = props => {
  function dragStart(e) {
    console.log(e.dataTransfer)
    e.dataTransfer.setData("text/plain", "sdadsdad")
  }
  function dragEnter(e) {
    e.preventDefault()
    const data = e.dataTransfer.getData("text/plain")
    console.log(data)
  }
  function dragOver(e) {
    e.preventDefault()
    const data = e.dataTransfer.getData("text/plain")
    console.log(data)
  }
  return (
    <div
      className="piece-out-box"
      draggable
      onDragEnter={e => {
        dragEnter(e)
      }}
      onDragOver={e => {
        dragOver(e)
      }}
      onDragStart={e => {
        dragStart(e)
      }}>
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
