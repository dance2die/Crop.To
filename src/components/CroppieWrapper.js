import React, { Component } from "react";
import { Croppie } from "croppie";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { Button } from "rebass-next";

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
  }
};

const StyledPopup = styled(Popup).attrs({
  modal: true,
  open: props => props.open,
  onClose: props => props.onClose
})``;

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
  width: 40vw;
`;

class CroppieWrapper extends Component {
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
        <Button type="button" onClick={this.onCrop} className="button">
          Croppp!
        </Button>
        <StyledPopup modal open={croppedImage !== null} onClose={this.onClose}>
          {close => (
            <div className="modal">
              <a className="close" onClick={close}>
                &times;
              </a>
              <div className="header"> Modal Title </div>
              <PopupContent>
                <CroppedImage src={croppedImage} alt="cropped from croppie" />
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

export default CroppieWrapper;
