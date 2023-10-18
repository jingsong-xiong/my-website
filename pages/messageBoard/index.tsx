import {useState, useEffect} from 'react';
import {Modal} from 'antd';
import axios from 'axios';
import {NextPage} from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import {UAParser} from 'ua-parser-js';
import AddMessage from 'components/MessageBard/AddMessage';
import MessageList from 'components/MessageBard/MessageList';

type Data = {
  comments?: CommentItem[];
  result: UAParser.IResult;
};

const MessageBoard: NextPage = () => {
  const [comments, setComments] = useState<Data['comments']>([]);

  const [modal, contextHolder] = Modal.useModal();

  const updateMessage = () => {
    axios.get<Data>('/api/getAllComment').then((res) => {
      if (res.data.comments.length > 0) {
        setComments(res.data.comments.sort((a, b) => (b.createdAt < a.createdAt ? 1 : -1)));
      }
    });
  };

  useEffect(() => {
    updateMessage();
  }, []);

  return (
    <Container>
      <BackButton>
        <StyledLink legacyBehavior href="/">
          {'< ' + '返回首页'}
        </StyledLink>
      </BackButton>
      <MessageWrapper>
        {contextHolder}
        <MessageList comments={comments} />
        <AddMessage modal={modal} updateMessage={updateMessage} />
      </MessageWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const BackButton = styled.div`
  color: #ffff;
  background: #26252d;
  padding: 16px 16px 0 16px;
`;
const StyledLink = styled(Link)`
  cursor: pointer;
`;

const MessageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #26252d;
  overflow: scroll;
  position: relative;
`;

export default MessageBoard;
