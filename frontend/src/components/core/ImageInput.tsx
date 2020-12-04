import { h } from "preact";
import { useRef } from "preact/hooks";
import cn from "src/utils/cn";

type Base64 = string;
interface Props {
  src: string;
  onChange?: (name: string, base64: string) => void;
  className?: string;
  iconClass?: string;
  placeholder?: string;
  circle?: boolean;
}

const ImageInput = ({
  src,
  className,
  onChange,
  iconClass = "icon-plus",
  placeholder = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png",
  circle,
}: Props) => {
  const fileInput = useRef(null);

  return (
    <section
      className={cn({
        [css["image-input"]]: true,
        [className]: !!className,
      })}
      onClick={() => {
        fileInput.current["click"]();
      }}
    >
      <img
        src={src || placeholder}
        alt="image"
        className={cn({ [css["circle"]]: circle })}
      />
      <div className={css["add-image"]}>
        <i className={`${css["add-image-icon"]} ${iconClass}`} />
      </div>
      <input
        type="file"
        ref={fileInput}
        accept="image/*"
        onChange={({ target }) => {
          const file = target["files"][0];

          if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
              onChange && onChange(file.name, reader.result as string);
            };

            reader.readAsDataURL(file);
          }
        }}
      />
    </section>
  );
};

export default ImageInput;

css`
  .image-input {
    display: grid;
    position: relative;
    height: 4rem;
    width: 4rem;
    align-self: center;
    cursor: pointer;
    img {
      transition: opacity 0.1s;
      justify-self: center;
      align-self: center;
      height: inherit;
      width: inherit;
      &.circle {
        border-radius: 50%;
      }
    }
    input {
      position: absolute;
      visibility: hidden;
      height: 0;
      width: 0;
    }
    .add-image {
      display: grid;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.1s;
      height: 100%;
      width: 100%;
      .add-image-icon {
        align-self: center;
        justify-self: center;
        color: var(--fermin-background-contrast);
      }
      & > * {
        grid-row: 1;
        grid-column: 1;
      }
    }
    &:hover {
      img {
        opacity: 0;
      }
      .add-image {
        visibility: visible;
        opacity: 1;
      }
    }
    & > * {
      grid-row: 1;
      grid-column: 1;
    }
  }
`;
