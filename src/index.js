import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import styled, { injectGlobal, ThemeProvider } from "styled-components";
import { Box, Input, Provider } from "rebass-next";

import "./styles.css";

import { theme } from "./theme";
import Title from "./components/Title";
import Credit from "./components/Credit";
import CroppieWrapper from "./components/CroppieWrapper";

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto|Roboto+Mono');

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
  min-height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // https://www.styled-components.com/docs/advanced#function-themes
  font-family: ${props => props.theme.fontFamily};

  // prettier-ignore
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
  background: blue;
  align-content: stretch;
  height: 5.5em;
`;
const Content = styled(Box)`
  background: red;
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

class App extends Component {
  state = {
    uploadedImage: null
  };

  img = React.createRef();
  croppie = React.createRef();

  componentDidCatch(err, info) {
    console.log(`App caught`, err, info);
  }

  onFileUpload = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
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
          <CroppieRoot id="croppie-root" innerRef={this.croppie} />
          <CroppieWrapper parent={this.croppie} image={uploadedImage} />

          <Input
            fontFamily="sans"
            type="file"
            accept="image/*"
            id="files"
            width="auto"
            ml="8em"
            onChange={this.onFileUpload}
          />
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
