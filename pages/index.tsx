import React from 'react';
import { useRouter } from 'next/router';

import { AppContext } from '../components/AppContext';

export default function Home() {
  const appCtx = React.useContext(AppContext);
  const router = useRouter();

  const [data, setData] = React.useState<string>('');

  React.useEffect(() => {
    appCtx.fetchApi('get', '/api/hello').then(setData);
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">{data}</h1>
    </div>
  );
}
