import React, { useState } from "react";
import "./register.css";
import joi from "joi-browser";
import { toast } from "react-toastify";
import { addUser } from "../../../actions/userActions";
import { makeStyles, Grid, TextField, Button } from "@material-ui/core";

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
  const [btnClicked, setBtnClicked] = useState(false);

  const schema = {
    fname: joi.string().required().min(2).max(10),
    lname: joi.string().required().min(2).max(10),
    username: joi.string().required().min(5).max(20),
    email: joi.string().required().email(),
    password: joi.string().required().min(7).max(30),
    about: joi.string().allow("").max(200),
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let _errors = joi.validate(user, schema).error;
    if (_errors) {
      toast.error(_errors.details[0].message);
    } else {
      try {
        setBtnClicked(true);
        const response = await addUser(user);
        toast.success(response.data.message);
        props.history.push("/login");
      } catch (e) {
        setBtnClicked(false);
        if (e.response) {
          if (e.response.data.code === 11000) {
            toast.error(
              `${Object.keys(e.response.data.keyValue)[0]} already exists`
            );
          } else {
            toast.error(e.response.data.message);
          }
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

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    inputField: {
      width: "100%",
    },
  }));
  const classes = useStyles();

  return (
    <section className="myForm">
      <div className="container-narrow text-center">
        <h2 className="h1">Sign Up</h2>
        <form onSubmit={onSubmit} className="form-container">
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.inputField}
                  id="standard-required"
                  label="First Name"
                  name="fname"
                  value={user.fname}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.inputField}
                  id="standard-required"
                  label="Last Name"
                  name="lname"
                  value={user.lname}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  className={classes.inputField}
                  id="standard-required"
                  label="Username"
                  name="username"
                  value={user.username}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.inputField}
                  id="standard-required"
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.inputField}
                  id="standard-required"
                  label="password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  className={classes.inputField}
                  id="standard-multiline-static"
                  label="About You"
                  multiline
                  rows={4}
                  value={user.about}
                  name="about"
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={btnClicked}
                >
                  Signup
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
