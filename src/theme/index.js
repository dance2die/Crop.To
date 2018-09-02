const getDefaultFontFamily = props => `font-family: ${props.theme.fontFamily};`;
const getFlexColumnDirection = props => `
  display: flex;
  flex-direction: column;
`;

export { getDefaultFontFamily, getFlexColumnDirection };
export * from "./theme";
