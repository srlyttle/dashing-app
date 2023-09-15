import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { User } from "../types";
import BrandName from "../components/Brand";
import "./login.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);
  const [user] = useLocalStorage<User>("dashingUser");

  const [, setUser] = useLocalStorage<User>("dashingUser");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const isValidPassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordValid(true);
    setIsValid(true);
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValid(true);
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!isValidPassword(password)) {
        setIsPasswordValid(false);
        return;
      }
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const authenticatedUser = await response.json();
      if (authenticatedUser === null) {
        setIsValid(false);
        return;
      }
      setUser(authenticatedUser);

      setIsPasswordValid(true);
      navigate(`/users`);
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(`/users`);
    }
  }, [navigate, user]);
  return (
    <div className="login-page-wrapper">
      <div className={`brand-wrapper ${showAnimation ? "slide-in" : ""}`}>
        <BrandName
          title="Dashing Web Design"
          subtitle="building the future web"
        />
      </div>
      <div className="form-wrapper">
        <LoginForm
          onPasswordChange={handlePasswordChange}
          onSubmit={handleSubmit}
          onUsernameChange={handleUsernameChange}
          isFormValid={isValid}
          isPasswordValid={isPasswordValid}
          username={username}
          password={password}
        />
      </div>
    </div>
  );
};

export default LoginPage;
