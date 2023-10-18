import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const TabWrapper = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  a {
    border-bottom: 1px solid #8bc264;
  }
  .block {
    margin-left: 5px;
  }
  .index-icon {
    width: 28px;
  }
`;

const OptionsItem = (props: IconItem) => {
  const {name, width = 48, height = 22, href, text, selectIndex, id, changeIndex} = props;
  return (
    <TabWrapper
      onClick={() => {
        changeIndex(id);
      }}
    >
      <div className="index-icon">
        {selectIndex === id && <img src="/index.svg" width={20} height={18} alt={name} />}
      </div>
      <Link {...{href}} legacyBehavior>
        <a className="block">{text}</a>
      </Link>
      {name && <Image src={`/${name}.svg`} alt={name} width={width} height={height} />}
    </TabWrapper>
  );
};
export default OptionsItem;
