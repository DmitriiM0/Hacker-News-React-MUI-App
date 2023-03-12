import { HackerNews, Action } from '../types';

export default function reducer(state: HackerNews, action: Action) {
  switch (action.type) {
    case 'updated_top_hundred': {
      return { ...state, topHundred: action.payload };
    }
    case 'updated_story_list': {
      return { ...state, storyList: action.payload };
    }
    default:
      return state;
  }
}
