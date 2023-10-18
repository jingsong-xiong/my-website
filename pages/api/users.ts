import {User} from '@database/entity/User';
import {getConnection} from '@database/getConnection';
import {ironOptions} from '@lib/withSession';
import {withIronSessionApiRoute} from 'iron-session/next';

interface SignData {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export default withIronSessionApiRoute(async (req, res) => {
  const {username, password, passwordConfirmation} = req.body as SignData;
  const connect = await getConnection();
  const user = new User();
  user.username = username;
  user.password = password;
  user.passwordConfirmation = passwordConfirmation;
  let found;
  try {
    found = await connect.manager.findOneBy(User, {username});
  } catch (e) {
    // console.log(e)
  }

  if (found) {
    user.errors.username.push('用户名已存在');
  }

  await user.validate();
  if (user.hasErrors()) {
    await res.status(422).send(user.errors);
  } else {
    (req.session as any).user = user;
    await req.session.save();
    await connect.manager.save(user);
    await res.status(200).send(user);
  }
}, ironOptions);
