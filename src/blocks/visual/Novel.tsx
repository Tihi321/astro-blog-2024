import { createSignal, onMount, onCleanup } from "solid-js";
import { styled } from "solid-styled-components";
import { text } from "./story";

const Content = styled("div")`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 20px 60px 20px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  border-top: 5px solid #ff5722;
  color: #24556d;
  font-weight: bold;
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

  &:disabled {
    opacity: 0.5;
  }
`;

const Image = styled("img")`
  display: block;
`;

export const Novel = () => {
  const [imageNumber, setImageNumber] = createSignal<number>(0);

  let audioElement: any;

  onMount(() => {
    audioElement.play();
  });

  onCleanup(() => {
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
