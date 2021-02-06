import React, { useContext, useState, useEffect } from "react";
import authContext from "../../context/auth/authContext";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";
var validator = require("email-validator");

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#2f80ed",
    },
  },
});

const Register = (props) => {
  const AuthContext = useContext(authContext);
  const { auth, isAuthenticated, error, clearError } = AuthContext;

  const [validation, setValidation] = useState(null);

  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    password2: "",
  });

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setData({ ...data, showPassword: !data.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword2 = () => {
    setData({ ...data, showPassword2: !data.showPassword2 });
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => clearError(), 2000);
    }
    // eslint-disable-next-line
  }, [error]);

  const submit = () => {
    //validation
    if (data.username.trim() !== "") {
      if (validator.validate(data.email)) {
        if (data.password.length >= 6) {
          if (data.password === data.password2) {
            setValidation(null);
            auth("register", {
              username: data.username,
              email: data.email,
              password: data.password,
            });
          } else {
            setValidation({ type: 4, msg: "Passwords do not match" });
          }
        } else {
          setValidation({ type: 3, msg: "Min length: 6" });
        }
      } else {
        setValidation({ type: 2, msg: "Invalid email" });
      }
    } else {
      setValidation({ type: 1, msg: "Username is required" });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated, props.history]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="auth">
        <div className="container">
          <h1>Chat Group</h1>
          <form action="">
            {error && <Alert severity="error">{error}</Alert>}
            <div className="mt-2"></div>
            <TextField
              label="Username"
              variant="outlined"
              size="small"
              onChange={handleChange("username")}
              value={data.username}
              error={validation && validation.type === 1 ? true : false}
              helperText={
                validation && validation.type === 1 ? validation.msg : false
              }
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <div className="mt-3"></div>
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              onChange={handleChange("email")}
              value={data.email}
              fullWidth
              error={validation && validation.type === 2 ? true : false}
              helperText={
                validation && validation.type === 2 ? validation.msg : false
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <div className="mt-3"></div>
            <FormControl variant="outlined" fullWidth size="small">
              <TextField
                size="small"
                id="outlined-adornment-password"
                variant="outlined"
                label="Password"
                type={data.showPassword ? "text" : "password"}
                value={data.password}
                onChange={handleChange("password")}
                error={validation && validation.type === 3 ? true : false}
                helperText={
                  validation && validation.type === 3 ? validation.msg : false
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {data.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                labelWidth={70}
              />
            </FormControl>
            <div className="mt-3"></div>
            <FormControl variant="outlined" fullWidth size="small">
              <TextField
                size="small"
                id="outlined-adornment-password"
                variant="outlined"
                label="Confirm password"
                type={data.showPassword2 ? "text" : "password"}
                value={data.password2}
                onChange={handleChange("password2")}
                error={validation && validation.type === 4 ? true : false}
                helperText={
                  validation && validation.type === 4 ? validation.msg : false
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword2}
                        edge="end"
                      >
                        {data.showPassword2 ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                labelWidth={140}
              />
            </FormControl>
            <div className="mt-3"></div>
            <input type="button" value="Register" onClick={submit} />
          </form>
          <small>
            Already have an account?<Link to="/login"> Login here</Link>
          </small>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default Register;
