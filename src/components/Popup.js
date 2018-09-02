import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { Subhead, Card, Button, BackgroundImage, Box, Link } from "rebass-next";

import { getDefaultFontFamily, getFlexColumnDirection } from "../theme";

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

const StyledPopup = styled(Popup).attrs({
  modal: true,
  open: props => props.open,
  onClose: props => props.onClose
})`
  ${getDefaultFontFamily};
`;

const PopupContainer = styled(Card)`
  ${getFlexColumnDirection};
`;

const ActionContainer = styled(Box).attrs({ my: 1 })`
  ${getFlexColumnDirection};
`;

const DownloadLink = styled(Link).attrs({
  hidden: props => props.hidden,
  href: props => props.href,
  download: "cropped.png"
})`
  &:hover {
    background-color: gold;
  }
`;

const CroppiePopup = ({ onClose, croppedImage }) => (
  <StyledPopup open={croppedImage !== null} onClose={onClose}>
    {closePopup => (
      <PopupContainer>
        <Card>
          <Subhead p={2}>Cropped Image</Subhead>
          <BackgroundImage src={croppedImage} ratio={1 / 2} />
        </Card>
        <ActionContainer>
          <DownloadLink py={1} hidden={!croppedImage} href={croppedImage}>
            Download
          </DownloadLink>
          <Button onClick={() => closePopup()}>Close</Button>
        </ActionContainer>
      </PopupContainer>
    )}
  </StyledPopup>
);

CroppiePopup.propTypes = {
  onClose: PropTypes.func,
  croppedImage: PropTypes.object
};

export default CroppiePopup;
