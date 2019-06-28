import React from "react"
import PropTypes from "prop-types"
import "./piece.css"

const Piece = props => {
  function dragStart(e) {
    console.log(props)
  }
  function dragEnter(e) {
    e.preventDefault()
    const data = e.dataTransfer.getData("text/plain")
    console.log(data)
  }
  function dragOver(e) {
    e.preventDefault()
  }
  return (
    <div
      className="piece-out-box"
      draggable
      //   onDragEnter={e => {
      //     dragEnter(e)
      //   }}
      onDragOver={e => {
        dragOver(e)
      }}
      onDragStart={e => {
        dragStart(e)
      }}
      onDrop={e => {
        e.preventDefault()
        console.log(e.target)
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
