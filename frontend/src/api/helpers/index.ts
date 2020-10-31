const endpoints = {
  notes: "/api/notes/",
  cv_entries: "/api/cv_entries/",
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
  },
};

export const urlBuilder = {
  notes: {
    getAll: () => endpoints.notes,
    getById: (id: number) => endpoints.notes + id,
    post: () => endpoints.notes,
    put: (id: number) => endpoints.notes + id,
    removeById: (id: number) => endpoints.notes + id,
  },
  cv_entries: {
    getAll: () => endpoints.cv_entries,
    getById: (id: number) => endpoints.cv_entries + id,
    post: () => endpoints.cv_entries,
    put: (id: number) => endpoints.cv_entries + id,
    removeById: (id: number) => endpoints.cv_entries + id,
  },
  auth: {
    login: () => endpoints.auth.login,
    logout: () => endpoints.auth.logout,
  },
};
