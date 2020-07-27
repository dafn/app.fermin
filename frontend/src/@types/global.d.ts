export {};

declare global {
  type Route = "/" | "/notepad" | "/calculator" | "/login" | "/logout" | "/video-cutter";

  type Language = "en" | "no";

  type Theme = "fermin-theme-light" | "fermin-theme-dark";

  interface Note {
    id?: number;
    title: string;
    content: string;
    created?: Date;
    last_edited?: Date;
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
