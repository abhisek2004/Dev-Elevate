export const baseUrl: string = import.meta.env.VITE_API_URL;


export const adminApi = {
  allUser: "/api/v1/admin/all-users",
  addUser: "/api/v1/admin/add-user",
  deleteUser: "/api/v1/admin/delete-user"
};

export const codingApi = {
  problems: "/api/v1/coding/problems",
  execute: "/api/v1/coding/execute",
  submit: "/api/v1/coding/submit",
  submissions: "/api/v1/coding/submissions",
  leaderboard: "/api/v1/coding/leaderboard",
  stats: "/api/v1/coding/stats"
};