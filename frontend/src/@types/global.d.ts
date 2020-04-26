export {};

declare global {
  type Route = "/" | "/notepad" | "/calculator" | "/login";

  type Language = "en" | "no";

  interface Note {
    id?: number;
    title: string;
    content: string;
    created?: Date;
    last_edited?: Date;
  }

  interface Login {
    username: string,
    password: string
  }
}
