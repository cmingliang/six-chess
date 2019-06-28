import React, { Component } from "react"
import Piece from "./Piece"
import "./chess.css"

class Chess extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chessList: [],
      dataTrans: {}
    }
  }

  componentDidMount() {
    this.initChess(2)
  }

  handleDragStart=(data)=>{
    this.setState({dataTrans:data})
  }

  canMove=(pos1,pos2)=>{
    let rightList=[]
    if(pos1[0]<5){
        if(pos1[0]-1>=0){
            rightList.push([pos1[0]-1,pos1[1]])
            if(pos1[1]-1>=0){
                rightList.push([pos1[0]-1,pos1[1]-1])
            }
        }
    }
    
    if(pos1[1]-1>=0){
        rightList.push([pos1[0],pos1[1]-1])
    }
    if(pos1[1]+1<this.state.chessList[pos1[0]].length){
        rightList.push([pos1[0],pos1[1]+1])
    }
    if(pos1[0]+1<11){
        
    }
  }

  handleDrop=(props)=>{
      const po
    this.setState({dataTrans:data})
  }

  arrayShuffle = arr => {
    for (let t, j, i = arr.length; i; ) {
      j = Math.floor(Math.random() * i) // 在前i项中随机取一项，与第i项交换
      t = arr[--i]
      arr[i] = arr[j]
      arr[j] = t
    }
  }

  initChess = mode => {
    let initData = []
    const two = ["#e5bb4b", "#498eaf"]
    // const four = ["#e5bb4b", "#498eaf", "#631f16", "#e4dace"]
    const colorList = new Array(80)
    colorList.fill(0, 0, 40)
    colorList.fill(1, 40, 80)
    this.arrayShuffle(colorList)
    for (let i = 5; i < 11; i++) {
      let array = new Array(i).fill(1)
      initData.push(array)
    }
    for (let i = 9; i > 4; i--) {
      let array = new Array(i).fill(1)
      initData.push(array)
    }
    let k = 0
    initData = initData.map(item =>
      item.map(element => ({ value: element, color: two[colorList[k++]] }))
    )
    this.setState({
      chessList: initData
    })
  }
  render() {
    const { chessList } = this.state
    return (
      <div className="chess-box">
        {chessList.map((item, itemIndex) => (
          <div className="row-box" key={item + itemIndex}>
            {item.map((element, index) => (
              <Piece
                value={element.value}
                key={index + element}
                color={element.color}
                position={[itemIndex, index]}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default Chess
