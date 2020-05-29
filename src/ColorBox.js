import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "./ColorBox.css"

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };

    this.changeCopyState = this.changeCopyState.bind(this);
  }
  /**
  |--------------------------------------------------
  | Set Helper method
  |--------------------------------------------------
  */
  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    })
  }

  render() {
    const { name, background, paletteId, id, showLink } = this.props;
    const { copied } = this.state;
    return (

      <CopyToClipboard text={background} onCopy={this.changeCopyState}>

        <div style={{ background: background }} className="ColorBox">
          <div style={{ background: background }} className={`copy-overlay ${copied && "show"}`} />

          <div className={`copy-msg ${copied && "show"}`}>
            <h1>copied</h1>
            <p>{this.props.background}</p>
          </div>

          <div className="copy-container">
            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>

          {/* Constructing Route Link */}
          {showLink &&
            <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
              <span className="see-more">MORE</span>
            </Link>
          }
        </div>

      </CopyToClipboard>
    );
  }
}

export default ColorBox;