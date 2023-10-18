import {useEffect, useRef, useState} from 'react';
import {notification, message, Modal} from 'antd';
import cs from 'classnames';
import gsap from 'gsap';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {BasicBackground} from '@components/BasicBackground';
import {getImageFullUrl} from '@lib/index';
import {withMobile} from '@styles/styleHelper';
import {alertByWidth, inputSpaceToSnack} from 'lib/game';
const Games = () => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>();
  const [jump, setJump] = useState(false);

  const [isPhone, setIsPhone] = useState<'phone'>(null);
  const [imgList, setImgList] = useState<string[]>([
    'cloud1',
    ,
    'cloud2',
    'noun',
    'pipe',
    'mountain',
  ]);
  const [modal, contextHolder] = Modal.useModal();

  const goToSnack = () => {
    const {width, height} = getWidthAndHeight();
    gsap.to('#game-snack', {
      duration: 0.6,
      ease: 'none',
      keyframes: [
        {transform: 'translate3d(0, -2px, 0)', time: 0.1},
        {transform: 'translate3d(0, 4px, 0)', time: 0.2},
        {transform: 'translate3d(0, -8px, 0)', time: 0.3},
        {transform: 'translate3d(0, 8px, 0)', time: 0.4},
        {transform: 'translate3d(0, -8px, 0)', time: 0.5},
        {transform: 'translate3d(0, 8px, 0)', time: 0.6},
        {transform: 'translate3d(0, -8px, 0)', time: 0.7},
        {transform: 'translate3d(0, 4px, 0)', time: 0.8},
        {transform: 'translate3d(0, -2px, 0)', time: 0.9},
        {transform: 'translate3d(0, 4px, 0)', time: 0.8},
        {transform: 'translate3d(0, 0, 0)', time: 1},
      ],
    });
    gsap.to('#mario');
    // setTimeout(() => {
    //   router.push({pathname: '/games/snack', query: {width, height}});
    // }, 1000);
  };
  const getWidthAndHeight = () => {
    const width = ref.current?.clientWidth;
    const height = ref.current?.clientHeight;
    return {width, height};
  };

  const goToOther = () => {
    if (isPhone) {
      notification.open({
        message: 'tips:',
        style: {transform: `rotate(90deg)`, top: 110, left: 170},
        description: '敬请期待，先玩玩贪吃蛇吧',
      });
    } else {
      message.info('敬请期待，先玩玩贪吃蛇吧', 3);
    }
  };

  useEffect(() => {
    const {width} = getWidthAndHeight();
    alertByWidth({
      width,
      modal,
      onOk: () => {
        setIsPhone('phone');
      },
      onCancel: () => {
        // setImgList(['cloud1']);
      },
    });
    return inputSpaceToSnack(goToSnack);
  }, []);

  return (
    <GamesPage className={isPhone} ref={ref}>
      {imgList.map((imgName, index) => (
        <img key={index} className={imgName} src={getImageFullUrl(imgName)} alt={imgName} />
      ))}
      <img src={getImageFullUrl('noun')} alt="noun" className="noun2" />
      <GameWrapper>
        <SnackImg id="game-snack" src={getImageFullUrl('snack')} alt="snack" onClick={goToSnack} />
        <StyledWall src={getImageFullUrl('wall')} alt="wall" />
        <FruitImg src={getImageFullUrl('fruit')} alt="fruit" onClick={goToOther} />
        <StyledWall2 src={getImageFullUrl('wall')} alt="wall" />
      </GameWrapper>
      <Mario
        id="mario"
        src={getImageFullUrl('mario')}
        alt="mario"
        className={cs('mario', jump && 'jump')}
        onClick={goToSnack}
      />
      <Background height="120px" width="100vw" image={getImageFullUrl('ground')} />
      {contextHolder}
    </GamesPage>
  );
};

const StyledWall = styled.img`
  position: absolute;
  left: 100px;
  height: 100px;
  ${withMobile(`
    transform: rotate(360deg);
    left: 45px;
    height: 45px;
  `)};
`;

const StyledWall2 = styled(StyledWall)`
  position: absolute;
  left: 300px;

  ${withMobile(`
    height: 45px;
  `)};
`;

const GameWrapper = styled.div`
  position: absolute;
  height: 160px;
  left: 32%;
  display: flex;
  width: 410px;
  justify-content: space-around;
  top: 50%;
  ${withMobile(`
      transform: rotate(90deg);
      width: 200px;
      top: 38%;
      left: 5%;
  `)};
`;

const Background = styled(BasicBackground)`
  position: absolute;
  left: 0;
  bottom: 0;
  ${withMobile(`bottom: auto;
      top: 0;
      height: 100vh;
      width: 20px;
      background: #9a4900;
      border-right: 2px solid black;`)}
`;

const Mario = styled.img`
  height: 100px;
  position: absolute;
  left: 31.5%;
  bottom: 114px;
`;

// ${({jump}) => (jump ? ` animation: jump 0.1s linear;` : '')};
// ${({jump}) => {
//   return withMobile(`
//     transform: rotate(90deg);
//     height: 60px;
//     top: 34.5%;
//     left: 2%;
//     ${jump ? 'animation: jump2 0.1s ease;' : ''};
//   `);
// }};
const SnackImg = styled.img`
  position: absolute;
  left: 0;
  height: 100px;
  border-radius: 4px;
  ${withMobile(`
   transform: rotate(360deg);
   left: 0;
   height: 45px;
   border-radius: 4px;
  `)};
`;

const FruitImg = styled.img`
  position: absolute;
  left: 200px;
  height: 100px;
  border-radius: 4px;
  ${withMobile(`
    transform: rotate(360deg);
    left: 90px;
    height: 45px;
    border-radius: 4px;
  `)};
`;

const GamesPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  background: #9293fe;
  ${withMobile(`
    position: fixed;
    right: 0;
    top: 0;
  `)};

  @keyframes jump {
    from {
      bottom: 114px;
    }
    to {
      bottom: auto;
      top: calc(50% + 100px);
    }
  }
  @keyframes jump2 {
    from {
      left: 10%;
    }
    to {
      left: 20%;
    }
  }

  .cloud1 {
    height: 130px;
    position: absolute;
    left: 25%;
  }

  .cloud2 {
    height: 180px;
    position: absolute;
    top: 10%;
    left: 52%;
  }

  .mountain {
    height: 120px;
    position: absolute;
    left: 0;
    bottom: 120px;
  }

  .pipe {
    position: absolute;
    width: 188px;
    right: 25%;
    bottom: 118px;
  }

  .noun {
    position: absolute;
    width: 100px;
    left: 38%;
    top: 16%;
  }

  .noun2 {
    position: absolute;
    width: 100px;
    left: 10%;
    top: 50%;
  }

  &.phone {
    .cloud1 {
      height: 80px;
      transform: rotate(90deg);
      left: 68%;
      top: 12%;
    }

    .cloud2 {
      height: 100px;
      transform: rotate(90deg);
      top: 58%;
      left: 52%;
    }

    .mountain {
      height: 80px;
      transform: rotate(90deg);
      left: -55px;

      top: 8%;
    }

    .pipe {
      transform: rotate(90deg);
      width: 90px;
      left: 3%;
    }

    .noun {
      transform: rotate(90deg);
      width: 50px;
      left: 38%;
      top: 16%;
    }

    .noun2 {
      transform: rotate(90deg);
      width: 50px;
      left: 70%;
      top: 35%;
    }
  }
`;
export default Games;
