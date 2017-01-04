import React, { Component } from 'react'
import './Item.css'
import _ from 'lodash'

const absoluteUrl = (url) => (!/^(?:f|ht)tps?:\/\//.test(url)) ? "http://" + url : url
const prettyUrl = (url) => url.replace(/^(?:f|ht)tps?:\/\//, "")

class Item extends Component {

  render() {
    const {
      id,
      title,
      address,
      activity,
      description,
      mails,
      mobiles,
      phones,
      websites,
    } = this.props.item

    const mailLinks = (mails || []).map(m => <a key={m} href={"mailto:"+m}>{m}</a>)
    const phoneLinks = _.concat(mobiles || [], phones || []).map(p => <a key={p} href={"tel:"+p}>{p}</a>)
    const websitesLinks = (websites || []).map(w => <a key={w} href={absoluteUrl(w)}>{prettyUrl(w)}</a>)

    return (
      <div className="item">
        <div className="item-title">{title}</div>
        <div className="item-address">{address}</div>
        <div className="item-activity">
          <div className="item-activity-label">activities:</div>
          <div className="item-activity-value">{activity || "none provided"}</div>
        </div>
        <div className="item-description">{description}</div>
        <div className="item-contacts">
          <div className="item-contacts-mails">mails: {mailLinks}</div>
          <div className="item-contacts-phones">phones: {phoneLinks}</div>
          <div className="item-contacts-websites">websites: {websitesLinks}</div>
        </div>
      </div>
    )
  }

}

export default Item
