export {};

declare global {
  type Route = "/" | "/notepad" | "/calculator";

  type Language = "en" | "no";

  type Translator = (key: string) => string;

  interface Note {
    id?: number;
    title: string;
    content: string;
    created?: Date;
    last_edited?: Date;
  }
}
