import React from 'react';
import styled from 'styled-components';

const ControllerWrapper = styled.div`
  top: 60px;
  position: absolute;
  width: 150px;
  height: 150px;
  display: flex;
  flex-wrap: wrap;
  div {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.direction {
      border-radius: 50%;
      background: rgba(203, 203, 203, 0.7);
      color: white;
      &:active {
        background: rgba(123, 124, 123);
      }
    }
  }
`;

interface Props {
  changeDirection: (newDirection: Direction) => void;
}
const Controller = (props: Props) => {
  const {changeDirection} = props;
  return (
    <ControllerWrapper>
      <div></div>
      <div
        className="direction"
        onTouchStart={() => {
          changeDirection('ArrowUp');
        }}
      >
        <img {...{src: `/up.svg`, alt: '', width: 18, height: 38}} />
      </div>
      <div></div>
      <div
        className="direction"
        onTouchStart={() => {
          changeDirection('ArrowLeft');
        }}
      >
        <img {...{src: `/left.svg`, alt: '', width: 18, height: 38}} />
      </div>
      <div className="direction"></div>
      <div
        className="direction"
        onTouchStart={() => {
          changeDirection('ArrowRight');
        }}
      >
        <img {...{src: `/right.svg`, alt: '', width: 18, height: 38}} />
      </div>
      <div></div>
      <div
        className="direction"
        onTouchStart={() => {
          changeDirection('ArrowDown');
        }}
      >
        <img {...{src: `/down.svg`, alt: '', width: 18, height: 38}} />
      </div>
      <div></div>
    </ControllerWrapper>
  );
};

export default Controller;
