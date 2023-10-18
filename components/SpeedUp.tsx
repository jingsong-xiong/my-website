import React from 'react';
import styled from 'styled-components';

const SpeedUpWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  bottom: 100px;
  left: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  background: rgba(203, 203, 203, 0.7);
  justify-content: center;
  transform: rotate(90deg);
  &:active {
    background: rgba(123, 124, 123);
  }
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  //-khtml-user-select: none;
`;

interface Props {
  changeSpeed: (v: number) => void;
}
const SpeedUp = ({changeSpeed}: Props) => {
  return (
    <SpeedUpWrapper
      onTouchStart={() => {
        changeSpeed(100);
      }}
      onTouchEnd={() => {
        changeSpeed(200);
      }}
    >
      加速
    </SpeedUpWrapper>
  );
};

export default SpeedUp;
