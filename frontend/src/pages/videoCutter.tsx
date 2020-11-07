import { h } from "preact";

const VideoCutter = () => {
  return (
    <main className={css["video-cutter"]}>
      <iframe
        src="https://online-video-cutter.com/"
      ></iframe>
    </main>
  );
};

export default VideoCutter;

css`
  .video-cutter {
    padding: 1rem;
    width: 100%;
    background-color: var(--fermin-background);
    iframe {
      height: 100%;
      width: 100%;
      border: none;
    }
  }
`;
