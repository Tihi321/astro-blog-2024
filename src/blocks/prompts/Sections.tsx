import { createSignal } from "solid-js";
import { SearchInput } from "../inputs/SearchInput";
import { styled } from "solid-styled-components";

const Container = styled("div")`
  border: 1px solid var(--primary);
  padding: 20px;
`;

const Inputs = styled("div")`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
`;

const Title = styled("h2")`
  font-weight: bold;
`;

const Input = styled(SearchInput)`
  min-width: 200px;
  flex: 1;
  padding: 4px 8px;
`;

const Generate = styled("button")`
  padding: 4px 8px;
  min-width: 200px;
  flex: 1;
`;

const PromptContainer = styled("div")`
  width: 100%;
  margin-top: 20px;
  border: 1px solid var(--primary);
  border-radius: 6px;
  padding: 20px;
  height: 100px;
  overflow: auto;
`;

export const Sections = () => {
  const [title, setTitle] = createSignal<string>("");
  const [numberOfWorkds, setNumberOfWords] = createSignal<number>(500);
  const [outlines, setOutlines] = createSignal<number>(4);
  const [activeSection, setActiveSection] = createSignal<number>(1);

  return (
    <Container>
      <Title>Section by Section</Title>
      <Inputs>
        <Input placeholder="Title" value={title()} onInput={(value) => setTitle(value)} />
        <Input
          placeholder="Bullet Points"
          type="number"
          value={outlines()}
          onInput={(value) => setOutlines(value)}
        />
        <Input
          placeholder="Number of Words"
          type="number"
          value={numberOfWorkds()}
          onInput={(value) => setNumberOfWords(value)}
        />
      </Inputs>
      <Inputs>
        <Generate onClick={() => setActiveSection(activeSection() - 1)}>Prev</Generate>
        <Generate onClick={() => setActiveSection(activeSection() + 1)}>Next</Generate>
      </Inputs>

      <PromptContainer>{`Write me an article outline about "${title()}" using roman letters starting from I, give me ${outlines()} outlines.`}</PromptContainer>
      <PromptContainer>{`Use markdown formatting, bolded words, lists and tables to write a detailed paragraph about section ${activeSection()} of the above outline.`}</PromptContainer>
    </Container>
  );
};
