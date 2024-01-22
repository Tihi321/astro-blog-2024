import { createSignal, onMount, onCleanup } from "solid-js";
import { styled } from "solid-styled-components";
import { Novel } from "./Novel";

const Container = styled("div")`
  position: relative;
  border: 5px solid #ff5722;
  border-radius: 10px;
  margin-bottom: 60px;
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

const MuteButton = styled("button")`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 54px;
  padding: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  opacity: 0.5;
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

export const TurtleStory = () => {
  const [startStory, setStartStory] = createSignal<boolean>(false);

  let audioElement: any;

  onMount(() => {
    audioElement.play();
    audioElement.volume = 0.03;
    audioElement.loop = true;
  });

  onCleanup(() => {
    audioElement.pause();
  });

  return (
    <Container>
      {startStory() && <Novel />}
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
      <MuteButton
        title="mute"
        role="button"
        type="button"
        onClick={() => (audioElement.muted = !audioElement.muted)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" id="layer1" viewBox="0 0 75 75">
          <polygon
            id="polygon1_extrashade"
            points="40.389,14.769 23.235,29.606 7,29.606 7,48.699 22.989,48.699 40.389,62.75 40.389,14.769"
            style="stroke:#ffffff;stroke-width:5;stroke-linejoin:round;"
          />
          <g id="g1shade" transform="translate(1,0)">
            <polygon
              id="polygon1s2"
              points="39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769"
              style="stroke:#ffffff;stroke-width:5;stroke-linejoin:round;"
            />
            <path
              id="path1s"
              d="M 48.128,49.03 C 50.057,45.934 51.19,42.291 51.19,38.377 C 51.19,34.399 50.026,30.703 48.043,27.577"
              style="fill:none;stroke:#ffffff;stroke-width:5;stroke-linecap:round"
            />
            <path
              id="path2s"
              d="M 55.082,20.537 C 58.777,25.523 60.966,31.694 60.966,38.377 C 60.966,44.998 58.815,51.115 55.178,56.076"
              style="fill:none;stroke:#ffffff;stroke-width:5;stroke-linecap:round"
            />
            <path
              id="path1s"
              d="M 61.71,62.611 C 66.977,55.945 70.128,47.531 70.128,38.378 C 70.128,29.161 66.936,20.696 61.609,14.01"
              style="fill:none;stroke:#ffffff;stroke-width:5;stroke-linecap:round"
            />
          </g>
          <g id="g1">
            <polygon
              id="polygon1"
              points="39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769"
              style="stroke:#ffffff;stroke-width:5;stroke-linejoin:round;fill:#ffffff;"
            />
            <path
              id="path1"
              d="M 48.128,49.03 C 50.057,45.934 51.19,42.291 51.19,38.377 C 51.19,34.399 50.026,30.703 48.043,27.577"
              style="fill:none;stroke:#ffffff;stroke-width:5;stroke-linecap:round"
            />
            <path
              id="path2"
              d="M 55.082,20.537 C 58.777,25.523 60.966,31.694 60.966,38.377 C 60.966,44.998 58.815,51.115 55.178,56.076"
              style="fill:none;stroke:#ffffff;stroke-width:5;stroke-linecap:round"
            />
            <path
              id="path1"
              d="M 61.71,62.611 C 66.977,55.945 70.128,47.531 70.128,38.378 C 70.128,29.161 66.936,20.696 61.609,14.01"
              style="fill:none;stroke:#ffffff;stroke-width:5;stroke-linecap:round"
            />
          </g>
        </svg>
      </MuteButton>
    </Container>
  );
};
