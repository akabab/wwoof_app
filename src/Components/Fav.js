import React, { Component } from 'react'

class Fav extends Component {

  constructor(props) {
    super(props)

    if (!props.id) { throw Error('props.id is missing') }

    // recover state from localstorage
    this.state = {
      isFav: localStorage[props.id] === 'true'
    }

    this.toggleFav = this.toggleFav.bind(this)
  }

  toggleFav() {
    const isFav = !this.state.isFav

    localStorage[this.props.id] = isFav
    this.setState({ isFav: isFav })
  }

  render() {
    return (
      <div
        className={this.state.isFav ? 'item-favorite' : 'item-not-favorite'}
        onClick={this.toggleFav}>
        (|)
      </div>
    )
  }
}

export default Fav
