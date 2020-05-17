import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "./ColorBox.css"

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { name, background } = this.props;
    return (

      <CopyToClipboard text={background}>

        <div style={{ background: background }} className="ColorBox">
          <div className="copy-container">

            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-button">Copy</button>

          </div>
          <span className="see-more">MORE</span>
        </div>

      </CopyToClipboard>
    );
  }
}

export default ColorBox;