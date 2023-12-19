import { filter, get, includes, map, toLower } from "lodash-es";
import { styled } from "solid-styled-components";
import { createComputed, createSignal } from "solid-js";
import { SearchInput } from "../inputs/SearchInput";

const Input = styled(SearchInput)`
  width: 230px;
  padding: 4px 8px;
`;

type PostsProp = Array<any>;
type SearcgProps = { posts: PostsProp };

export const SearchList = ({ posts }: SearcgProps) => {
  const [search, setSearch] = createSignal<string>(
    get(window.location, ["search"]).replaceAll("?", "")
  );
  const [filteredPosts, setFilteredPosts] = createSignal<PostsProp>(posts);

  createComputed(() => {
    const searchQuery = toLower(search());
    console.log(searchQuery);
    const items = filter(posts, (item) => {
      return includes(toLower(get(item, ["data", "title"])), searchQuery);
    });

    setFilteredPosts(items);
  });

  return (
    <div>
      <Input
        placeholder="Search"
        value={search() || get(window.location, ["search"]).replaceAll("?", "")}
        onInput={(value) => setSearch(value)}
      />
      {map(filteredPosts(), (post) => (
        <a href={`/post/${get(post, ["slug"])}`}>
          <img src={get(post, ["data", "heroImage"])} />
          <div>{get(post, ["data", "title"])}</div>
        </a>
      ))}
    </div>
  );
};
