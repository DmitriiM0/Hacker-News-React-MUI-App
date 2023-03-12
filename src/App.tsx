import { useReducer } from 'react';
import axios from 'axios';
import NewsList from './scenes/pages/NewsList';
import NewsPage from './scenes/pages/NewsPage';
import Navbar from './scenes/global/Navbar';
import reducer from './reducer';
import { HackerNews } from './types';
import { HackerNewsContext, DispatchContext } from './context';
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
  isRouteErrorResponse,
} from 'react-router-dom';

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  if (isRouteErrorResponse(error)) {
    return <h1>{error.status + ' ' + error.statusText}</h1>;
  } else {
    return <h1>Ooops</h1>;
  }
}

const initialState: HackerNews = {
  topHundred: [],
  storyList: [],
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    errorElement: <ErrorBoundary />,

    children: [
      {
        index: true,
        element: <NewsList />,
      },
      {
        path: ':storyId',
        element: <NewsPage />,
        loader: async ({ params }) => {
          const { data } = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${params.storyId}.json`
          );
          return [params.storyId, data];
        },
      },
    ],
  },
]);

export default function App() {
  const [hackerNews, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <HackerNewsContext.Provider value={hackerNews}>
        <DispatchContext.Provider value={dispatch}>
          <RouterProvider
            router={router}
            fallbackElement={<h1>loading...</h1>}
          />
        </DispatchContext.Provider>
      </HackerNewsContext.Provider>
    </>
  );
}
