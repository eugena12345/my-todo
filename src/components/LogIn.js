import { useState } from "react";
import style from "./LogIn.module.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const LogIn = ({ handleUserId }) => {
  const navigate = useNavigate();
  const goTasks = navigate("/todos");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };

  const handlePasword = (e) => {
    setPassword(e.target.value);
  };

  const getAuthorization = async (e) => {
    e.preventdefault();
    if (login === "" || password === "") {
      return;
    }

    axios
      .post(`http://localhost:5000/autorization`, {
        userName: login,
        password: password,
      })
      .then((response) => {
        handleUserId(response.data);
        console.log(response);
        goTasks();
      })
      .catch((err) => alert(err.response.data));

    console.log(login);
    console.log(password);
    setLogin("");
    setPassword("");
  };

  return (
    <div className={style.frame}>
      <form onSubmit={getAuthorization}>
        <div className={style.login}>
          <input onChange={handleLogin} value={login} placeholder="Login" />
        </div>
        <div className={style.login}>
          <input
            onChange={handlePasword}
            value={password}
            type="password"
            placeholder="Password"
          />
        </div>
        <button>LogIn</button>
      </form>

      <div className={style.login}>Don't have account yet? Sign up now</div>
    </div>
  );
};

export default LogIn;
