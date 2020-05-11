import React, { useState } from "react";
import "./register.css";
import joi from "joi-browser";
import { toast } from "react-toastify";
import { addUser } from "../../../actions/userActions";

const Register = (props) => {
  const initUser = {
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    about: "",
  };
  const [user, setUser] = useState(initUser);
  const [errors, setErrors] = useState({});

  const schema = {
    fname: joi.string().required().min(2).max(10),
    lname: joi.string().required().min(2).max(10),
    username: joi.string().required().min(5).max(20),
    email: joi.string().required().email(),
    password: joi.string().required().min(7).max(30),
    about: joi.string().optional().max(200),
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let _errors = joi.validate(user, schema).error;
    if (_errors) {
      toast.error(_errors.details[0].message);
    } else {
      try {
        const response = await addUser(user);
        toast.success(response.data.message);
        props.history.push("/login");
      } catch (e) {
        if (e.response) {
          toast.error(e.response.data.message);
        }
      }
    }
  };

  const changeHandler = ({ target }) => {
    let newUser = { ...user };
    newUser[target.name] = target.value;
    let _errors = { ...errors, [target.name]: "" };
    let error = validateInput(target).error;
    if (error) {
      _errors[target.name] = error.details[0].message;
    }
    setErrors(_errors);
    setUser(newUser);
  };

  const validateInput = (target) => {
    const inputSchema = { [target.name]: schema[target.name] };
    const input = { [target.name]: target.value };
    return joi.validate(input, inputSchema);
  };

  return (
    <section className="myForm">
      <div className="container-narrow text-center">
        <h2 className="h1">Sign Up</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="form-control control-6"
            placeholder="First Name"
            value={user.fname}
            name="fname"
            onChange={changeHandler}
          />
          <input
            type="text"
            className="form-control control-6"
            placeholder="Last Name"
            value={user.lname}
            name="lname"
            onChange={changeHandler}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={user.username}
            name="username"
            onChange={changeHandler}
          />
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={user.email}
            name="email"
            onChange={changeHandler}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={changeHandler}
          />
          <br />
          <textarea
            cols="30"
            rows="10"
            className="form-control"
            placeholder="About You"
            value={user.about}
            name="about"
            onChange={changeHandler}
          ></textarea>
          <input type="checkbox" value="true" style={{ margin: "17px" }} />I
          have read and agree to the <a href="termsOfUse.html">Terms of Use.</a>
          <br />
          <button type="submit" className="btn">
            SignUp
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
