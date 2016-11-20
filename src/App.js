import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import wwoof_list from './wwoof_list.json'

class Element extends Component {

  render() {
    return (
      <div className="Element">
        <h3>{this.props.element.title}</h3>
        <h5>address: {this.props.element.address}</h5>
        <p>activity: {this.props.element.activity || "none provided"}</p>
        <p>{this.props.element.description}</p>
      </div>
    );
  }

}

class ElementContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      elements: wwoof_list
    }
  }

  render() {
    var elements = this.state.elements.map(function(element, index) {
        return <Element key={index} element={element} />
    });
    return (
      <div className="ElementContainer">
        {elements}
      </div>
    );
  }

}

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>WWOOF LIST - CHILE</h2>
        </div>
        <ElementContainer />
      </div>
    );
  }

}

export default App;
