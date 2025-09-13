import React, { useState } from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import { useAuth } from "../../contexts/AuthContext";
import { useAdmin } from "../../contexts/AdminContext";
import {
  Users,
  Search,
  Plus,
  Download,
  Mail,
  Filter,
  CheckCircle,
  Shield,
  Calendar,
  Eye,
  Edit,
  Trash2,
  X,
  BookOpen,
  Trophy,
  Target,
  Flame,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";

interface AddUserForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface AddUserModalProps {
  onClose: () => void;
  onAdd: (formData: AddUserForm) => void;
  darkMode: boolean;
}

interface DetailedUserModalProps {
  user: any;
  onClose: () => void;
  darkMode: boolean;
}

const UserManagement: React.FC = () => {
  const { state: globalState } = useGlobalState();
  const { state: authState } = useAuth();
  const {
    users,
    totalUsers,
    totalAdmins,
    loading,
    addUserByAdmin,
    deleteUserByAdmin,
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({
    role: "",
    dateFrom: "",
    dateTo: "",
    minProgress: "",
    maxProgress: "",
  });

  const handleAddUser = (userData: AddUserForm) => {
    addUserByAdmin(userData);
  };

  const handleDeleteUser = (userId: string) => {
    deleteUserByAdmin(userId);
  };

  const exportUserData = () => {
    const dataStr = JSON.stringify(authState.users, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "users_export.json";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // Filter logic
  const filteredUsers = authState.users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => {
      // Role filter
      if (filter.role && user.role !== filter.role) return false;
      // Date filter
      if (
        filter.dateFrom &&
        new Date(user.joinDate) < new Date(filter.dateFrom)
      )
        return false;
      if (filter.dateTo && new Date(user.joinDate) > new Date(filter.dateTo))
        return false;
      // Progress filter
      if (
        filter.minProgress &&
        (user.progress?.totalPoints || 0) < Number(filter.minProgress)
      )
        return false;
      if (
        filter.maxProgress &&
        (user.progress?.totalPoints || 0) > Number(filter.maxProgress)
      )
        return false;
      return true;
    });

  // Use filteredUsers instead of users for display
  const displayUsers = filteredUsers.length > 0 ? filteredUsers : users;

  return (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="flex flex-col gap-4 justify-between sm:flex-row">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              globalState.darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowAddUser(true)}
            className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
          <button
            onClick={exportUserData}
            className="flex items-center px-4 py-2 space-x-2 text-white bg-green-500 rounded-lg transition-colors hover:bg-green-600"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center px-4 py-2 space-x-2 text-white bg-purple-500 rounded-lg transition-colors hover:bg-purple-600">
            <Mail className="w-4 h-4" />
            <span>Send Email</span>
          </button>
          <button
            className="flex items-center px-4 py-2 space-x-2 text-white bg-gray-500 rounded-lg transition-colors hover:bg-gray-600"
            onClick={() => setShowFilter(true)}
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-40">
          <div
            className={`${
              globalState.darkMode ? "bg-gray-800" : "bg-white"
            } rounded-xl p-6 w-full max-w-md mx-4`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3
                className={`text-lg font-semibold ${
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Filter Users
              </h3>
              <button
                onClick={() => setShowFilter(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowFilter(false);
              }}
              className="space-y-4"
            >
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    globalState.darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Role
                </label>
                <select
                  value={filter.role}
                  onChange={(e) =>
                    setFilter((f) => ({ ...f, role: e.target.value }))
                  }
                  className={`w-full px-3 py-2 rounded-lg border ${
                    globalState.darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">All</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      globalState.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Joined After
                  </label>
                  <input
                    type="date"
                    value={filter.dateFrom}
                    onChange={(e) =>
                      setFilter((f) => ({ ...f, dateFrom: e.target.value }))
                    }
                    className={`w-full px-3 py-2 rounded-lg border ${
                      globalState.darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      globalState.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Joined Before
                  </label>
                  <input
                    type="date"
                    value={filter.dateTo}
                    onChange={(e) =>
                      setFilter((f) => ({ ...f, dateTo: e.target.value }))
                    }
                    className={`w-full px-3 py-2 rounded-lg border ${
                      globalState.darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      globalState.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Min Progress
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={filter.minProgress}
                    onChange={(e) =>
                      setFilter((f) => ({ ...f, minProgress: e.target.value }))
                    }
                    placeholder="Points"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      globalState.darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      globalState.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Max Progress
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={filter.maxProgress}
                    onChange={(e) =>
                      setFilter((f) => ({ ...f, maxProgress: e.target.value }))
                    }
                    placeholder="Points"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      globalState.darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2 space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setFilter({
                      role: "",
                      dateFrom: "",
                      dateTo: "",
                      minProgress: "",
                      maxProgress: "",
                    });
                  }}
                  className="px-4 py-2 text-white bg-gray-500 rounded-lg transition-colors hover:bg-gray-600"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div
          className={`${
            globalState.darkMode ? "bg-gray-800" : "bg-white"
          } p-4 rounded-lg border`}
        >
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span
              className={`text-sm ${
                globalState.darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Total Users
            </span>
          </div>
          <p
            className={`text-2xl font-bold ${
              globalState.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {totalUsers}
          </p>
        </div>
        <div
          className={`${
            globalState.darkMode ? "bg-gray-800" : "bg-white"
          } p-4 rounded-lg border`}
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span
              className={`text-sm ${
                globalState.darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Active Users
            </span>
          </div>
          <p
            className={`text-2xl font-bold ${
              globalState.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {authState.users.filter((u) => u.isActive).length}
          </p>
        </div>
        <div
          className={`${
            globalState.darkMode ? "bg-gray-800" : "bg-white"
          } p-4 rounded-lg border`}
        >
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-purple-500" />
            <span
              className={`text-sm ${
                globalState.darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Admins
            </span>
          </div>
          <p
            className={`text-2xl font-bold ${
              globalState.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {totalAdmins}
          </p>
        </div>
        <div
          className={`${
            globalState.darkMode ? "bg-gray-800" : "bg-white"
          } p-4 rounded-lg border`}
        >
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            <span
              className={`text-sm ${
                globalState.darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              New This Month
            </span>
          </div>
          <p
            className={`text-2xl font-bold ${
              globalState.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {
              authState.users.filter(
                (u) =>
                  new Date(u.joinDate) >
                  new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              ).length
            }
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div
        className={`${
          globalState.darkMode ? "bg-gray-800" : "bg-white"
        } rounded-xl shadow overflow-hidden`}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead
              className={`text-xs font-medium uppercase tracking-wider ${
                globalState.darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <tr>
                <th className="px-6 py-3 text-left border-b">User</th>
                <th className="px-6 py-3 text-left border-b">Role</th>
                <th className="px-6 py-3 text-left border-b">Streak</th>
                <th className="px-6 py-3 text-left border-b">Join Date</th>
                <th className="px-6 py-3 text-left border-b">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center">
                    <div className="flex justify-center items-center">
                      <svg
                        className="mr-2 w-6 h-6 text-blue-500 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 100 20v-4l-5 5 5 5v-4a8 8 0 01-8-8z"
                        ></path>
                      </svg>
                      Loading users...
                    </div>
                  </td>
                </tr>
              ) : displayUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                displayUsers.map((user) => (
                  <tr
                    key={(user as any)._id || (user as any).id}
                    className={`${
                      globalState.darkMode
                        ? "hover:bg-gray-700 text-gray-100"
                        : "hover:bg-gray-50 text-gray-800"
                    } border-b`}
                  >
                    {/* User Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.name
                          )}&background=3b82f6&color=fff`}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-4">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Streak */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <div>
                        Current:{" "}
                        <span className="font-medium">
                          {(user as any).currentStreak ?? 0}
                        </span>
                      </div>
                      <div>
                        Longest:{" "}
                        <span className="font-medium">
                          {(user as any).longestStreak ?? 0}
                        </span>
                      </div>
                    </td>

                    {/* Created At */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      {new Date((user as any).createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserDetailsModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteUser(
                              (user as any)._id || (user as any).id
                            )
                          }
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <AddUserModal
          onClose={() => setShowAddUser(false)}
          onAdd={handleAddUser}
          darkMode={globalState.darkMode}
        />
      )}

      {/* User Details Modal */}
      {showUserDetailsModal && selectedUser && (
        <DetailedUserModal
          user={selectedUser}
          onClose={() => {
            setShowUserDetailsModal(false);
            setSelectedUser(null);
          }}
          darkMode={globalState.darkMode}
        />
      )}
    </div>
  );
};

// Add User Modal Component
const AddUserModal: React.FC<AddUserModalProps> = ({
  onClose,
  onAdd,
  darkMode,
}) => {
  const [formData, setFormData] = useState<AddUserForm>({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (_e: React.FormEvent) => {
    try {
      await onAdd(formData);
      onClose();
    } catch (err: any) {
      const message = err?.response?.data?.message || "Something went wrong.";
      setError(message);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        darkMode
          ? "bg-black bg-opacity-60"
          : "bg-gray-200 bg-opacity-60 border-gray-300"
      }`}
    >
      <div
        className={`p-8 shadow-lg w-full rounded-2xl max-w-md ${
          darkMode ? "text-white bg-gray-900" : "text-black bg-white"
        }`}
      >
        <h2 className="mb-4 text-xl font-semibold">Add New User</h2>
        {error && (
          <div className="p-2 mb-4 text-red-700 bg-red-100 rounded border border-red-300">
            ⚠️ {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 rounded border"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="p-2 rounded border"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 rounded border"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="p-2 rounded border"
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <div className="flex gap-2 justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// User Details Modal Component - Commented out, using DetailedUserModal instead
/*
const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  onClose,
  darkMode,
}) => {
  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-xl p-6 w-full max-w-lg mx-4`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            User Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={
                user.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}&background=3b82f6&color=fff`
              }
              alt={user.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h4
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {user.name}
              </h4>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {user.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Role
              </label>
              <p className={`${darkMode ? "text-white" : "text-gray-900"}`}>
                {user.role}
              </p>
            </div>
            <div>
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Status
              </label>
              <p className={`${darkMode ? "text-white" : "text-gray-900"}`}>
                {user.isActive ? "Active" : "Inactive"}
              </p>
            </div>
            <div>
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Join Date
              </label>
              <p className={`${darkMode ? "text-white" : "text-gray-900"}`}>
                {new Date(user.joinDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Last Login
              </label>
              <p className={`${darkMode ? "text-white" : "text-gray-900"}`}>
                {new Date(user.lastLogin).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Progress Summary
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {user.progress?.totalPoints || 0}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Points
                </p>
              </div>
              <div className="text-center">
                <p
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {user.progress?.streak || 0}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Streak
                </p>
              </div>
              <div className="text-center">
                <p
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {user.progress?.completedModules || 0}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Modules
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-500 rounded-lg transition-colors hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
*/

// Detailed User Modal Component
const DetailedUserModal: React.FC<DetailedUserModalProps> = ({
  user,
  onClose,
  darkMode,
}) => {
  // Get user-specific data with fallbacks
  const userBio = user.bio || "No bio available";
  const userLinkedIn = user.socialLinks?.linkedin || "No LinkedIn profile";
  const userGitHub = user.socialLinks?.github || "No GitHub profile";
  const userTwitter = user.socialLinks?.twitter || "No Twitter profile";

  const coursesEnrolled = user.progress?.coursesEnrolled?.length || 0;
  const modulesCompleted = user.progress?.completedModules || 0;
  const totalPoints = user.progress?.totalPoints || 0;
  const dayStreak = user.progress?.streak || 0;
  const userLevel = user.progress?.level || "Beginner";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`${
          darkMode ? "text-white bg-gray-800" : "text-gray-900 bg-white"
        } rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto border-2`}
        style={{ minHeight: "600px" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {user.name} - Detailed Profile
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Profile Information */}
          <div
            className={`p-6 rounded-xl border ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Profile Information
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Full Name
                </label>
                <p className={`${darkMode ? "text-white" : "text-gray-900"}`}>
                  {user.name}
                </p>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email Address
                </label>
                <p className={`${darkMode ? "text-white" : "text-gray-900"}`}>
                  {user.email}
                </p>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Bio
                </label>
                <p className={`${darkMode ? "text-white" : "text-gray-900"}`}>
                  {userBio}
                </p>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Social Links
                </label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <a
                      href={
                        userLinkedIn.startsWith("http")
                          ? userLinkedIn
                          : `https://${userLinkedIn}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-blue-600 hover:underline ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {userLinkedIn}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Github className="w-4 h-4 text-gray-800 dark:text-white" />
                    <a
                      href={
                        userGitHub.startsWith("http")
                          ? userGitHub
                          : `https://${userGitHub}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-blue-600 hover:underline ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {userGitHub}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Twitter className="w-4 h-4 text-blue-400" />
                    <a
                      href={
                        userTwitter.startsWith("http")
                          ? userTwitter
                          : `https://${userTwitter}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-blue-600 hover:underline ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {userTwitter}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Progress */}
          <div
            className={`p-6 rounded-xl border ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Learning Progress
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="flex justify-center items-center mx-auto mb-2 w-12 h-12 bg-blue-500 rounded-full">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <p
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {coursesEnrolled}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Courses Enrolled
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center items-center mx-auto mb-2 w-12 h-12 bg-green-500 rounded-full">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <p
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {modulesCompleted}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Modules Completed
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center items-center mx-auto mb-2 w-12 h-12 bg-purple-500 rounded-full">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <p
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {totalPoints}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Total Points
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center items-center mx-auto mb-2 w-12 h-12 bg-orange-500 rounded-full">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <p
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {dayStreak}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Day Streak
                </p>
              </div>
            </div>

            {/* User Level Badge */}
            <div className="mb-4">
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                User Level
              </label>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  userLevel === "Expert"
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    : userLevel === "Advanced"
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    : userLevel === "Intermediate"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                }`}
              >
                {userLevel}
              </span>
            </div>

            {/* Streak Progress */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Streak Progress
              </label>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-orange-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((dayStreak / 30) * 100, 100)}%` }}
                ></div>
              </div>
              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {dayStreak}/30 days
              </p>
              {dayStreak > 0 && (
                <p
                  className={`text-sm mt-1 ${
                    darkMode ? "text-orange-400" : "text-orange-600"
                  }`}
                >
                  You're on a roll!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;