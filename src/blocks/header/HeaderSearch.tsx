import { createSignal } from "solid-js";
import { SearchInput } from "../inputs/SearchInput";
import { get } from "lodash-es";
import { styled } from "solid-styled-components";

const Input = styled(SearchInput)`
  width: 230px;
  padding: 4px 8px;
`;

export const HeaderSearch = () => {
  const [search, setSearch] = createSignal<string>("");

  const onSubmit = (value: string) => {
    window.location.href = `/search?${value}`;
  };

  return (
    <Input
      placeholder="Search"
      value={search() || get(window.location, ["search"]).replaceAll("?", "")}
      onInput={(value) => setSearch(value)}
      onSubmit={onSubmit}
    />
  );
};
