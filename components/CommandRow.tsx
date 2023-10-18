import React, {forwardRef, MutableRefObject} from 'react';
import styled from 'styled-components';

interface Props {
  userInfo: UAParser.IResult;
  showButton: boolean;
  onCommandInputChange: (value?: string) => void;
  inputValue?: string;
  showOptions: boolean;
  hideButtonShowOptions: () => void;
  setEnterTimes: (times: number) => void;
}

const CommandInput = (props: Props, ref: MutableRefObject<any>) => {
  const {
    userInfo: {device, browser, os},
    showButton,
    inputValue,
    onCommandInputChange,
    showOptions,
    hideButtonShowOptions,
    setEnterTimes,
  } = props;

  const isVisibleButton = device?.type === 'mobile' && showButton;

  const keyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      hideButtonShowOptions();
      setEnterTimes(1);
    }
  };

  return (
    <Container>
      <p>{`${browser?.name}/${browser.version}/${os.name} User$ `}</p>
      <CommanderInputAndButton>
        {!(inputValue.length > 0) && <div className="cursor"></div>}
        <CommandInputStyled
          type="text"
          placeholder="Please enter the command"
          value={inputValue}
          onChange={(e) => {
            onCommandInputChange(e.target?.value);
          }}
          onKeyUp={keyUp}
          ref={ref}
          disabled={showOptions}
        />

        {isVisibleButton && <button onClick={hideButtonShowOptions}>执行</button>}
      </CommanderInputAndButton>
    </Container>
  );
};

const Container = styled.label`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @keyframes changeCursor {
    0% {
      background: rgb(255, 0, 0);
    }
    14% {
      background: rgb(255, 165, 0);
    }
    28% {
      background: rgb(255, 255, 0);
    }
    42% {
      background: rgb(0, 255, 0);
    }
    56% {
      background: rgb(0, 127, 255);
    }
    70% {
      background: rgb(0, 0, 255);
    }
    84% {
      background: rgb(139, 0, 255);
    }
    100% {
      background: #e6e7e6;
    }
  }
  p {
    display: flex;
    color: #e6e7e6;
    font-size: 12px;
    padding: 0 0 0 6px;
    margin: 0;
  }
`;

const CommanderInputAndButton = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  .cursor {
    color: white;
    margin-left: 6px;
    width: 4px;
    height: 14px;
    background: #e6e7e6;
    border-radius: 4px;
    animation: changeCursor 3s linear infinite;
  }
  button {
    padding: 2px 6px;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    &:active {
      background: gray;
      color: white;
    }
  }
`;

const CommandInputStyled = styled.input`
  flex-grow: 1;
  border: none;
  min-width: 170px;
  caret-color: transparent;
  background: transparent;
  outline: none;
  color: white;
  padding: 6px 0 6px 6px;
`;

export default forwardRef(CommandInput);
