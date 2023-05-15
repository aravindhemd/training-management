import React, { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleValidation = () => {
    console.log("aaaaaaaaaaaa");
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    handleValidation();
  };

  return (
    <div className="LoginForm">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">

                <label>Email address</label>

                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="Email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>

              </div>
              <div className="form-group">

                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;