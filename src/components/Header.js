import React, {Component} from 'react'
import '../asset/css/Header.css'

export default class Header extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render() {
    let {title} = this.props
    return (
      <div className='header'>
        <img src={require('../asset/img/icon.png')} alt=""/>
        <div style={{color:'#b0becc'}}>{title}</div>
      </div>
    )
  }
}
