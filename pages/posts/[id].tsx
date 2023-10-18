import React from 'react';
import {Post} from '@database/entity/Post';
import {getConnection} from '@database/getConnection';
import {NextPage, GetServerSideProps} from 'next';
import Link from 'next/link';

type Props = {
  post: string;
};
const PostsShow: NextPage<Props> = (props) => {
  const {post} = props;
  const data: Post = JSON.parse(post);
  return (
    <div>
      <h1>{data.title}</h1>
      <div>{data.content}</div>
      <div>{data.author}</div>
      <div>{data.createdAt}</div>
      <Link href={`/posts/[id]/edit`} as={`/posts/${data.id}/edit`} legacyBehavior>
        <a>编辑</a>
      </Link>
    </div>
  );
};

export default PostsShow;

export const getServerSideProps: GetServerSideProps<any, {id: string}> = async (context) => {
  const id = context.params?.id;

  const connection = await getConnection();
  const post = await connection.manager.findOne(Post, {where: {id}});

  return {
    props: {
      post: JSON.stringify(post || {}),
    },
  };
};
