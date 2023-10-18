import {User} from '@database/entity/User';
import {getConnection} from '@database/getConnection';
import {SignIn} from '@database/model/SignIn';
import {ironOptions} from '@lib/withSession';
import {withIronSessionApiRoute} from 'iron-session/next';
import {NextApiHandler} from 'next';

const Sessions: NextApiHandler = async (req, res) => {
  const {username, password} = req.body;
  const signIn = new SignIn();
  signIn.password = password;
  signIn.username = username;
  const connection = await getConnection();
  await signIn.validate();
  if (signIn.hasErrors()) {
    res.status(422).json(signIn.errors);
    return;
  } else {
    (req.session as any).user = await connection.manager.findOne(User, {where: {username}});
    await req.session.save();
    res.status(200).json(signIn.user);
  }
};
export default withIronSessionApiRoute(Sessions, ironOptions);
