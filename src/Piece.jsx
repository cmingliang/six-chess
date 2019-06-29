import React from "react"
import PropTypes from "prop-types"
import "./piece.css"

const Piece = props => {
  function dragStart(e) {
   const {dragStart}=props
   dragStart(props)
  }
  function dragOver(e) {
    if(props.color!=='#fff'){
      e.preventDefault()
    }
  }
  function drop(e) {
    e.preventDefault()
    const {drop}=props
    drop(props)
  }

  return (
    <div
      className="piece-out-box"
      draggable
      onDragOver={e => {
        dragOver(e)
      }}
      onDragStart={e => {
        dragStart(e)
      }}
      onDrop={e => {
        drop(e)
      }}>
      <div className="piece-in-box" style={{ backgroundColor: props.color }}>
        {props.color==='#fff'?'':props.value}
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
