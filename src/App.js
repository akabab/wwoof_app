import React, { Component } from 'react'
import './App.css'
import _ from 'lodash'

import wwoof_list from './wwoof_list.json'

class Filter extends Component {

 render() {

    var filter = this.props.filter.sort(byOccurrence)

    var filterValues = filter.map(function(obj, index) {
        return (
          <div className="filter-value" key={obj.value}>
            <label htmlFor={index}>{obj.occurrence}</label>
            <input type="checkbox" id={index} value={obj.value} />
            <label htmlFor={index}>{obj.value}</label>
          </div>
        )
    })

    return (
      <div className="filter">
        {filterValues}
      </div>
    )
  }

}

class FiltersContainer extends Component {

  render() {
    var filtersDict = this.props.filtersDict

    var filters = Object.keys(filtersDict).map(function(key, index) {
      return <Filter key={key} filter={filtersDict[key]} />
    })

    return (
      <div className="filters-container">
        {filters}
      </div>
    )
  }

}

class Element extends Component {

  render() {
    return (
      <div className="element">
        <h3>{this.props.element.title}</h3>
        <h5>address: {this.props.element.address}</h5>
        <p>activity: {this.props.element.activity || "none provided"}</p>
        <p>{this.props.element.description}</p>
      </div>
    )
  }

}

class ElementsContainer extends Component {

  render() {
    var elements = this.props.elements.map(function(element, index) {
        return <Element key={index} element={element} />
    })

    return (
      <div className="elements-container">
        {elements}
      </div>
    )
  }

}

// - Helpers

var uniquesWithOccurrenceAsDictionnary = function (array) {
  return _.flatten(array).reduce(function (obj, key) {
    obj[key] = (obj[key] || 0) + 1
    return obj
  }, {})
}

var uniquesWithOccurrenceAsArray = function (array) {
  var dict = uniquesWithOccurrenceAsDictionnary(array)

  return Object.keys(dict).reduce(function (arr, key) {
    arr.push({
      "value": key,
      "occurrence": dict[key],
    })
    return arr
  }, [])
}

var parseFilter = (array, key) => _.uniq(_.flatten(array.map(elem => elem[key])))

var byOccurrence = (a, b) => b.occurrence - a.occurrence



class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      elements: wwoof_list,
      filterKeys: [ "region", "wwoof_since", "tags", "quick_reply" ]
    }
  }

  render() {
    var elements = this.state.elements

    var filtersDict = this.state.filterKeys.reduce(function (obj, key) {
      var allValues = elements.map(elem => elem[key])
      obj[key] = uniquesWithOccurrenceAsArray(allValues)
      return obj
    }, {})

    // console.log(filtersDict)

    return (
      <div className="app">
        <div className="app-header">
          <h3>WWOOF LIST - CHILE</h3>
        </div>
        <div className="app-content">
          <FiltersContainer filtersDict={filtersDict} />
          <ElementsContainer elements={elements} />
        </div>
        <div className="app-footer">
          <span>akabab © 2016</span>
        </div>
      </div>
    )
  }

}

export default App
