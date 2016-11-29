import React, { Component } from 'react'
import _ from 'lodash'

class FiltersContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      filters: this.buildFilters()
    }
  }

  componentDidMount() {
    this.filterItems(this.state.filters)
  }

  buildFilters() {
    const uniquesWithOccurrenceAsDictionnary = (array) => {
      return _.flatten(array).reduce(function (obj, key) {
        obj[key] = (obj[key] || 0) + 1
        return obj
      }, {})
    }

    const uniquesWithOccurrenceAsArray = (array) => {
      const dict = uniquesWithOccurrenceAsDictionnary(array)

      return Object.keys(dict).reduce((arr, key) => {
        arr.push({
          "value": key,
          "occurrence": dict[key],
          "selected": true
        })
        return arr
      }, [])
    }

    return this.props.filtersKeys.reduce((obj, key) => {

      const allValues = this.props.sourceItems.map(item => item[key])
      const handleChange = this.handleChange.bind(this)

      const filter = {
        key: key,
        options: uniquesWithOccurrenceAsArray(allValues),
        handleOptionsChange: (updatedOptions) => {
          this.options = updatedOptions
          handleChange(filter)
        }
      }
      obj.push(filter)

      return obj
    }, [])
  }

  filterItems(filters) {
    const filteredItems = this.props.sourceItems.filter(item => {

      let matches = 0
      filters.forEach(filter => {
        const selectedOptionsValues = filter.options.filter(o => o.selected).map(o => o.value)

        const matchValue = item[filter.key]

        if (selectedOptionsValues.includes(matchValue) || _.intersection(selectedOptionsValues, matchValue).length > 0) {
          matches += 1
        }
      })

      return matches === filters.length
    })

    this.props.handleChange(filteredItems)
  }

  handleChange(updatedFilter) {

    var updatedFilters = this.state.filters
    updatedFilters.forEach(f => {
      if (f.key === updatedFilter) { f.options = updatedFilter.options }
    })

    this.setState({filters: updatedFilters})

    this.filterItems(updatedFilters)
  }

  render() {
    const Filter = this.props.Filter

    const filters = this.state.filters.map((filter, index) => {
      return (
        <div className="filter" key={filter.key}>
          <Filter key={index} keyName={filter.key} options={filter.options} handleChange={filter.handleOptionsChange} />
        </div>
      )
    })

    return (
      <div className="filters-container">
        {filters}
      </div>
    )

  }

}


class ItemsResultsContainer extends Component {

  render() {
    const Item = this.props.Item

    const items = this.props.items.map((item, index) => {
      return <Item key={index} item={item} />
    })

    return (
      <div className="items-results-container">
        {items}
      </div>
    )

  }

}


class FilterableItemsTable extends Component {

  constructor(props) {
    super(props)

    this.handleFiltersChange = this.handleFiltersChange.bind(this)

    this.state = {
      filteredItems: []
    }
  }

  handleFiltersChange(filteredItems) {
    this.setState({filteredItems: filteredItems})
  }

  render() {
    const { sourceItems, filtersKeys, Item, Filter } = this.props

    return (
      <div className="filterable-items-table">
        <FiltersContainer sourceItems={sourceItems} filtersKeys={filtersKeys} handleChange={this.handleFiltersChange} Filter={Filter} />
        <ItemsResultsContainer items={this.state.filteredItems} Item={Item} />
      </div>
    )

  }

}

export default FilterableItemsTable