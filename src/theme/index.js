const getDefaultFontFamily = props => `font-family: ${props.theme.fontFamily};`;
//prettier-ignore
const getTitleFontFamily = props => `font-family: ${props.theme.titleFontFamily};`;
const getFlexColumnDirection = props => `
  display: flex;
  flex-direction: column;
`;

export { getDefaultFontFamily, getTitleFontFamily, getFlexColumnDirection };
export * from "./theme";
