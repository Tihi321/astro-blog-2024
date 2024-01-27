import { filter, get, includes, map, toLower } from "lodash-es";
import { styled } from "solid-styled-components";
import { createComputed, createSignal } from "solid-js";
import { SearchInput } from "../inputs/SearchInput";
import { calculateReadingTime } from "../../utils/posts";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
`;

const Posts = styled("ul")`
  list-style-type: none;
`;

const Input = styled(SearchInput)`
  width: 100%;
  padding: 4px 8px;
  margin: 16px auto;

  @media (min-width: 769px) {
    width: 420px;
  }
`;

type PostsProp = Array<any>;
type SearchProps = { posts: PostsProp };

const getFormattedDate = (date: Date) => {
  return (
    <time datetime={date.toISOString()}>
      {date.toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </time>
  );
};

export const SearchList = ({ posts }: SearchProps) => {
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
    <Container>
      <Input
        placeholder="Search"
        value={search() || get(window.location, ["search"]).replaceAll("?", "")}
        onInput={(value) => setSearch(value)}
      />
      <Posts>
        {map(filteredPosts(), (post) => (
          <li class="post">
            <a class="post-link" href={`/post/${get(post, ["slug"])}`}>
              <div
                class="hero-image"
                style={`background-image: url(${get(post, ["data", "heroImage"])});`}
                title={get(post, ["data", "title"])}
              />
              <h4>{get(post, ["data", "title"])}</h4>
            </a>
            <div class="info">
              <div class="categories">
                {map(get(post, ["data", "categories"], []), (category) => (
                  <a href={`/blog/${category}/`}>{category}</a>
                ))}
              </div>
              <div>
                <span class="reading-time">{calculateReadingTime(get(post, ["body"]))} min</span>
                {getFormattedDate(get(post, ["data", "pubDate"]))}
              </div>
            </div>
            {get(post, ["data", "description"])}
          </li>
        ))}
      </Posts>
    </Container>
  );
};
