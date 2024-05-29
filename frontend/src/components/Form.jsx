import { useNavigate } from "react-router-dom";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useEffect, useState } from "react";
import '../styles/Form.css'
import React from "react";

const Form = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error.message); // Display error message instead of entire error object
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        type="text"
        value={username}
        className="form-input"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />

      <input
        type="password" 
        value={password}
        className="form-input"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="form-button" type="submit">
        {name}
      </button>
    </form>
  );
};

export default Form;
