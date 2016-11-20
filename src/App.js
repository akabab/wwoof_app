import React, { Component } from 'react'
import './App.css'
import _ from 'lodash'

import wwoof_list from './wwoof_list.json'

class Filter extends Component {

 render() {

    var filter = this.props.filter.sort(byOccurrence)

    var filterValues = filter.map(function(obj, index) {
        return (
          <li key={index} className="Filter-value">
            <label htmlFor={index}>{obj.occurrence}</label>
            <input type="checkbox" id={index} value={obj.value} />
            <label htmlFor={index}>{obj.value}</label>
          </li>
        )
    })

    return (
      <div className="Filter">
        <ul>
          {filterValues}
        </ul>
      </div>
    )
  }

}

class FiltersContainer extends Component {

  render() {
    var filtersDict = this.props.filtersDict

    var filters = Object.keys(filtersDict).map(function(key, index) {
      return <Filter key={index} filter={filtersDict[key]} />
    })

    return (
      <div className="FiltersContainer">
        {filters}
      </div>
    )
  }

}

class Element extends Component {

  render() {
    return (
      <div className="Element">
        <h3>{this.props.element.title}</h3>
        <h5>address: {this.props.element.address}</h5>
        <p>activity: {this.props.element.activity || "none provided"}</p>
        <p>{this.props.element.description}</p>
      </div>
    )
  }

}

class ElementContainer extends Component {

  render() {
    var elements = this.props.elements.map(function(element, index) {
        return <Element key={index} element={element} />
    })

    return (
      <div className="ElementContainer">
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
      filterKeys: [ "region", "wwoof_since", "tags" ]
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
      <div className="App">
        <div className="App-header">
          <h3>WWOOF LIST - CHILE</h3>
        </div>
        <div className="App-content">
          <FiltersContainer filtersDict={filtersDict} />
          <ElementContainer elements={elements} />
        </div>
        <div className="App-footer">
          <span>akabab © 2016</span>
        </div>
      </div>
    )
  }

}

export default App
