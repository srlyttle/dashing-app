import { Dispatch, SetStateAction } from "react";
import "./styles.scss";
import { SortOrder, User } from "../../types";
import SortableTableHeader from "../SortableTableHeader";
import Input from "../Input";
import Button from "../Button";
import UserForm from "../UserForm";

interface Props {
  setFilter: Dispatch<SetStateAction<string>>;
  setFormUser: Dispatch<SetStateAction<Partial<User>>>;
  clearForm: () => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSort: (columnName: string) => void;
  onDelete: (id: string) => (event: React.MouseEvent) => void;
  onRowClick: (user: User) => void;
  filter: string;
  isEditorUser: boolean;
  formUser: Partial<User>;
  selectedUser: Partial<User> | null;
  sortOrder: SortOrder;
  filteredUsers: User[] | undefined;
  sortColumn: string | null;
}

const UserTable = ({
  isEditorUser,
  filter,
  setFilter,
  formUser,
  setFormUser,
  onSubmit,
  selectedUser,
  clearForm,
  onSort,
  sortColumn,
  sortOrder,
  onDelete,
  onRowClick,
  filteredUsers,
}: Props) => (
  <div className="table-container">
    <div className="filter-section">
      <div className="form-item">
        <label htmlFor="filter">Filter Users</label>
        <Input
          type="text"
          placeholder="Filter users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
    </div>
    {isEditorUser && (
      <UserForm
        formUser={formUser}
        setFormUser={setFormUser}
        onSubmit={onSubmit}
        selectedUser={selectedUser}
        clearForm={clearForm}
      />
    )}
    <div className="scroll-wrapper">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <SortableTableHeader
                columnName="id"
                sortColumn={sortColumn}
                handleSort={onSort}
                label="ID"
                sortOrder={sortOrder}
                hideOnSmall={true}
              />
              <SortableTableHeader
                columnName="firstName"
                sortColumn={sortColumn}
                handleSort={onSort}
                label="First Name"
                sortOrder={sortOrder}
                hideOnSmall={true}
              />
              <SortableTableHeader
                columnName="lastName"
                sortColumn={sortColumn}
                handleSort={onSort}
                label="Last Name"
                sortOrder={sortOrder}
              />
              <SortableTableHeader
                columnName="username"
                sortColumn={sortColumn}
                handleSort={onSort}
                label="Username"
                sortOrder={sortOrder}
              />
              <SortableTableHeader
                columnName="role"
                sortColumn={sortColumn}
                handleSort={onSort}
                label="Role"
                sortOrder={sortOrder}
              />

              {isEditorUser && <th></th>}
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user, index) => (
              <tr
                key={user.id}
                onClick={isEditorUser ? () => onRowClick(user) : undefined}
                style={{
                  backgroundColor:
                    selectedUser?.id === user.id ? "#e0e0e0" : undefined,
                }}
              >
                <td className="responsive-hide">{user.id}</td>
                <td className="responsive-hide">{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                {isEditorUser && (
                  <td>
                    <Button variant="danger" onClick={onDelete(user.id)}>
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default UserTable;
