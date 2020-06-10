const endpoints = {
  notes: "/api/notes/",
  auth: "/auth/",
};

export const urlBuilder = {
  notes: {
    getAll: () => endpoints.notes,
    getById: (id: number) => endpoints.notes + id,
    post: () => endpoints.notes,
    put: (id: number) => endpoints.notes + id,
    removeById: (id: number) => endpoints.notes + id,
  },
  auth: {},
};
