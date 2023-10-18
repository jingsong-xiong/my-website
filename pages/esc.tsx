import {useEffect} from 'react';
import {NextPage} from 'next';

type Props = {};
const Esc: NextPage<Props> = () => {
  useEffect(() => {
    if (
      navigator.userAgent.indexOf('Firefox') != -1 ||
      navigator.userAgent.indexOf('Chrome') != -1
    ) {
      window.location.href = 'about:blank';
      window.close();
    } else {
      window.opener = null;
      window.open('', '_self');
      window.close();
    }
  }, []);
  // eslint-disable-next-line react/react-in-jsx-scope
  return <></>;
};
export default Esc;
