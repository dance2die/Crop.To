import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Croppie } from "croppie";
import styled from "styled-components";
import Popup from "reactjs-popup";

import "./styles.css";

import Credit from "./components/Credit";

const croppieOptions = {
  showZoomer: true,
  enableOrientation: true,
  mouseWheelZoom: "ctrl",
  enableResize: true,
  viewport: {
    // Dev.to recommends 1000x420
    // But Croppie is off by 4px
    width: 996,
    height: 416,
    type: "square"
  },
  boundary: {
    width: "99vw",
    height: "75vh"
  }
};

const StyledPopup = styled(Popup).attrs({
  modal: true,
  open: props => props.open,
  onClose: props => props.onClose
})`
`;

const PopupContent = styled.div.attrs({
  className: "popup-content"
})`
  width: 100%;
`;

const CroppedImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CroppedImage = styled.img`
  width: 50vh;
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
        <StyledPopup modal open={croppedImage !== null} onClose={this.onClose}>
          {close => (
            <div className="modal">
              <a className="close" onClick={close}>
                &times;
              </a>
              <div className="header"> Modal Title </div>
              <PopupContent>
                <CroppedImageContainer>
                  <CroppedImage src={croppedImage} alt="cropped from croppie" />
                </CroppedImageContainer>
              </PopupContent>
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
        </StyledPopup>
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
        <head />
        <section>
          <div id="croppie-root" ref={this.croppie} />
          <CroppieContainer parent={this.croppie} image={uploadedImage} />

          <input
            type="file"
            accept="image/*"
            id="files"
            ref={this.file}
            onChange={this.onFileUpload}
          />
        </section>
        <footer>
          <Credit />
        </footer>
      </div>
    );
  }
}

const rootElement = document.getElementById("app-root");
ReactDOM.render(<App />, rootElement);
