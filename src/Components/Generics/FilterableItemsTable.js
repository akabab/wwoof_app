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
          "selected": false
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
        sortMethod: null,
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
        const filterValues = filter.options.filter(o => o.selected).map(o => o.value)

        const itemValue = item[filter.key]

        if ( ( _.isEmpty(filterValues) )
          || ( filterValues.includes(itemValue) )
          || ( _.isArray(itemValue) && !_.isEmpty(itemValue) && !_.isEmpty(_.intersection(filterValues, itemValue)) )
          ) {

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
        <div className="filter-wrapper" key={filter.key}>
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

    const items = this.props.items.map(item => {
      return <Item key={item.id} item={item} />
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