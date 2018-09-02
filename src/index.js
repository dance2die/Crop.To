import React, { createRef, Component } from "react";
import ReactDOM from "react-dom";
import styled, { injectGlobal, ThemeProvider } from "styled-components";
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
    color: #999;
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

const UploadButton = styled(Button).attrs({
  onClick: props => props.onClick,
  type: "button",
  accept: "image/*",
  my: 2
})`
  ${getDefaultFontFamily};
`;

const dropzoneStyle = {
  width: "90%",
  height: "90%",
  marginTop: "1em",
  border: "5px dashed black",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const hiddenDropzonStyle = {
  width: 0,
  height: 0
};

const acceptStyle = { backgroundColor: "hsl(120, 100%, 80%)" };
const rejectStyle = { backgroundColor: "hsl(360, 100%, 50%)" };

const DropzoneContent = styled.p`
  ${getDefaultFontFamily};
  display: ${props => (props.display ? "block" : "none")}
  font-size: 4em;

  @media (max-width: 699px) {
    font-size: 2em;
  }
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

          <Dropzone
            style={uploadedImage ? hiddenDropzonStyle : dropzoneStyle}
            acceptStyle={acceptStyle}
            rejectStyle={rejectStyle}
            accept="image/*"
            multiple={false}
            ref={node => (this.dropzone = node)}
            onDrop={(accepted, rejected) => {
              if (rejected && rejected.length > 0) return false;
              this.onFileUpload(accepted);
            }}
          >
            {({ isDragActive, isDragReject }) => {
              if (isDragReject) {
                return (
                  <DropzoneContent display={!uploadedImage}>
                    You can't drop this!
                  </DropzoneContent>
                );
              }
              if (isDragActive) {
                return (
                  <DropzoneContent display={!uploadedImage}>
                    Drop it now!
                  </DropzoneContent>
                );
              }

              return (
                <DropzoneContent display={!uploadedImage}>
                  Drop files here
                </DropzoneContent>
              );
            }}
          </Dropzone>

          <UploadButton onClick={() => this.dropzone.open()}>
            Open File Dialog
          </UploadButton>
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
