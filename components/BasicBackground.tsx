import React, {FC} from 'react';
import styled from 'styled-components';

type Props = {
  height?: string;

  width?: string;
  background?: string;
  image?: string;
  children?: React.ReactNode;
};

export const BasicBackground: FC<Props> = ({children, ...rest}) => {
  return <Container {...rest}>{children}</Container>;
};
const Container = styled.div`
  ${({height, width, background, image}) => {
    return `
    ${height ? `height:${height}` : ''};
      ${width ? `width:${width}` : ''};
      ${background ? `background:${background}` : ''};
       ${image ? `background-image: url(${image});background-size: cover;` : ''};
    `;
  }};
`;
