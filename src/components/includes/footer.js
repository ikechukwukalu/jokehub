import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base_url: this.props.base_url,
      api_url: this.props.api_url,
    }
  }

  componentDidMount() {
    document.getElementById('fullYear').innerHTML = new Date().getFullYear();
  }

  render() {
    return (
      <footer className="fixed-bottom">
        <p align="center">Copyright ©<span id="fullYear">2021</span> All rights reserved | This app is made with ❤️ by <a href="https://github.com/ikechukwukalu"target="_blank" rel="noopener noreferrer">Ikechukwu kalu</a></p>
      </footer>
    );
  }
}

export default Footer;
