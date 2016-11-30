import React, { Component } from 'react'
import _ from 'lodash'
import ScrollLock from './Generics/ScrollLock'
import SearchBar from './SearchBar'
import './Filter.css'

class FilterComponent extends Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { value, checked } = event.target

    const updatedOptions = this.props.options
    updatedOptions.forEach(o => { if (o.value === value) { o.selected = checked } })

    this.props.handleChange(updatedOptions)
  }

}

class Filter extends FilterComponent {

  constructor(props) {
    super(props)

    const lexically = (a, b) => a.value.localeCompare(b.value)
    const byOccurrenceThenLexically = (a, b) => b.occurrence - a.occurrence || a.value.localeCompare(b.value)

    this.sortMethods = [
      byOccurrenceThenLexically,
      lexically,
    ]

    this.state = {
      displayedOptions: this.props.options,
      sortMethodIndex: 0
    }
  }


  onSortButtonClicked = (event) => {
    const sortMethodIndex = (this.state.sortMethodIndex + 1) % this.sortMethods.length
    this.setState({ sortMethodIndex: sortMethodIndex })
  }

  onAllButtonClicked = (event) => {
    const updatedOptions = this.props.options.map(o => o.selected = true && o)
    this.props.handleChange(updatedOptions)
  }

  onNoneButtonClicked = (event) => {
    const updatedOptions = this.props.options.map(o => { o.selected = false; return o })
    this.props.handleChange(updatedOptions)
  }

  handleSearch = (foundItems) => {
    const updatedOptions = foundItems

    this.setState({displayedOptions: foundItems})
  }

  render = () => {
    console.log("render")
    const sortedOptions = this.state.displayedOptions.sort(this.sortMethods[this.state.sortMethodIndex])
    const options = sortedOptions.map((o, index) => {
      return (
        <div className="filter-option button" key={o.value}>
          <input className="filter-option-checkbox button" type="checkbox" id={o.value} value={o.value} checked={o.selected} onChange={this.handleChange} />
          <label className="filter-option-occurrence button" htmlFor={o.value}>{o.occurrence}</label>
          <label className="filter-option-label button" htmlFor={o.value}>{o.value}</label>
        </div>
      )
    })

    return (
      <div className="filter">
        <div className="filter-header">
          <div className="filter-title">{this.props.keyName}</div>
          <div className="filter-buttons">
            <div className="filter-buttons-sort button" onClick={this.onSortButtonClicked}>sort</div>
            <div className="filter-buttons-all button" onClick={this.onAllButtonClicked}>all</div>
            <div className="filter-buttons-none button" onClick={this.onNoneButtonClicked}>none</div>
          </div>
        </div>
        <ScrollLock>
          <div className="filter-options">
            <SearchBar sourceItems={this.props.options} filterKeys={["value"]} onSearch={this.handleSearch} />
            {options}
          </div>
        </ScrollLock>
      </div>
    )
  }

}

export default Filter
