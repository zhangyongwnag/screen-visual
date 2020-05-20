import React, {Component} from 'react'
import '../asset/css/Loading.css'

export default class Loading extends Component {
  constructor(props){
    super(props)
  }
  render () {
    return (
      <div style={{width:'100vw',height:'100vh',backgroundColor:'#2a2a2a'}} className='common_flex'>
        <div className='loader'>Loading...</div>
      </div>
    )
  }
}
