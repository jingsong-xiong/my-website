let cache: any[] = [];
function deepClone(source: any) {
  if (source instanceof Object) {
    let cacheDist = findCache(source);
    if (cacheDist) {
      return cacheDist;
    } else {
      let dist: {[key: string]: any};
      if (source instanceof Array) {
        dist = [];
      } else if (source instanceof Function) {
        dist = function () {
          return source.apply(this, arguments);
        };
      } else if (source instanceof Date) {
        return source.toString();
      } else {
        dist = {};
      }
      cache.push([source, dist]);
      for (let i in source) {
        dist[i] = deepClone(source[i]);
      }
      return dist;
    }
  } else {
    if (source === undefined) {
      return null;
    }
    return source;
  }
}

function findCache(source: any) {
  for (let i = 0; i < cache.length; i++) {
    if (cache[i][0] === source) {
      return cache[i][1];
    }
  }
  return null;
}

export default deepClone;
