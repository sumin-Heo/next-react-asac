'use client';

import React from 'react';
import { useEffect, useState } from 'react';

interface ResultProfile {
  title: string;
  body: string;
}

// React Component TSX JSX - HTML -> XML
export default function LocalState() {
  // loading, data, error
  const [loading, setLoading] = useState<boolean>(true); // => false
  const [data, setData] = useState<ResultProfile | undefined>(); // string or undefined
  const [error, setError] = useState<boolean>(false); // => true

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(async (result: Response) => {
        const resultBody: ResultProfile = await result.json();
        setLoading(false);
        setData(resultBody);
        setError(false);
      })
      .then(() => {
        // Network 커넥션이 끊겼을때만 호출된다.
        setLoading(false);
        setData(undefined);
        setError(true);
      });
  }, []);

  // ?. : question mark, Null Guard
  // ! : exclamation mark
  // ?? : Default Value 설정 시 (앞엣것이 undefined, null 일 경우)
  // && : 앞엣 조건이 true 일때 뒤엣것을 반환해야할 시

  return (
    <React.Fragment>
      {loading ? (
        <p>...is Loading...</p>
      ) : (
        <div>
          {/* data = undefined */}
          {/* data?.title = undefined */}
          <div>{data?.title ?? 'DEFAULT_TITLE'}</div>
          <div>{data?.body ?? 'DEFAULT_BODY'}</div>
        </div>
      )}
      <p>{error && 'Error Occured'}</p>
    </React.Fragment>
  );
}
