import React, { Component } from 'react'
import _ from 'lodash'

class SearchBar extends Component {

  constructor(props) {
    super(props)

  }

  handleChange = (event) => {
    const matchValue = _.lowerCase(event.target.value)
    const filterKeys = this.props.filterKeys

    const updatedItems = this.props.sourceItems.filter(item => {
      let matches = 0
      filterKeys.forEach(key => {
        const value = _.lowerCase(item[key])

        if (value.includes(matchValue)) {
          matches += 1
        }
      })

      return matches > 0
    })

    this.props.onSearch(updatedItems)
  }

  render() {

    return (
      <div className="search-bar">
        <input type="search" placeholder="search.." onChange={this.handleChange} />
      </div>
    )

  }

}

export default SearchBar
