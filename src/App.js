import React, { Component } from 'react'
import _ from 'lodash'
import './App.css'

import HeaderContentFooter from './Components/Generics/HeaderContentFooter'

import FilterableItemsTable from './Components/Generics/FilterableItemsTable'
import Filter from './Components/Filter'
import Item from './Components/Item'

import wwoof_list from './data/wwoof_list.json'


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sourceItems: wwoof_list,
      filtersKeys: [
        "region",
        "wwoof_since",
        "tags",
        "activity"
      ]
    }
  }

  render() {
    const header = <h3>WWOOF LIST - CHILE</h3>

    const content = <FilterableItemsTable
                      sourceItems={this.state.sourceItems}
                      filtersKeys={this.state.filtersKeys}
                      Filter={Filter}
                      Item={Item} />

    const footer = <span>akabab © 2016</span>

    return <HeaderContentFooter header={header} content={content} footer={footer} />
  }

}

export default App
