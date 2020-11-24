import { h } from "preact";

import BookmarkHub from "src/components/BookmarkHub"

const Dashboard = () => {
  return (
    <main className={css["dashboard"]}>
      <BookmarkHub className={css["bookmark-hub"]} />
      <iframe src="https://bors.e24.no/#!/market/world"></iframe>
      <iframe src="https://finansavisen.no"></iframe>
    </main>
  );
};

export default Dashboard;

css`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: min-content 1fr;
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
    padding: 1rem;
    width: 100%;
    background-color: var(--fermin-background);
    .bookmark-hub {
      grid-column: 1;
      grid-row: 1;
    }
    :nth-child(2) {
      grid-column: 1;
      grid-row: 2;
    }
    :nth-child(3) {
      grid-column: 2;
      grid-row-start: 1;
      grid-row-end: 3;
    }
    iframe {
      height: 100%;
      width: 100%;
      border: none;
    }
  }
`;
