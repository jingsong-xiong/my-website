import qs from 'querystring';
import {message} from 'antd';
import axios from 'axios';
import {withIronSessionSsr} from 'iron-session/next';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {User} from '@database/entity/User';
import {ironOptions} from '@lib/withSession';
import StarsLayout from 'components/StarsLayout';
import {useForm} from 'hooks/useForm';

const SignIn: NextPage<{user: User}> = () => {
  const {form} = useForm({
    initFormData: {username: '', password: ''},
    submit: {
      request: (fromData) => axios.post('/api/sessions', fromData),
      success: () => {
        message.success('登陆成功.');
        const query = qs.parse(window.location.search.substr(1));
        location.href = query?.returnTo?.toString() || '/';
      },
    },
    fields: [
      {label: '用户名', key: 'username', type: 'email'},
      {label: '密码', key: 'password', type: 'password'},
    ],
    buttonText: '登陆',
    goToSignIn: true,
  });
  return (
    <StarsLayout>
      <div className="signIn">{form}</div>
    </StarsLayout>
  );
};
export default SignIn;

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async (context: GetServerSidePropsContext) => {
    const user = JSON.parse(JSON.stringify((context.req.session as any).user || null));
    return {
      props: {
        user,
      },
    };
  },
  ironOptions
);
