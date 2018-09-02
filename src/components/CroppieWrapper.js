import React, { Component } from "react";
import PropTypes from "prop-types";
import { Croppie } from "croppie";
import { Button } from "rebass-next";

import CroppiePopup from "./Popup";

const croppieOptions = {
  showZoomer: true,
  enableOrientation: true,
  mouseWheelZoom: "ctrl",
  enableResize: true,
  viewport: {
    // Dev.to recommends 1000x420
    width: 1000,
    height: 420,
    type: "square"
  }
};

class CroppieWrapper extends Component {
  state = {
    croppedImage: null
  };
  // To check if we need to rebind Croppie after cropping.
  // This is required for Croppie not being a React component
  currentImage = null;

  static propTypes = {
    parent: PropTypes.object,
    image: PropTypes.string
  };

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
      this.croppie.bind({ url: image, zoom: "0%" });
    }

    return (
      <div>
        <Button type="button" onClick={this.onCrop} className="button">
          Croppp!
        </Button>
        <CroppiePopup onClose={this.onClose} croppedImage={croppedImage} />
      </div>
    );
  }
}

export default CroppieWrapper;
