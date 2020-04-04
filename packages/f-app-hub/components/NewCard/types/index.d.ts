import { CardType } from "../../../types";
export { CardType } from "../../../types";

export interface NewCardProps {
  onCreate: (state: CardType) => void;
  onCancel: () => void;
  className?: string;
}
