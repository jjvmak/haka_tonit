import React, { Component } from "react";
import logo from "./gambina.png";
import logo2 from "./sunshine.png";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
    this.click = this.click.bind(this);
    this.toggleHide = this.toggleHide.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  click(e) {
    e.preventDefault();
    console.log("click");
  }

  toggleShow(e) {
    this.setState({ show: false });
  }
  toggleHide(e) {
    this.setState({ show: true });
  }

  render() {
    return (
      <div className="container">
        <div className="insideContainer">
          <header>
            <h1>Tervetuloa Gambina tunnistajaan</h1>
          </header>
          <div class="parent">
            <img className="App-logo" src={logo} alt="logo" />
            <img className="image2" src={logo2} alt="logo" />
          </div>
          <br />
          <div className="inputDiv">
            <input
              className="input"
              type="file"
              accept="image/*"
              placeholder="Laita oma kuva tänne"
            />
          </div>

          <br />
          <div
            className="buttonBackground"
            onClick={this.click}
            onMouseOver={this.toggleShow}
            onMouseLeave={this.toggleHide}
          />
          <br />
          {!this.state.show && <ShowRightside />}
        </div>
      </div>
    );
  }
}

const ShowRightside = () => <label>Lähetä kuvasi</label>;

export default App;
