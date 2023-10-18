import React from 'react';
import _ from 'lodash';
import Link from 'next/link';

interface Options {
  pageNumber: number;
  totalPage: number;
  urlMaker?: (n: number) => string;
}
const defaultMakerUrl = (n: number) => {
  return `?page=${n}`;
};

const usePager = (options: Options) => {
  const {pageNumber, totalPage, urlMaker = defaultMakerUrl} = options;
  const numbers = [];
  numbers.push(1);

  for (let i = pageNumber - 3; i <= pageNumber + 3; i++) {
    numbers.push(i);
  }
  numbers.push(totalPage);
  const pageNumbers = _.uniq(numbers)
    .sort()
    .filter((n) => n >= 1 && n <= totalPage)
    .reduce(
      (result, n) =>
        n - (result[result.length] - 1 || 0) === 1 ? result.concat(n) : result.concat(-1, n),
      []
    );
  const pager = (
    <div className="wrapper">
      {pageNumber !== 1 && (
        <Link href={urlMaker(pageNumber - 1)} legacyBehavior>
          <a>上一页</a>
        </Link>
      )}
      {pageNumbers.map((n) =>
        n === -1 ? (
          <span key={n}>...</span>
        ) : (
          <Link key={n} href={urlMaker(n)} legacyBehavior>
            <a>{n}</a>
          </Link>
        )
      )}
      {totalPage > pageNumber && (
        <Link href={urlMaker(pageNumber + 1)} legacyBehavior>
          <a>下一页</a>
        </Link>
      )}
      <span>
        第{pageNumber}/{totalPage}页
      </span>
      <style jsx>
        {`
          .wrapper > a,
          .wrapper > span {
            margin: 0 8px;
          }
        `}
      </style>
    </div>
  );
  return {pager};
};

export default usePager;
