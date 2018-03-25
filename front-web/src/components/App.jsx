import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class AppComponent extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default AppComponent;
