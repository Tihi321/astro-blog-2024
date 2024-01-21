import { createSignal, onMount, onCleanup } from "solid-js";
import { styled } from "solid-styled-components";
import { text } from "./story";

const Container = styled("div")`
  position: relative;
  border: 5px solid #ff5722;
  border-radius: 10px;
  margin-bottom: 60px;
`;

const Content = styled("div")`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 20px 60px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  border-top: 5px solid #ff5722;
  color: #795548;
`;

const Button = styled("button")`
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 250px;
  padding: 10px;
  border: none;
  color: #0c0700;
  background: #607d8b;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
`;

const Title = styled("h3")`
  position: absolute;
  top: 20%;
  z-index: 1;
  background: beige;
  left: 15px;
  right: 15px;
  text-align: center;
  border: 2px solid #795548;
  color: #795548;
`;

const Image = styled("img")`
  display: block;
`;

export const Story = () => {
  const [imageNumber, setImageNumber] = createSignal<number>(0);

  let audioElement: any;

  onMount(() => {
    // Play the audio when the component mounts
    audioElement.play();
  });

  onCleanup(() => {
    // Pause the audio when the component unmounts
    audioElement.pause();
  });

  return (
    <>
      <Button
        style={{ left: 0 }}
        title="prev image"
        role="button"
        type="button"
        disabled={imageNumber() === 0}
        onClick={() => {
          setImageNumber(imageNumber() - 1);
          audioElement.load();
          audioElement.play();
        }}
      >
        Back
      </Button>
      <Button
        style={{ right: 0 }}
        title="next image"
        role="button"
        type="button"
        disabled={imageNumber() === 5}
        onClick={() => {
          setImageNumber(imageNumber() + 1);
          audioElement.load();
          audioElement.play();
        }}
      >
        Next
      </Button>
      <Content>{text[imageNumber()]}</Content>
      <Image src={`/content/images/assets/turtle-story/${imageNumber()}.png`} alt="turtle" />
      <audio ref={audioElement}>
        <source
          src={`/content/images/assets/turtle-story/audio/${imageNumber()}.mp3`}
          type="audio/mpeg"
        />
      </audio>
    </>
  );
};

export const TurtleStory = () => {
  const [startStory, setStartStory] = createSignal<boolean>(false);

  let audioElement: any;

  onMount(() => {
    // Play the audio when the component mounts
    audioElement.play();
    audioElement.volume = 0.01;
  });

  onCleanup(() => {
    // Pause the audio when the component unmounts
    audioElement.pause();
  });

  return (
    <Container>
      {startStory() && <Story />}
      {!startStory() && (
        <>
          <Title>The Turtle's Trail and the Hamster's Quest</Title>
          <Button
            style={{ left: "50%", transform: "translate(-50%, -50%)", top: "50%", height: "40px" }}
            title="start story"
            role="button"
            type="button"
            onClick={() => {
              console.log("start story");
              setStartStory(true);
            }}
          >
            Start
          </Button>
          <Image
            style={{ filter: "blur(2px)" }}
            src={`/content/images/assets/turtle-story/intro.png`}
            alt="turtle"
          />
        </>
      )}
      <audio ref={audioElement}>
        <source
          src={`/content/images/assets/turtle-story/audio/just-relax.mp3`}
          type="audio/mpeg"
        />
      </audio>
    </Container>
  );
};
