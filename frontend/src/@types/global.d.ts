export {};

declare global {
  type Route = "/" | "/notepad" | "/calculator" | "/login" | "/logout";

  type Language = "en" | "no";

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
