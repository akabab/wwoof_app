import React, { Component } from 'react'

export class Fav extends Component {

  constructor(props) {
    super(props)
    if (!props.id) { throw Error('props.id is missing') }
    // recover state from localstorage
    this.state.isFav = localStorage[props.id] === 'true'
    this.toggleFav = this.toggleFav.bind(this)
  }

  toggleFav() {
    const isFav = !this.state.isFav
    localStorage[this.props.id] === isFav
    this.setState({ isFav })
  }

  render() {
    return (
      <div
        className="{this.state.isFav ? 'fav' : ''}"
        onclick="{this.toggleFav}">
        add to favs
      </div>
    )
  }
}
