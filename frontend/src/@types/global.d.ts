export {};

declare global {
  type Route =
    | "/"
    | "/notepad"
    | "/calculator"
    | "/login"
    | "/logout"
    | "/profile"
    | "/video-cutter"
    | "/cv";

  type Language = "en" | "no";

  type Theme = "fermin-theme-light" | "fermin-theme-dark";

  interface Note {
    id?: number;
    title: string;
    content: string;
    created?: Date;
    lastEdited?: Date;
  }

  interface CV {
    id?: number;
    title?: string;
    content?: string;
    summary?: string;
    category?: string;
    tags?: string;
    src?: string;
    startDate?: Date;
    endDate?: Date;
  }

  interface Login {
    username: string;
    password?: string;
  }

  interface User extends Login {
    src?: string;
  }

  const env: {
    initialAuthState: {
      isLoggedIn: boolean;
    };
  };

  // To remove the need for an import of stil
  const css: (style: TemplateStringsArray) => void;
}
