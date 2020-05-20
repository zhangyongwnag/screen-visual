import React, {Component} from 'react'
import '../asset/css/Table.css'

export default class Table extends Component {
  constructor(props){
    super(props)
  }
  render () {
    let {tableList} = this.props
    return (
      <div style={{height:'100%'}}>
        <div className='table'>
          <ul className='table_header'>
            <li>省份排行</li>
            <li>网络类型</li>
            <li>覆盖率</li>
            <li>更新时间</li>
          </ul>
          <div style={{height:'calc(100% - 118px)'}}>
            <div className='tbody'>
              {
                tableList.map((item,index) => {
                  return (
                    <ul key={index}>
                      <li>{item.province}</li>
                      <li>{item.type}</li>
                      <li>{item.cover}</li>
                      <li>{item.time}</li>
                    </ul>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
