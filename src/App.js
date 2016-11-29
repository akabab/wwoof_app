import React, { Component } from 'react'
import _ from 'lodash'
import './App.css'

import FilterableItemsTable from './Components/Generics/FilterableItemsTable'
import Filter from './Components/Filter'
import Item from './Components/Item'

import wwoof_list from './wwoof_list.json'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sourceItems: wwoof_list,
      filtersKeys: [
        "region",
        "wwoof_since",
        "tags",
        // "quick_reply",
      ]
    }
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h3>WWOOF LIST - CHILE</h3>
        </div>
        <div className="app-content">
          <FilterableItemsTable sourceItems={this.state.sourceItems} filtersKeys={this.state.filtersKeys} Filter={Filter} Item={Item} />
        </div>
        <div className="app-footer">
          <span>akabab © 2016</span>
        </div>
      </div>
    )
  }

}

export default App
