import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import { Navigate } from "react-router-dom"; 
import style from './LogIn2.module.css'

const Login2 = ({handleIsLogged, handleUserId}) => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccsess] = useState("");

  const handleUser = (e) => {
    setUser(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handeSubmit = async (e) => {
    e.preventDefault();
    console.log(user, password);
    try {
      const response = await axios.post(
        `http://localhost:5000/autorization`,
       
        {
          userName: user,
          password: password,
        },
        
        
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));
      //const accessToken = response?.data?.accessToken;
      //accessToken запихнуть в контекст ниже
      setAuth({ user, password });
      setUser("");
      setPassword("");
      setSuccsess(true);
      handleIsLogged(response.data.accsessToken);
      handleUserId(response.data.id);
      
    } catch (err) {
      alert(err.response.data);
      setErrorMessage(err.response.data);
      errRef.current.focus();
    }
  };

  return (
    <div className={style.frame}>
      {success ? (
        //<section>You are logged in</section>
        <Navigate to='/todos'/>
      ) : (
        <section className={style.login}>
          <p>{errorMessage}</p>
          <form onSubmit={handeSubmit}>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={handleUser}
              value={user}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={handlePassword}
              value={password}
              required
            />
            <button>Sing in</button>
          </form>
          <p>
            Don't have account yet? <br />
            {/* link на страницу регистрации */}
            Sign up now
          </p>
        </section>
      )}
    </div>
  );
};

export default Login2;
