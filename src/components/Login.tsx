import React, { useState } from "react";
import "./Login.css";
import Header from "./layout/Header";
import Button from "./UI/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../store/user/user.slice";
import { getUser } from "../services/UserService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const onEnterButtonClick = async() => {
    const user = await getUser(username);
    if(user) {
        dispatch(updateUser(user));
        navigate("/register");
    } else {
        setError("wrong input")
    }
  };
  const navigate = useNavigate();

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setError("")
    setUsername(event.target.value);
  };

  return (
    <div className="login">
      <Header />
      <div className="login-content">
        <b>Login here!</b>
        <div className="login-content-input-div">
          <input
            value={username}
            onChange={onChangeInput}
            className={`login-content-input ${error !==""? "login-content-input-error":""}`}
            placeholder="Enter username"
          ></input>
          <Button name="Enter" intent={true} onClick={onEnterButtonClick} />
        </div>
        {error !=="" && <div className="login-content-input-error-message">
            Invalid username. Please try again or contact admin.
        </div>}
      </div>
    </div>
  );
};

export default Login;
