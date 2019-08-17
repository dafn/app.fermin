export type CardType = {
  id: string;
  title: string;
  href: string;
  image: string;
  background: string;
  textColor: string;
  internal?: boolean;
}

export type AppStateType = {
  Cards?: CardType[];
  newCard?: boolean;
  loading?: boolean;
}
