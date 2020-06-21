import { h } from "preact";

const Dashboard = () => {
  return (
    <main className={css["dashboard"]}>
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
    grid-template-rows: 1fr 1fr;
    padding: 1rem;
    width: 100%;
    background-color: var(--fermin-theme-background);
    iframe {
      height: 100%;
      width: 100%;
      border: none;
    }
  }
`;
