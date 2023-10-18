import React, {useState} from 'react';
import {Input, Button, message} from 'antd';
import {ModalStaticFunctions} from 'antd/lib/modal/confirm';
import axios from 'axios';
import Link from 'next/link';
import styled from 'styled-components';

interface Props {
  modal: Omit<ModalStaticFunctions, 'warn'>;
  updateMessage: () => void;
}

export default function AddMessage(props: Props) {
  const [comment, setComment] = useState('');
  const prompt = (title: string) => {
    props.modal.confirm({
      title,
      content: (
        <Content>
          <p>评论功能必须登陆哦</p>
          <Link
            href={`/sign_up?returnTo=${encodeURIComponent(window.location.pathname)}`}
            legacyBehavior
          >
            <a className="go-to-sign-up">立即注册</a>
          </Link>
        </Content>
      ),
      onOk: () => {
        location.href = `/sign_in?returnTo=${encodeURIComponent(window.location.pathname)}`;
      },
      okText: '立即登陆',
      cancelText: '取消',
    });
  };

  const commitMessage = async () => {
    if (comment.length < 1) {
      return message.error('留言不能为空啦');
    }
    try {
      await axios.post('/api/comment', {commentContent: comment, useId: 'visitor'});
      props.updateMessage();
      setComment('');
      message.success('提交成功');
    } catch (e) {
      prompt(e?.response?.data?.message);
    }
  };

  return (
    <Container>
      <Input.TextArea
        placeholder="随便说点什么吧。。。"
        value={comment}
        rows={4}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        showCount={{formatter: (a) => (a.count === 0 ? '留言不能为空' : `已输入:${a.count}字`)}}
      />
      <div className="button-wrapper"></div>
      <div className="button-wrapper">
        <Button type="primary" onClick={commitMessage}>
          发表
        </Button>
      </div>
    </Container>
  );
}

const Content = styled.div`
  .go-to-sign-up {
    color: #1790fe;
  }
`;

const Container = styled.div`
  width: 35vw;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    width: 70vw;
  }
  textarea {
    background: rgba(66, 178, 255, 0.1);
    color: white;
    border: 1px solid rgba(66, 178, 255);
    ::placeholder {
      color: white;
    }
  }
  .ant-input-textarea-show-count::after {
    color: white;
  }
  .ant-input-textarea-show-count::after {
    color: white;
  }
  .button-wrapper {
    display: flex;
    min-height: 30px;
    justify-content: flex-end;
    button {
      background: rgba(66, 178, 255, 0.1);
      border: 1px solid rgba(66, 178, 255);
      color: white;
    }
  }
`;
