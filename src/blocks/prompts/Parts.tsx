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

export const Parts = () => {
  const [title, setTitle] = createSignal<string>("");
  const [numberOfWorkds, setNumberOfWords] = createSignal<number>(2000);
  const [parts, setParts] = createSignal<number>(3);
  const [activePart, setActivePart] = createSignal<number>(1);

  return (
    <Container>
      <Title>Parts</Title>
      <Inputs>
        <Input placeholder="Title" value={title()} onInput={(value) => setTitle(value)} />
        <Input
          placeholder="Parts"
          type="number"
          value={parts()}
          onInput={(value) => setParts(value)}
        />
        <Input
          placeholder="Number of Words"
          type="number"
          value={numberOfWorkds()}
          onInput={(value) => setNumberOfWords(value)}
        />
      </Inputs>
      <Inputs>
        <Generate onClick={() => setActivePart(activePart() - 1)}>Prev</Generate>
        <Generate onClick={() => setActivePart(activePart() + 1)}>Next</Generate>
      </Inputs>

      <PromptContainer>{`Use markdown formatting, bolded words, lists and tables to write Part ${activePart()} of ${parts()} of ${numberOfWorkds()} words essay about "${title()}"`}</PromptContainer>
    </Container>
  );
};
