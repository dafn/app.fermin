export {};

declare global {
  type Route =
    | "/"
    | "/notepad"
    | "/calculator"
    | "/login"
    | "/logout"
    | "/video-cutter"
    | "/cv";

  type Language = "en" | "no";

  type Theme = "fermin-theme-light" | "fermin-theme-dark";

  interface Note {
    id?: number;
    title: string;
    content: string;
    created?: Date;
    last_edited?: Date;
  }

  interface CV {
    id?: number;
    title: string;
    content?: string;
    tags?: string;
    src?: string;
    start_date?: Date;
    end_date?: Date;
  }

  interface Login {
    username: string;
    password: string;
  }

  const env: {
    initialAuthState: {
      isLoggedIn: boolean;
    };
  };

  // To remove the need for an import of stil
  const css: (style: TemplateStringsArray) => void;
}
