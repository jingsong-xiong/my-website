import qs from 'querystring';
import {NextPage, GetServerSideProps, GetServerSidePropsContext} from 'next';
import Link from 'next/link';
import usePager from 'hooks/usePager';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {Post} from 'src/entity/Post';

type Props = {
  posts: string;
  totalPage: number;
  pageNumber: number;
};

const Index: NextPage<Props> = ({posts, totalPage, pageNumber}) => {
  const data: Post[] = JSON.parse(posts);
  const {pager} = usePager({totalPage, pageNumber});

  return (
    <div>
      {data.map((item) => {
        return (
          <li key={item.id}>
            <Link href={`/posts/${item.id}`} as={`/posts/${item.id}`} legacyBehavior>
              <a>{item.title}</a>
            </Link>
          </li>
        );
      })}
      <footer>
        页脚
        {pager}
      </footer>
    </div>
  );
};
export default Index;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const connect = await getDatabaseConnection();
  const index = context.req.url.indexOf('?');
  const search = context.req.url.substr(index + 1);
  const pageNumber = parseInt(qs.parse(search).page?.toString()) || 1;
  const perPage = 3;

  const [posts, count] = await connect.manager.findAndCount(Post, {
    skip: (pageNumber - 1) * perPage,
    take: perPage,
  });
  const totalPage = Math.ceil(count / perPage);
  return {
    props: {
      posts: JSON.stringify(posts),
      totalPage,
      perPage,
      pageNumber,
    },
  };
};
