import * as process from 'process';

export function sleep(time: number) {
  return new Promise((resolve) => {
    let timerId = setTimeout(() => {
      resolve(time);
      window.clearTimeout(timerId);
    }, time);
  });
}

export const debounce = (fn: Function, delay: number) => {
  let timerId = null;
  return function (...args: any[]) {
    if (timerId) {
      return window.clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn.call(undefined, ...args);
    }, delay);
  };
};

export const throttle = (fn: Function, delay: number) => {
  let toggle = true;
  return function (...args: any[]) {
    if (toggle) {
      toggle = false;
      fn.call(undefined, ...args);
      const timerId = setTimeout(() => {
        window.clearTimeout(timerId);
        toggle = true;
      }, delay);
    }
  };
};
export function friendlyDate(dateStr: string) {
  let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr);
  let space = Date.now() - dateObj.getTime();
  let str: string;
  switch (true) {
    case space < 60000:
      str = '刚刚';
      break;
    case space < 1000 * 3600:
      str = Math.floor(space / 60000) + '分钟前';
      break;
    case space < 1000 * 3600 * 24:
      str = Math.floor(space / (1000 * 3600)) + '小时前';
      break;
    default:
      str = Math.floor(space / (1000 * 3600 * 24)) + '天前';
  }
  return str;
}

export const getImageFullUrl = (imageName: string) => {
  return `${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${imageName}.webp`;
};
