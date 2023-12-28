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

const Post = styled("li")`
  width: 100%;
  margin-bottom: 12px;
  text-decoration: none;
  transition: 0.2s ease;
`;

const PostLink = styled("a")`
  display: block;

  &:hover {
    img {
      box-shadow: var(--box-shadow);
    }
  }
`;

const Info = styled("div")`
  margin: 0;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
`;

const Categories = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 4px;
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
          <Post>
            <PostLink href={`/post/${get(post, ["slug"])}`}>
              <img src={get(post, ["data", "heroImage"])} />
              <h4>{get(post, ["data", "title"])}</h4>
            </PostLink>
            <Info>
              <Categories>
                {map(get(post, ["data", "categories"], []), (category) => (
                  <a href={`/blog/${category}/`}>{category}</a>
                ))}
              </Categories>
              <div>
                <span class="reading-time">{calculateReadingTime(get(post, ["body"]))} min</span>
                {getFormattedDate(get(post, ["data", "pubDate"]))}
              </div>
            </Info>
            {get(post, ["data", "description"])}
          </Post>
        ))}
      </Posts>
    </Container>
  );
};
