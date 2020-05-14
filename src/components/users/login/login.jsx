import React, { useState, useEffect } from "react";
import joi from "joi-browser";
import { toast } from "react-toastify";
import { userLogin } from "../../../actions/userActions";
import { connect } from "react-redux";
import { setAuthUser } from "../../../actions/authActions";
import { TextField, Grid, makeStyles, Button } from "@material-ui/core";

const Login = (props) => {
  const initUser = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initUser);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.auth.activeUser._id) {
      console.log(props.auth.activeUser);
      props.history.push("/");
    }
  }, []);

  const schema = {
    email: joi.string().required().email(),
    password: joi.string().required().min(7).max(30),
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let _errors = joi.validate(user, schema).error;
    if (_errors) {
      toast.error(_errors.details[0].message);
    } else {
      const login = await userLogin(user);
      if (login.data) {
        props.setAuthUser(login.data.user);
        toast.success(login.data.message);
        props.history.push("/home");
      } else {
        toast.error(login.response.data.message);
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
        <h2 className="h1">Login</h2>
        <form onSubmit={onSubmit}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.inputField}
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.inputField}
                  type="password"
                  label="Password"
                  name="password"
                  value={user.password}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Login
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps, { setAuthUser })(Login);
