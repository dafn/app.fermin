import { CardType } from '../../../../types'

export type NewCardProps = {
  onCreate: (state: CardType) => unknown
  onCancel: () => unknown;
  className?: string;
}