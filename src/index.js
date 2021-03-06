import React, { createRef, Component } from "react";
import ReactDOM from "react-dom";
import styled, {
  css,
  system,
  injectGlobal,
  ThemeProvider
} from "styled-components";
import { Box, Button } from "rebass-next";
import Dropzone from "react-dropzone";

import { theme, getDefaultFontFamily } from "./theme";
import Title from "./components/Title";
import Emoji from "./components/Emoji";
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
  align-items: center;
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
    uploadedImage: null,
    contentScale: 1
  };

  img = createRef();
  croppie = createRef();
  croppieWrapper = createRef();
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

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  onResize = e => {
    // const { current } = this.croppie;
    let { current } = this.croppieWrapper;
    current = document.getElementById("content");

    const {
      width: parentWidth,
      height: parentHeight
    } = current.parentElement.getBoundingClientRect();
    const { width, height } = current.getBoundingClientRect();

    const contentScale = Math.min(width / parentWidth, height / parentHeight);

    console.log(
      `onResize`,
      contentScale
      // parentWidth,
      // parentHeight,
      // width,
      // height
    );
    this.setState({ contentScale });
  };

  render() {
    const { uploadedImage, contentScale } = this.state;

    return (
      <AppContainer>
        <Header>
          <Title />
        </Header>
        <Content id="content">
          <CroppieRoot
            style={{
              display: uploadedImage ? "inherit" : "none"
            }}
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
                    <Emoji ariaLabel="Woman Gesturing No">🙅</Emoji> Can't drop
                    this
                  </DropzoneContent>
                );
              }
              if (isDragActive) {
                return (
                  <DropzoneContent display={!uploadedImage}>
                    <Emoji ariaLabel="Multiple Music Notes">🎶</Emoji> Drop the
                    Beat
                  </DropzoneContent>
                );
              }

              return (
                <DropzoneContent display={!uploadedImage}>
                  <Emoji ariaLabel="Drop Box">📥</Emoji> Drop Here
                </DropzoneContent>
              );
            }}
          </Dropzone>

          <UploadButton onClick={() => this.dropzone.open()}>
            ⬆ Upload an Image
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
