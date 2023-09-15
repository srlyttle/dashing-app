import React, { Dispatch, SetStateAction } from "react";
import Button from "../Button";
import Input from "../Input";
import { User } from "../../types";
import "./styles.scss";

interface Props {
  setFormUser: Dispatch<SetStateAction<Partial<User>>>;
  clearForm: () => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  formUser: Partial<User>;
  selectedUser: Partial<User> | null;
}
const UserForm = ({
  formUser,
  setFormUser,
  onSubmit,
  selectedUser,
  clearForm,
}: Props) => (
  <form>
    <fieldset className="form-fieldset">
      <legend className="form-legend">Add new user</legend>
      <div className="editor-form">
        <div className="form-item">
          <label htmlFor="email">First Name</label>
          <Input
            value={formUser.firstName || ""}
            onChange={(e) =>
              setFormUser((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-item">
          <label htmlFor="email">Last Name</label>
          <Input
            value={formUser.lastName || ""}
            onChange={(e) =>
              setFormUser((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
        </div>
        <div className="form-item">
          <label htmlFor="email">Username</label>
          <Input
            value={formUser.username || ""}
            onChange={(e) =>
              setFormUser((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </div>

        <Button onClick={(event) => onSubmit(event)}>
          {selectedUser ? "Update" : "Add"}
        </Button>
        {selectedUser && (
          <Button variant="secondary" onClick={clearForm}>
            Cancel
          </Button>
        )}
      </div>
    </fieldset>
  </form>
);

export default UserForm;
