import { createSignal } from "solid-js";
import { SearchInput } from "../inputs/SearchInput";
import { map, range } from "lodash-es";
import { styled } from "solid-styled-components";

const Container = styled("div")`
  border: 1px solid var(--primary);
  padding: 20px;
`;

const Inputs = styled("div")`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Title = styled("h2")`
  font-weight: bold;
`;

const Input = styled(SearchInput)`
  width: 200px;
  padding: 4px 8px;
`;

const Generate = styled("button")`
  width: 230px;
  padding: 4px 8px;
`;

const PromptContainer = styled("div")`
  width: 100%;
  margin-top: 20px;
  border: 1px solid var(--primary);
  border-radius: 6px;
  padding: 20px;
  height: 300px;
  overflow: auto;
`;

export const NinjaPrompts = () => {
  const [title, setTitle] = createSignal<string>("");
  const [numberOfWorkds, setNumberOfWords] = createSignal<number>(500);
  const [bullets, setBullets] = createSignal<number>(4);
  const [prompt, setPrompt] = createSignal<string>("");

  const onSubmit = () => {
    const titleValue = title();
    const numberOfWordsValue = numberOfWorkds();
    const bulletsValue = bullets();
    const prompt = `I want you to execute the following steps. Step 1 - generate ${bulletsValue} popular questions about "${titleValue}".`;
    const setpsArray = map(
      range(bulletsValue),
      (index) =>
        `Step ${index + 2} - take the ${
          index + 2 - 1
        }. question from the list from Step 1 and write a ${numberOfWordsValue} word article about it.`
    );
    setPrompt(prompt + "  " + setpsArray.join(" "));
  };

  return (
    <Container>
      <Title>Ninja Prompting</Title>
      <Inputs>
        <Input
          placeholder="Title"
          value={title()}
          onInput={(value) => setTitle(value)}
          onSubmit={onSubmit}
        />
        <Input
          placeholder="Bullet Points"
          type="number"
          value={bullets()}
          onInput={(value) => setBullets(value)}
          onSubmit={onSubmit}
        />
        <Input
          placeholder="Number of Words"
          type="number"
          value={numberOfWorkds()}
          onInput={(value) => setNumberOfWords(value)}
          onSubmit={onSubmit}
        />
        <Generate onClick={onSubmit}>Generate</Generate>
      </Inputs>
      <PromptContainer>{prompt()}</PromptContainer>
    </Container>
  );
};
