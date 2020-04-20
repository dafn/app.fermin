export {};

declare global {
  type Route = "/" | "/notepad";

  interface Note {
    id?: number;
    title: string;
    content: string;
    created?: Date;
    last_edited?: Date;
  }
}
