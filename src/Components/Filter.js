import React, { Component } from 'react'
import _ from 'lodash'
import ScrollLock from './Generics/ScrollLock'


// filterOption: object
//   value: string
//   occurrence: integer
//   selected: boolean


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

  onAllButtonClicked = (event) => {
    const updatedOptions = this.props.options.map(o => o.selected = true && o)
    this.props.handleChange(updatedOptions)
  }

  onNoneButtonClicked = (event) => {
    const updatedOptions = this.props.options.map(o => { o.selected = false; return o })
    this.props.handleChange(updatedOptions)
  }

  render() {
    const byOccurrenceThenLexically = (a, b) => b.occurrence - a.occurrence || a.value.localeCompare(b.value)

    const sortedOptions = this.props.options.sort(byOccurrenceThenLexically)
    const options = sortedOptions.map((o, index) => {
      return (
        <div className="button filter-option" key={o.value}>
          <input className="button filter-option-checkbox" type="checkbox" id={o.value} value={o.value} checked={o.selected} onChange={this.handleChange} />
          <label className="button filter-option-occurrence" htmlFor={o.value}>{o.occurrence}</label>
          <label className="button filter-option-label" htmlFor={o.value}>{o.value}</label>
        </div>
      )
    })

    return (
      <div className="filter">
        <div className="filter-header">
          <div className="filter-title">{this.props.keyName}</div>
          <div className="filter-buttons">
            <div className="filter-buttons-all button" onClick={this.onAllButtonClicked}>all</div>
            <div className="filter-buttons-none button" onClick={this.onNoneButtonClicked}>none</div>
          </div>
        </div>
        <ScrollLock>
          <div className="filter-options">{options}</div>
        </ScrollLock>
      </div>
    )
  }

}

export default Filter
