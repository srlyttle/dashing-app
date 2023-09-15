import React from "react";
import "./styles.scss";
import Button from "../Button";
import Input from "../Input";

interface Props {
  onSubmit: (e: React.FormEvent) => void;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  username: string;
  password: string;
  isPasswordValid: boolean;
  isFormValid: boolean;
}
const LoginForm = ({
  onSubmit,
  onPasswordChange,
  onUsernameChange,
  password,
  username,
  isPasswordValid,
  isFormValid,
}: Props) => {
  return (
    <section className="section-container">
      <div className="inner-container">
        <div className="form-container">
          <div className="form-content">
            <form onSubmit={onSubmit}>
              <fieldset className="form-fieldset">
                <legend className="form-legend">Sign in to your account</legend>
                <div className="form-control">
                  <label htmlFor="email">Username</label>
                  <Input
                    type="text"
                    name="username"
                    value={username}
                    onChange={onUsernameChange}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onPasswordChange}
                    aria-describedby={
                      isPasswordValid ? undefined : "password-error"
                    }
                  />
                  {!isPasswordValid && (
                    <p className="form-error" role="alert" id="password-error">
                      Invalid password entered - Please use a minimum of 8
                      characters with at least 1 uppercase letter, 1 lowercase
                      letter, and 1 special character.
                    </p>
                  )}
                </div>
                <div className="form-control form-control--flex">
                  <div className="form-checkbox">
                    <input type="checkbox" id="remember" />
                    <label className="form-label__remember" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                  <a href="/forgot" className="form-link">
                    Forgot your password?
                  </a>
                </div>
                <Button type="submit">Sign in</Button>
                {!isFormValid && (
                  <p className="form-error">
                    The username and or password is incorrect
                  </p>
                )}
                <p className="form-text">
                  Don’t have an account yet?{" "}
                  <a href="/signup" className="form-link">
                    Sign up here
                  </a>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
