import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import styled, { injectGlobal } from "styled-components";

import "./styles.css";

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
  }
`;

const AppContainer = styled.div`
  min-height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  // prettier-ignore
  & > header, section, footer {
    text-align: center;
    color: black;
    font-family: sans-serif;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Header = styled.header`
  background: blue;
  align-content: stretch;
  height: 3em;
`;
const Content = styled.section`
  background: red;
  align-items: center;
  flex: 1;
`;
const Footer = styled.footer`
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
      <AppContainer>
        <Header>
          <Title />
        </Header>
        <Content>
          <CroppieRoot id="croppie-root" innerRef={this.croppie} />
          <CroppieWrapper parent={this.croppie} image={uploadedImage} />

          <input
            type="file"
            accept="image/*"
            id="files"
            ref={this.file}
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

const rootElement = document.getElementById("app-root");
ReactDOM.render(<App />, rootElement);
