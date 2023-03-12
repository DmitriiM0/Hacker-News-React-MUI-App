export interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}
export type Action =
  | { type: 'updated_top_hundred'; payload: number[] }
  | { type: 'updated_story_list'; payload: Story[] };

export interface HackerNews {
  topHundred: number[];
  storyList: Story[];
  
}

export interface Commentary {
  by: string;
  id: number;
  dead?: boolean;
  deleted?: boolean;
  kids?: number[];
  parent: number;
  text: string;
  time: number;
  type: string;
}
