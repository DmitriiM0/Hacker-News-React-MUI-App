import { createContext } from 'react';
import { HackerNews, Action } from '../types';
import React from 'react';


export const HackerNewsContext = createContext<HackerNews>({
  topHundred: [],
  storyList: [],
});
export const DispatchContext = createContext<React.Dispatch<Action>>(() => {});
