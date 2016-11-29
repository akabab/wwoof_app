import React, { Component } from 'react'
import './HeaderContentFooter.css'

class HeaderContentFooter extends Component {

  render() {
    const { header, content, footer } = this.props

    return (
      <div className="app">
        <div className="app-header">{header}</div>
        <div className="app-content">{content}</div>
        <div className="app-footer">{footer}</div>
      </div>
    )
  }

}

export default HeaderContentFooter
