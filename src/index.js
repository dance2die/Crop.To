import React, { Component, Fragment } from "react";
import ReactDOM, { createPortal } from "react-dom";
import { Croppie } from "croppie";

import "./styles.css";

const croppieOptions = {
  showZoomer: true,
  enableOrientation: true,
  mouseWheelZoom: "ctrl",
  viewport: {
    width: 150,
    height: 200,
    type: "square"
  },
  boundary: {
    width: "50vw",
    height: "50vh"
  }
};

const croppieRoot = document.getElementById("croppie-root");
const croppieResult = document.getElementById("croppie-result");

class CroppieResult extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    croppieResult.appendChild(this.el);
  }

  componentWillUnmount() {
    croppieResult.removeChild(this.el);
  }

  render() {
    const { image } = this.props;
    if (!image) return null;

    croppieResult.classList.remove("is-hidden");

    return ReactDOM.createPortal(
      <div className="result">
        <img src={image} alt="cropped from croppie" />
        <a hidden={!image} href={image} download="cropped.png">
          Download Cropped Image
        </a>
      </div>,
      this.el
    );
  }
}

class CroppieContainer extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.el.id = "croppie";
    this.croppie = new Croppie(this.el, croppieOptions);
  }

  componentDidMount() {
    croppieRoot.classList.remove("is-hidden");
    croppieRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    croppieRoot.classList.add("is-hidden");
    croppieRoot.removeChild(this.el);
  }

  onCrop = () => {
    this.croppie.result("base64").then(croppedImage => {
      this.props.onCrop(croppedImage);
    });
  };

  render() {
    const { image } = this.props;
    if (!image) return null;

    this.croppie.bind({ url: image });

    return ReactDOM.createPortal(
      // this.props.children({ value: "some value" }),
      <div>
        <button type="button" onClick={this.onCrop}>
          Crop!
        </button>
      </div>,
      this.el
    );
  }
}

class App extends Component {
  state = {
    croppedImage: null,
    // isFileUploaded: false,
    uploadedImage: null
  };

  file = React.createRef();
  img = React.createRef();

  componentDidCatch(err, info) {
    console.log(`App caught`, err, info);
  }

  onFileUpload = e => {
    const reader = new FileReader();
    const file = this.file.current.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      // c.bind({ url: reader.result });
      // console.log(`reader.result`, reader.result);
      this.setState({ uploadedImage: reader.result });
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  };

  onCrop = croppedImage => {
    this.setState({ croppedImage }, () =>
      console.log(`App.onCrop.croppedImage`)
    );
  };

  render() {
    const { uploadedImage, croppedImage } = this.state;

    return (
      <div className="App">
        {croppedImage && <div className="backdrop" />}
        {/*
          uploadedImage && (
          <CroppieContainer image={uploadedImage} onCrop={this.onCrop}>
            {value => console.log(`value from croppie`, value)}
          </CroppieContainer>
        )*/}
        <CroppieContainer image={uploadedImage} onCrop={this.onCrop}>
          {value => console.log(`value from croppie`, value)}
        </CroppieContainer>

        <input
          type="file"
          id="files"
          ref={this.file}
          onChange={this.onFileUpload}
        />
        <hr />
        <h2> Cropped Result! </h2>
        <div>{croppedImage && <CroppieResult image={croppedImage} />}</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("app-root");
ReactDOM.render(<App />, rootElement);
