import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Croppie } from "croppie";
import styled from "styled-components";
import Popup from "reactjs-popup";

import "./styles.css";

const croppieOptions = {
  showZoomer: true,
  enableOrientation: true,
  mouseWheelZoom: "ctrl",
  enableResize: true,
  viewport: {
    width: 150,
    height: 200,
    type: "square"
  },
  boundary: {
    width: "75vw",
    height: "75vh"
  }
};

const ResultContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

class CroppieContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      croppedImage: null
    };

    // To check if we need to rebind Croppie after cropping.
    // This is required for Croppie not being a React component
    this.currentImage = null;
  }

  componentDidMount() {
    this.croppie = new Croppie(this.props.parent.current, croppieOptions);
  }

  componentWillUnmount() {
    delete this.croppie;
  }

  onCrop = () => {
    this.croppie.result("base64").then(croppedImage => {
      this.setState({ croppedImage });
    });
  };

  onClose = () => {
    this.setState({ croppedImage: null });
  };

  render() {
    const { image } = this.props;
    const { croppedImage, currentImage } = this.state;
    if (!image) return null;

    if (image !== this.currentImage) {
      this.currentImage = image;
      this.croppie.bind({ url: image });
    }

    return (
      <div>
        <button type="button" onClick={this.onCrop} className="button">
          Croppp!
        </button>
        <Popup modal open={croppedImage !== null} onClose={this.onClose}>
          {close => (
            <div className="modal">
              <a className="close" onClick={close}>
                &times;
              </a>
              <div className="header"> Modal Title </div>
              <div className="content">
                <ResultContainer>
                  <img src={croppedImage} alt="cropped from croppie" />
                </ResultContainer>
              </div>
              <div className="actions">
                <a
                  hidden={!croppedImage}
                  href={croppedImage}
                  download="cropped.png"
                >
                  Download
                </a>
                <button className="button" onClick={() => close()}>
                  Close
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    );
  }
}

class App extends Component {
  state = {
    uploadedImage: null
  };

  file = React.createRef();
  img = React.createRef();
  croppie = React.createRef();

  componentDidCatch(err, info) {
    console.log(`App caught`, err, info);
  }

  onFileUpload = e => {
    const reader = new FileReader();
    const file = this.file.current.files[0];
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.setState({ uploadedImage: reader.result });
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };
  };

  render() {
    const { uploadedImage } = this.state;

    return (
      <div className="App">
        <div id="croppie-root" ref={this.croppie} />
        <CroppieContainer parent={this.croppie} image={uploadedImage} />

        <input
          type="file"
          accept="image/*"
          id="files"
          ref={this.file}
          onChange={this.onFileUpload}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("app-root");
ReactDOM.render(<App />, rootElement);
