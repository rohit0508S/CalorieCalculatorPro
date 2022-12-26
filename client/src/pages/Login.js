import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function Login() {
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState({
    age: 0,
    name: "",
    email: "",
    password: "",
  });
  const [conpass, setConpass] = useState("");
  const [error, setError] = useState(false);
  const [errMessege, setErrMessege] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);

  const navigate = useNavigate();

  // function
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setError(false);
  };

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const checkValidation = () => {
    if (newUser.age < 12) {
      setError(true);
      setErrMessege("You should be atleast 12");
      return false;
    } else if (newUser.name.trim() === "") {
      setError(true);
      setErrMessege("Enter Name");
      return false;
    } else if (newUser.email.trim() === "") {
      setError(true);
      setErrMessege("Enter Email");
      return false;
    } else if (newUser.password.trim() === "") {
      setError(true);
      setErrMessege("Enter Password");
      return false;
    } else if (conpass !== newUser.password) {
      setError(true);
      setErrMessege("Password not matching");
      return false;
    } else if (!validateEmail(newUser.email)) {
      setError(true);
      setErrMessege("Enter a valid email");
      return false;
    }
    return true;
  };

  const register = () => {
    setError(false);
    if (checkValidation()) {
      console.log(newUser);
      handleClose();
      axios
        .post("http://localhost:5000/users", newUser)
        .then((res) => {
          alert("Register successful");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const login = (e) => {
    e.preventDefault();
    if (loginData.email.trim() === "" || loginData.password.trim() === "") {
      setLoginError(true);
      return;
    }
    axios
      .post("http://localhost:5000/login", loginData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("data", JSON.stringify(res.data.data));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setLoginError(true);
      });
  };

  const getAge = (value) => {
    const age = Math.floor(
      (new Date() - new Date(value)) / 1000 / 60 / 60 / 24 / 365.25
    );
    setNewUser({ ...newUser, age: age });
  };

  return (
    <div className="bgImage">
    <div className="cn">
    <div className="d-flex justify-content-center align-items-center login inner">
    <div className="gray p-2">
        <h2>Login</h2>
        <span>&nbsp;</span>
        {loginError ? (
          <span className="d-flex justify-content-center mb-2 text-danger">
            Invalid Email or Password
          </span>
        ) : null}

        {/* For LogIn */}
        <form className="d-flex justify-content-center align-items-center flex-column">
          <div>
            <input
              placeholder="Enter email.."
              type="email"
              className="px-3 py-1 inp"
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
                setLoginError(false);
              }}
            />
          </div>
          <div className="input-field mt-3">
            <input
              placeholder="Enter password.."
              type={eye ? "text" : "password"}
              className=""
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
                setLoginError(false);
              }}
            />
            <span onClick={(e) => setEye(!eye)} className="eye">
              {eye ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-success mt-3 outline-none"
              onClick={(e) => login(e)}
            >
              Login
            </button>
          </div>
        </form>

        {/* For SignUp */}
        <div>
          <span className="new_user" onClick={handleShow}>
            New User?
          </span>

          <Modal show={show} onHide={handleClose} centered size="sm">
            <Modal.Header closeButton>
              <Modal.Title>Enter your details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex justify-content-center">
                {error ? (
                  <div className="text-warning">{errMessege}</div>
                ) : null}
              </div>

              <form className="d-flex justify-content-center align-items-center flex-column">
                <div>
                  <label>date of birth</label>
                  <br />
                  <input
                    className="inp"
                    type="date"
                    onChange={(e) => getAge(e.target.value)}
                    max={new Date()}
                  ></input>
                </div>
                <div className="mt-3">
                  <label>Name</label>
                  <br />
                  <input
                    className="inp mt-1"
                    type="text"
                    placeholder="name.."
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                  />
                </div>

                <div className="mt-3">
                  <label>Email</label>
                  <br />
                  <input
                    className="inp mt-1"
                    placeholder="email.."
                    type="email"
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />
                </div>

                <div className="mt-3">
                  <label>Password</label>
                  <br />
                  <input
                    className="inp mt-1"
                    type="password"
                    placeholder="password.."
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                  />
                </div>

                <div className="mt-3 mb-2">
                  <label>Conform Password</label>
                  <br />
                  <div className="input-field mt-1">
                    <input
                      type={eye ? "text" : "password"}
                      placeholder="conform password.."
                      onChange={(e) => setConpass(e.target.value)}
                    />
                    <span onClick={(e) => setEye(!eye)} className="eye">
                      {eye ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </span>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  register();
                }}
              >
                Register
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Login;
