import {Modal, message} from 'antd';
import axios from 'axios';
import {NextPage} from 'next';
import StarsLayout from 'components/StarsLayout';
import {useForm} from 'hooks/useForm';

const SignUp: NextPage = () => {
  const [modal, contextHolder] = Modal.useModal();
  const {form} = useForm({
    initFormData: {username: '', password: '', passwordConfirmation: ''},
    submit: {
      request: (fromData) => axios.post('/api/users', fromData),
      success: (res, commitData) => {
        modal.confirm({
          title: '注册成功',
          content: (
            <div>
              <p>恭喜您成为第{res?.data?.id + 100}位用户！！！</p>
              <p>点击确定返回留言页面</p>
              <p>点击取消返回首页</p>
            </div>
          ),
          onOk: () => {
            const {username, password} = commitData;
            axios
              .post('/api/sessions', {username, password})
              .then(() => {
                location.href = '/messageBoard';
              })
              .catch(() => {
                message.error('登陆失败，请检查网络');
              });
          },
          okText: '返回留言页',
          cancelText: '返回首页',
          onCancel: () => {
            location.href = '/';
          },
        });
      },
    },
    fields: [
      {label: '用户名', key: 'username', type: 'email'},
      {label: '密码', key: 'password', type: 'password'},
      {label: '确认密码', key: 'passwordConfirmation', type: 'password'},
    ],
    buttonText: '注册',
  });
  return (
    <StarsLayout>
      <div>
        {form}
        {contextHolder}
      </div>
    </StarsLayout>
  );
};
export default SignUp;
