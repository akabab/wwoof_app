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

  render() {
    const byOccurrenceThenLexically = (a, b) => b.occurrence - a.occurrence || a.value.localeCompare(b.value)

    const sortedOptions = this.props.options.sort(byOccurrenceThenLexically)
    const options = sortedOptions.map((o, index) => {
      return (
        <div className="filter-value" key={o.value}>
          <input className="filter-value-checkbox" type="checkbox" id={o.value} value={o.value} checked={o.selected} onChange={this.handleChange} />
          <div className="filter-value-occurrence" htmlFor={o.value}>{o.occurrence}</div>
          <div className="filter-value-label" htmlFor={o.value}>{o.value}</div>
        </div>
      )
    })

    return (
      <ScrollLock>
        <div className="filter-options">
          {options}
        </div>
      </ScrollLock>
    )
  }

}

export default Filter
