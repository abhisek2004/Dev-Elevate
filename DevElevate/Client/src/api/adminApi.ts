// src/api/adminApi.ts
import axiosInstance from "./axiosinstance.ts";
import { User } from "../types/User";
import { adminApi } from "../config/routes.ts";

// Define the response type explicitly
interface GetAllUsersResponse {
  users: User[];
  totalUsers: number;
  totalAdmins:number;
}
 interface AddUserForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const getAllUsers = async (): Promise<GetAllUsersResponse> => {
  const response = await axiosInstance.get<GetAllUsersResponse>(`${adminApi.allUser}`);
  return response.data;
};



export const addUser = async (userData: AddUserForm): Promise<{ user: AddUserForm }> => {
  const response = await axiosInstance.post<{ user: AddUserForm }>(adminApi.addUser, userData);
  return response.data;
};

interface DeleteUser {
  _id: string;
}

export const deleteUser = async (
  userId: string
): Promise<{ user: { _id: string } }> => {
  const response = await axiosInstance.delete<{ user: { _id: string } }>(
    `${adminApi.deleteUser}/${userId}`
  );

  return response.data;
};