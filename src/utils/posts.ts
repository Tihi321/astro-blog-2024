export const sortByDate = (posts: Array<any>) => {
  return posts.sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());
};
