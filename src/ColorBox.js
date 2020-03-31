import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import "./ColorBox.css";

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };

    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }

  render() {
    const { name, background } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard
        text={
          this.props.format === "hex" ? background.toUpperCase() : background
        }
        onCopy={this.changeCopyState}
      >
        <div style={{ background }} className="ColorBox">
          <div
            style={{ background }}
            className={`copy-overlay ${copied && "show"}`}
          ></div>
          <div
            className={`copy-msg ${this.props.format === "hex" && "hex"} ${this
              .props.format !== "hex" && "rgb"} ${copied && "show"}`}
          >
            <h1>Copied!</h1>
            <p>{this.props.background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
          <Link to="/" onClick={event => event.stopPropagation()}>
            <span className="see-more">More</span>
          </Link>
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
