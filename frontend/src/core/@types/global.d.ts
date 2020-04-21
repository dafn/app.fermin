export {};

declare global {
  type Route = "/" | "/notepad" | "/calculator";

  interface Note {
    id?: number;
    title: string;
    content: string;
    created?: Date;
    last_edited?: Date;
  }
}
