import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { Subhead, Card, Button, Box, Link, Image } from "rebass-next";

import { getDefaultFontFamily, getFlexColumnDirection } from "../theme";

const StyledPopup = styled(Popup).attrs({
  modal: true,
  open: props => props.open,
  onClose: props => props.onClose
})`
  // reactjs-popup uses 50% width, which is not configurable
  width: inherit !important;
  ${getDefaultFontFamily};

  // https://www.cssmatic.com/box-shadow
  -webkit-box-shadow: 10px 10px 149px -3px rgb(12, 87, 255);
  -moz-box-shadow: 10px 10px 149px -3px rgb(12, 87, 255);
  box-shadow: 10px 10px 149px -3px rgb(12, 87, 255);
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

const CroppedImage = styled(Image)`
  align-self: center;
`;

const CroppiePopup = ({ onClose, croppedImage }) => (
  <StyledPopup open={croppedImage !== null} onClose={onClose}>
    {closePopup => (
      <PopupContainer>
        <Card>
          <Subhead p={2}>Cropped Image</Subhead>
        </Card>
        <CroppedImage src={croppedImage} ratio={1 / 2} />
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
