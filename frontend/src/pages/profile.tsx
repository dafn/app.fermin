import { h } from "preact";
import { useContext } from "preact/hooks";
import authContext from "src/auth/authContext";
import Button from "src/components/core/Button";
import ImageInput from "src/components/core/ImageInput";
import { put } from "src/api/user";
import { logout } from "src/api/auth";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useContext(authContext);

  const handleOnChange = (base64: string) => {
    setUser({
      ...user,
      src: base64,
    });
    put({
      src: base64,
    });
  };

  return (
    <main className={css["profile"]}>
      <div className={css["content-container"]}>
        <ImageInput
          className={css["avatar"]}
          src={user?.src}
          onChange={(_, base64) => handleOnChange(base64)}
          circle
          frame
        />
        <span className={css["divider"]} />
        <div className={css["right-hand-side"]}>
          <p>{user?.username}</p>
          <Button
            className={css["button"]}
            variant="warning"
            outlined
            onClick={() => logout().then(() => setIsLoggedIn(false))}
          >
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
        max-height: 6rem;
        max-width: 6rem;
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
