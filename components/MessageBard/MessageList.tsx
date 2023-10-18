import React from 'react';
import styled from 'styled-components';
import {friendlyDate} from 'lib';

interface Props {
  comments?: CommentItem[];
}

export default function MessageList(props: Props) {
  const {comments} = props;
  return (
    <Container>
      {comments?.map((item) => {
        return (
          <MessageItem key={item.id}>
            <TitleTimeWrapper>
              <img src="/avatars.jpg" alt="avatars" />
            </TitleTimeWrapper>
            <ContentWrapper>
              <NameAndTime>
                <CreateTime>{friendlyDate(item.createdAt)}</CreateTime>
                <NickName>{item.nickname}</NickName>
              </NameAndTime>
              <MessageText>{item.content}</MessageText>
            </ContentWrapper>
          </MessageItem>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  padding: 16px 0;
  margin-bottom: 30px;
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  width: 35vw;
  @media (max-width: 600px) {
    width: 70vw;
  }
`;

const NameAndTime = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const MessageItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const MessageText = styled.div`
  display: flex;
  align-items: center;
  line-height: 24px;
  padding: 16px;
  background: #454451;
  font-size: 14px;
  font-weight: 500;
  color: white;
  min-width: 100px;
  border-radius: 10px;
  white-space: pre-wrap;
`;

const CreateTime = styled.span`
  font-size: 12px;
  margin-right: 8px;
`;

const TitleTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;

  margin-right: 8px;
  img {
    display: flex;
    max-width: 48px;
    border-radius: 50%;
  }
`;

const NickName = styled.div`
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
