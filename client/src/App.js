import React, { useState, useEffect } from "react";

const credentials = "same-origin";
const api = "";

export default function App() {
  const [isAuthenticated, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState(null);
  const getSession = async () => {
    const res = await fetch(`${api}/api/getsession`, {
      credentials,
    });
    const data = await res.json();
    console.log(data);
    if (data.login == true) {
      setAuth(true);
    } else {
      setAuth(false);
      csrf();
    }
  };
  const csrf = async () => {
    const res = await fetch(`${api}/api/getcsrf`, {
      credentials,
    });
    const csrfToken = res.headers.get(["X-CSRFToken"]);
    console.log(csrfToken);
    setCsrfToken(csrfToken);
  };
  const login = async () => {
    const res = await fetch(`${api}/api/login`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials,
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    console.log(data);
    if (data.login == true) {
      setAuth(true);
    }
  };
  const whoami = async () => {
    const res = await fetch(`${api}/api/data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials,
    });
    const data = await res.json();
    alert(`Welcome, ${data.username}!`);
  };
  const logout = async () => {
    const res = await fetch(`${api}/api/logout`, {
      credentials,
    });
    setAuth(false);
  };
  useEffect(() => {
    getSession();
  }, []);
  return (
    <div>
      {isAuthenticated && (
        <>
          <button type="button" onClick={whoami}>
            whoami
          </button>
          <button type="button" onClick={logout}>
            logout
          </button>
        </>
      )}
      {!isAuthenticated && (
        <>
          <h1>Log in</h1>
          <form id="form">
            username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <br />
            password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <button type="button" onClick={login}>
              login
            </button>
          </form>
        </>
      )}
    </div>
  );
}
