import { ceil } from "lodash-es";

export const sortByDate = (posts: Array<any>) => {
  return posts.sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());
};

export const calculateReadingTime = (content: string) => {
  return ceil(content.length / 1500);
};
