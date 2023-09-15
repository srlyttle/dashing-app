import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import { Role, SortOrder, User } from "../types";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import UserTable from "../components/UserTable";
import "./users.scss";
import Loading from "../components/Loading";
import {} from "../types";

const UsersPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage<User>("dashingUser");
  const [users, setUsers] = useState<User[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const defaultFormData = {
    id: "",
    firstName: "",
    lastName: "",
    username: "",
  };
  const [formUser, setFormUser] = useState<Partial<User>>({
    ...defaultFormData,
    id: Date.now().toString(),
  });

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3001/api/users");
      const users = await response.json();
      setIsLoading(false);
      setUsers(users);
    } catch (error) {
      setIsLoading(false);
      console.log("an error occured getting the users");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    getUsers();
  }, []);

  const handleSort = useCallback(
    (column: string) => {
      const newOrder =
        sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
      const sortedUsers = [...(users || [])].sort((a, b) => {
        if (a[column as keyof User] > b[column as keyof User])
          return newOrder === SortOrder.ASC ? 1 : -1;
        if (a[column as keyof User] < b[column as keyof User])
          return newOrder === SortOrder.ASC ? -1 : 1;
        return 0;
      });
      setUsers(sortedUsers);
      setSortColumn(column);
      setSortOrder(newOrder);
    },
    [sortOrder, users]
  );

  const clearForm = useCallback(() => {
    setSelectedUser(null);
    setFormUser({});
  }, []);

  const handleRowClick = useCallback(
    (user: User) => {
      if (user.id === selectedUser?.id) {
        setSelectedUser(null);
        clearForm();
        return;
      }
      setSelectedUser(user);
      setFormUser(user);
    },
    [clearForm, selectedUser?.id]
  );

  const handleSubmit = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      if (!formUser.firstName || !formUser.lastName || !formUser.username) {
        return;
      }
      const mutatedUser = {
        id: Date.now().toString(),
        firstName: formUser.firstName,
        lastName: formUser.lastName,
        username: formUser.username,
        email: "", // this data should be populated by the auth module
        password: "", // this data should be populated by the auth module
        role: Role.VIEWER, // assign this as the default role
      };
      if (selectedUser) {
        const updatedUsers = users?.map((user) =>
          user.id === selectedUser.id ? mutatedUser : user
        );
        setUsers(updatedUsers);
      } else {
        setUsers([...(users || []), mutatedUser]);
      }
      clearForm();
    },
    [
      clearForm,
      formUser.firstName,
      formUser.lastName,
      formUser.username,
      selectedUser,
      users,
    ]
  );

  const handleDelete = useCallback(
    (id: string) => (event: React.MouseEvent) => {
      event.stopPropagation();
      setUsers(users?.filter((u) => u.id !== id));
      clearForm();
    },
    [clearForm, users]
  );

  const handleUserLogout = useCallback(() => {
    setUser(null);
    navigate("/");
  }, [navigate, setUser]);

  const filteredUsers = useMemo(
    () =>
      users?.filter(
        (user) =>
          user.firstName.includes(filter) ||
          user.lastName.includes(filter) ||
          user.username.includes(filter) ||
          user.role.includes(filter) ||
          user?.id.includes(filter)
      ),
    [users, filter]
  );

  const isEditorUser = user?.role === Role.EDITOR;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="page-wrapper">
      {user?.username && (
        <>
          <Header username={user?.username} onLogout={handleUserLogout} />

          <UserTable
            isEditorUser={isEditorUser}
            filter={filter}
            setFilter={setFilter}
            formUser={formUser}
            setFormUser={setFormUser}
            onSubmit={handleSubmit}
            selectedUser={selectedUser}
            clearForm={clearForm}
            onSort={handleSort}
            sortOrder={sortOrder}
            onDelete={handleDelete}
            filteredUsers={filteredUsers}
            sortColumn={sortColumn}
            onRowClick={handleRowClick}
          />
        </>
      )}
    </div>
  );
};

export default UsersPage;
