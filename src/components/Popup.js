import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { Button } from "rebass-next";

import { getDefaultFontFamily } from "../theme";

const PopupContent = styled.div.attrs({
  className: "popup-content"
})`
  width: 100%;
  ${getDefaultFontFamily};
`;

const CroppedImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CroppedImage = styled.img`
  width: 40vw;
`;

const StyledPopup = styled(Popup).attrs({
  modal: true,
  open: props => props.open,
  onClose: props => props.onClose
})`
  ${getDefaultFontFamily};
`;

const CroppiePopup = ({ onClose, croppedImage }) => (
  <StyledPopup open={croppedImage !== null} onClose={onClose}>
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
          <a hidden={!croppedImage} href={croppedImage} download="cropped.png">
            Download
          </a>
          <Button onClick={() => close()}>Close</Button>
        </div>
      </div>
    )}
  </StyledPopup>
);

CroppiePopup.propTypes = {
  onClose: PropTypes.func,
  croppedImage: PropTypes.object
};

export default CroppiePopup;
