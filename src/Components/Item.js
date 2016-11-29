import React, { Component } from 'react'

class Item extends Component {

  render() {
    const { title, address, activity, description, wwoof_since } = this.props.item

    return (
      <div className="item">
        <h3>{title}</h3>
        <h5>address: {address}</h5>
        <h5>since: {wwoof_since}</h5>
        <p>activity: {activity || "none provided"}</p>
        <p>{description}</p>
      </div>
    )
  }

}

export default Item
