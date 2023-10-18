import {useRouter} from 'next/router';

const createRuleHash = (currentDirection: Direction) => {
  return {
    ArrowLeft: {key: 'x', value: -15, constraint: currentDirection !== 'ArrowRight'},
    ArrowRight: {key: 'x', value: 15, constraint: currentDirection !== 'ArrowLeft'},
    ArrowDown: {key: 'y', value: 15, constraint: currentDirection !== 'ArrowUp'},
    ArrowUp: {key: 'y', value: -15, constraint: currentDirection !== 'ArrowDown'},
  };
};
const creatPlace = (options: CreatePlace) => {
  const {number, width, height} = options;
  const placeList = [];
  while (placeList.length !== number) {
    placeList.push({
      x: Math.floor(Math.random() * Math.floor((width - 20) / 100)) * 100,
      y: Math.floor(Math.random() * Math.floor((height - 20) / 100)) * 100,
      background: '#' + Math.floor(Math.random() * (2 << 23)).toString(16),
    });
  }

  return placeList;
};
const getHeadAndBody = ({width}: GetHeadAndBody) => {
  let headAndBody = {
    initHead: {x: 50, y: 20},
    initBody: [
      {x: 35, y: 20},
      {x: 20, y: 20},
    ],
  };
  if (width <= 700) {
    // const phoneX = Math.floor((width - 20) / 100) * 100

    headAndBody = {
      initHead: {x: 200, y: 40},
      initBody: [
        {x: 200, y: 25},
        {x: 200, y: 10},
      ],
    };
  }
  return headAndBody;
};
const useWidthAndHeightByRouter = () => {
  const router = useRouter();
  const {query} = router;
  const width = parseInt(query.width as string);
  const height = parseInt(query.height as string);
  return {width, height};
};

export {createRuleHash, creatPlace, getHeadAndBody, useWidthAndHeightByRouter};
