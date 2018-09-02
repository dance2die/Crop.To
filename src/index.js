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
    color: white;
    font-family: sans-serif;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Header = styled.header`
  align-content: stretch;
  background: blue;
  height: 60px;
`;
const Content = styled.section`
  text-align: center;
  background: red;
  flex: 1;
`;
const Footer = styled.footer`
  align-content: stretch;
  background: gold;
  height: 60px;
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
