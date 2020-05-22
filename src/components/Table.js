import React, {Component} from 'react'
import '../asset/css/Table.css'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

export default class Table extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {tableList, translateY} = this.props
    return (
      <div style={{height: '100%'}}>
        <div className='table'>
          <ul className='table_header'>
            <li>省份排行</li>
            <li>网络类型</li>
            <li>覆盖率</li>
            <li>更新时间</li>
          </ul>
          <div style={{height: 'calc(100% - 55px)',overflow:'hidden'}}>
            <div
              style={{height: '100%', transform: `translateY(-${translateY}%)`, transition: 'all 0.3s'}}>
              <div className='tbody'>
                <TransitionGroup style={{height: '20%'}}>
                  {
                    tableList.map((item, index) => (
                      <CSSTransition
                        key={index}
                        timeout={500} //动画执行1秒
                        classNames='fade' //自定义的class名
                      >
                        <ul key={index}>
                          <li>{item.province}</li>
                          <li>{item.type}</li>
                          <li>{item.cover}</li>
                          <li>{item.time}</li>
                        </ul>
                      </CSSTransition>
                    ))
                  }
                </TransitionGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
