import React, {useState} from 'react';
import {Button} from 'antd';
import styled from 'styled-components';

const DialogWrapper = styled.div`
  background: rgba(186, 187, 186, 0.6);
  width: 100vw;
  height: 100vh;
  position: relative;
  .confirm-window {
    padding: 16px;
    background: #fff;
    border-radius: 4px;
    width: 400px;
    height: 200px;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -100px;
    margin-left: 200px;
    transform: rotate(90deg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      padding-bottom: 38px;
    }
    .button-wrapper {
      display: flex;
      padding-right: 10px;
      justify-content: flex-end;
      .ok {
        margin-left: 18px;
      }
    }
  }
`;

export default function useDialog() {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogOptions, setDialogOptions] = useState<DialogOptions>({
    title: '撞墙啦,再来一局？',
    ok: () => {},
    cancel: () => {},
  });

  const confirm = ({title, ok, cancel}: DialogOptions) => {
    setDialogOptions({title, ok, cancel});
    setShowDialog(true);
  };

  const DialogNode = (
    <>
      {showDialog && (
        <DialogWrapper>
          <div className="confirm-window">
            <div className="title">{dialogOptions.title}</div>
            <div className="button-wrapper">
              <Button
                className="cancel"
                size="large"
                onClick={() => {
                  dialogOptions.cancel();
                  setShowDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="ok"
                type="primary"
                size="large"
                onClick={() => {
                  dialogOptions.ok();
                  setShowDialog(false);
                }}
              >
                Ok
              </Button>
            </div>
          </div>
        </DialogWrapper>
      )}
    </>
  );
  return {DialogNode, confirm};
}
