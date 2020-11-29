const endpoints = {
  notes: "/api/notes/",
  cv_entries: "/api/cv_entries/",
  user: "/api/profile/",
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
  },
};

export const urlBuilder = {
  notes: {
    getAll: () => endpoints.notes,
    getOne: (id: number) => endpoints.notes + id,
    post: () => endpoints.notes,
    put: (id: number) => endpoints.notes + id,
    removeById: (id: number) => endpoints.notes + id,
  },
  cv_entries: {
    getAll: () => endpoints.cv_entries,
    getOne: (id: number) => endpoints.cv_entries + id,
    post: () => endpoints.cv_entries,
    put: (id: number) => endpoints.cv_entries + id,
    removeById: (id: number) => endpoints.cv_entries + id,
  },
  user: {
    getOne: (username: string) => endpoints.user + username,
    put: () => endpoints.user,
  },
  auth: {
    login: () => endpoints.auth.login,
    logout: () => endpoints.auth.logout,
  },
};
