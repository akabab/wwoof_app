import React, { Component } from 'react'
import './Item.css'

class Item extends Component {

  render() {
    const { title, address, activity, description, wwoof_since } = this.props.item

    return (
      <div className="item">
        <div className="item-title">{title}</div>
        <div className="item-address">{address}</div>
        <div className="item-since">since: {wwoof_since}</div>
        <div className="item-activity">activity: {activity || "none provided"}</div>
        <div className="item-description">{description}</div>
      </div>
    )
  }

}

export default Item
