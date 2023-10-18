export const withMobile = (style) => {
  return `
    @media screen and (max-width:678px ) {
      ${style}
    }
  `;
};

export const verticalCenter = `
    display: flex;
    justify-content: center;
    align-items: center;
`;
