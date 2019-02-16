import React, { Component } from "react";
import logo from "./gambina.png";
import logo2 from "./sunshine.png";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { show: true, imageUrl: "" };
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleHide = this.toggleHide.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("click");
    console.log(this.state.imageUrl);
    fetch("http://localhost:6900/image", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image: this.state.imageUrl,
        key: "haka_ton1"
      })
    });
  }

  toggleShow(e) {
    this.setState({ show: false });
  }
  toggleHide(e) {
    this.setState({ show: true });
  }

  handleImageChange(e) {
    let reader = new FileReader();
    let picture = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imageUrl: reader.result
      });
    };
    reader.readAsDataURL(picture);
  }

  render() {
    return (
      <div className="container">
        <div className="insideContainer">
          <header>
            <h1>Tervetuloa Gambina tunnistajaan</h1>
          </header>
          <div className="parent">
            <img className="App-logo" src={logo} alt="logo" />
            <img className="image2" src={logo2} alt="logo" />
          </div>
          <br />
          <div className="inputDiv">
            <input
              className="input"
              type="file"
              placeholder="Put your own picture here"
              onChange={this.handleImageChange}
              accept="image/*"
              capture="camera"
            />
          </div>

          <br />
          <div
            className="buttonBackground"
            onClick={this.onSubmit}
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
