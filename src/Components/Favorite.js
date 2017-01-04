import React, { Component } from 'react'

class Favorite extends Component {

  constructor(props) {
    super(props)

    if (!props.id) { throw Error('props.id is missing') }

    this.state = {
      isFavorite: localStorage[props.id] === 'true'
    }

    this.toggleFavorite = this.toggleFavorite.bind(this)
  }

  toggleFavorite() {
    const isFavorite = !this.state.isFavorite

    localStorage[this.props.id] = isFavorite
    this.setState({ isFavorite })
  }

  render() {
    return (
      <div className="favorite-wrapper">
        <div
          className={this.state.isFavorite ? 'item-favorite' : 'item-not-favorite'}
          onClick={this.toggleFavorite}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 240 240">
            <path fill={this.state.isFavorite ? '#F8D64E' : '#7e8080'} d="m48,234 73-226 73,226-192-140h238z"/>
          </svg>
        </div>
      </div>
    )
  }
}

export default Favorite
