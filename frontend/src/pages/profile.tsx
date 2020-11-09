import { h } from "preact";
import Button from "src/components/core/Button";
import ImageInput from "src/components/core/ImageInput";

const Profile = () => {
  return (
    <main className={css["profile"]}>
      <div className={css["content-container"]}>
        <ImageInput className={css["avatar"]} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Ski_trail_rating_symbol-green_circle.svg/1200px-Ski_trail_rating_symbol-green_circle.svg.png" />
        <span className={css["divider"]} />
        <div className={css["right-hand-side"]}>
          <p>dafn</p>
          <Button className={css["button"]} variant="warning" outlined>
            Log out
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Profile;

css`
  .profile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    background-color: var(--fermin-background);
    .content-container {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      width: 20rem;
      > * {
        align-self: center;
        justify-self: center;
      }
      .avatar {
        height: 6rem;
        max-height: 6rem;
        width: auto;
        max-width: auto;
      }
      .divider {
        height: 4rem;
        width: 0.05rem;
        background: var(--fermin-background-contrast);
      }
      .right-hand-side {
        display: flex;
        justify-content: center;
        flex-direction: column;
        p {
          margin-top: 0;
        }
        .button {
          height: max-content;
          width: max-content;
        }
      }
    }
  }
`;
