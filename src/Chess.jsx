import React, { Component } from "react"
import _ from 'lodash'
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
    this.initChess()
  }

  handleDragStart=(data)=>{
    this.setState({dataTrans:data})
  }

  canMove=(pos1,pos2)=>{
    let rightList=[]
    const len=[5,6,7,8,9,10,9,8,7,6,5]
    if(pos1[0]<5){   
        if(pos1[0]-1>=0){
            rightList.push([pos1[0]-1,pos1[1]])
            if(pos1[1]-1>=0){
                rightList.push([pos1[0]-1,pos1[1]-1])
            }
        }
        rightList.push([pos1[0]+1,pos1[1]])
        rightList.push([pos1[0]+1,pos1[1]+1])
    }else if(pos1[0]===5){  
      if(pos1[1]!==9){
        rightList.push([pos1[0]-1,pos1[1]])
        rightList.push([pos1[0]+1,pos1[1]])
      }
      if(pos1[1]!==0){
        rightList.push([pos1[0]-1,pos1[1]-1])
        rightList.push([pos1[0]+1,pos1[1]-1])
      }    
    }else{
      rightList.push([pos1[0]-1,pos1[1]])
      rightList.push([pos1[0]-1,pos1[1]+1])
      if(pos1[0]<10){
        if(pos1[1]<len[pos1[0]]-1){
          rightList.push([pos1[0]+1,pos1[1]])
        }
        if(pos1[1]-1>=0){
            rightList.push([pos1[0]+1,pos1[1]-1])
        }
      }
    }      
    if(pos1[1]-1>=0){
        rightList.push([pos1[0],pos1[1]-1])
    }
    if(pos1[1]+1<len[pos1[0]]){
        rightList.push([pos1[0],pos1[1]+1])
    }
    const result = rightList.some((item)=>{
      return JSON.stringify(item)===JSON.stringify(pos2)
    })
    return result
  }

  handleDrop=(dropData)=>{
    const {dataTrans}=this.state
    if(this.canMove(dataTrans.position,dropData.position)){
      const value=dropData.value+dataTrans.value
      let cloneState=_.clone(this.state.chessList)
      if(dataTrans.color===dropData.color){
        cloneState[dropData.position[0]][dropData.position[1]].value=value
        cloneState[dataTrans.position[0]][dataTrans.position[1]].color='#fff' 
      }else if(dataTrans.value>dropData.value){
        cloneState[dropData.position[0]][dropData.position[1]].value=value
        cloneState[dropData.position[0]][dropData.position[1]].color=dataTrans.color
        cloneState[dataTrans.position[0]][dataTrans.position[1]].color='#fff'     
      }         
      this.setState({chessList:cloneState})
    } 
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
    initData = initData.map((item,rowIndex) =>
      item.map((element,columnIndex) => ({ value: element, color: two[colorList[k++]], position:[rowIndex,columnIndex] }))
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
                dragStart={this.handleDragStart}
                drop={this.handleDrop}
              />
            ))}
          </div>
        ))}
        <p>规则说明：</p>
        <p>1.玩家每人执一色棋子，轮流走棋，只能将棋子移动到相邻的非白色格子</p>
        <p>2.同色棋子叠放数值相加颜色不变，不同色棋子只能将数值大的叠放到数值小的上面，数值相加</p>
        <p>3.当棋盘上的棋子都不能再移动时，游戏结束，玩家所执棋子数值总和即为分数，分数高者胜</p>
        <button onClick={this.initChess}>双人模式</button>
        <button>四人模式</button>
      </div>
    )
  }
}

export default Chess
