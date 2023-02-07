import { useState } from "react";
import style from "./LogIn.module.css";

const LogIn = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };

  const handlePasword = (e) => {
    setPassword(e.target.value);
  };

  const getAuthorization = () => {
      if(login === "" || password === "" ){
          return
      }
      console.log(login);
      console.log(password);
      setLogin('');
      setPassword('');
  }

  return (
    <div className={style.frame}>
      <div className={style.login}>
        <input onChange={handleLogin} value={login} placeholder="Login" />
      </div>
      <div className={style.login}>
        <input onChange={handlePasword} value={password} type="password" placeholder="Password" />
      </div>
      <button onClick={getAuthorization}>LogIn</button>
      <div className={style.login}>Don't have account yet? Sign up now</div>
    </div>
  );
};

export default LogIn;
