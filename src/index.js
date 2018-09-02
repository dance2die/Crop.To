import React, { createRef, Component, Fragment } from "react";
import ReactDOM from "react-dom";
import styled, { injectGlobal, ThemeProvider, css } from "styled-components";
import { Box, Input, Button } from "rebass-next";
import Dropzone from "react-dropzone";

import { theme, getDefaultFontFamily } from "./theme";
import Title from "./components/Title";
import Credit from "./components/Credit";
import CroppieWrapper from "./components/CroppieWrapper";

injectGlobal`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html, body, #app-root {
    height: 100%;
    font-family: 'Roboto', sans-serif;
  }
`;

const AppContainer = styled.div`
  // prettier-ignore
  min-height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // https://www.styled-components.com/docs/advanced#function-themes
  ${getDefaultFontFamily};

  & > div {
    text-align: center;
    color: black;
    font-family: sans-serif;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Header = styled(Box)`
  align-content: stretch;
  height: 5.5em;

  background: #396afc; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2948ff,
    #396afc
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2948ff,
    #396afc
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;
const Content = styled(Box)`
  align-items: center;
  flex: 1;
`;
const Footer = styled(Box)`
  background: gold;
  align-content: stretch;
  height: 3em;
`;

const CroppieRoot = styled.div.attrs({
  ref: props => props.ref
})`
  display: flex;
  flex-direction: column;
`;

// const UploadButton = styled(Input)`
const UploadButton = styled(Button)`
  ${getDefaultFontFamily};
`;

const dropZoneCSS = css`
  width: 90%;
  height: 90%;
  margin-top: 1em;

  border: 1px dotted red;
  border: 5px dashed black;
  display: ${props => (props.show ? "flex" : "hidden")};
  align-items: center;
  justify-content: center;
`;

// const dropZoneStyle = {
//   width: "90%",
//   height: "90%",
//   marginTop: "1em",

//   border: "5px dashed black",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center"
// };

const StyledDropzone = styled(Dropzone)`
  ${dropZoneCSS};
`;

const DropzoneContent = styled.p`
  font-size: 2em;
  ${getDefaultFontFamily};
`;

class App extends Component {
  state = {
    uploadedImage: null
  };

  img = createRef();
  croppie = createRef();
  dropzone = createRef();

  componentDidCatch(err, info) {
    console.log(`App caught`, err, info);
  }

  onFileUpload = files => {
    if (!files) return;

    const reader = new FileReader();
    const file = files[0];
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
      <AppContainer>
        <Header>
          <Title />
        </Header>
        <Content>
          <CroppieRoot
            style={{ display: uploadedImage ? "inherit" : "none" }}
            id="croppie-root"
            innerRef={this.croppie}
          />
          <CroppieWrapper parent={this.croppie} image={uploadedImage} />
          <StyledDropzone
            show={!uploadedImage}
            accept="image/*"
            hidden={uploadedImage}
            innerRef={node => (this.dropzone = node)}
            onDrop={(accepted, rejected) => {
              this.onFileUpload(accepted);
            }}
          >
            <DropzoneContent>Drop files here</DropzoneContent>
          </StyledDropzone>

          <UploadButton
            type="button"
            accept="image/*"
            my={2}
            onClick={() => {
              this.dropzone.open();
            }}
          >
            Open File Dialog
          </UploadButton>

          {/*<UploadButton
            fontFamily="sans"
            type="file"
            accept="image/*"
            id="files"
            width="auto"
            ml="8em"
            onChange={e => this.onFileUpload(e.target.files)}
          />*/}
        </Content>
        <Footer>
          <Credit />
        </Footer>
      </AppContainer>
    );
  }
}

const StyledApp = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

const rootElement = document.getElementById("app-root");
ReactDOM.render(<StyledApp />, rootElement);
