import React, { useState, useEffect, useContext } from "react";
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
import { Link } from "react-router-dom";
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#2f80ed",
    },
  },
});

const Login = (props) => {
  const AuthContext = useContext(authContext);
  const { auth, isAuthenticated, error, clearError } = AuthContext;

  const [validation, setValidation] = useState(null);

  const [data, setData] = useState({
    password: "",
    email: "",
    showPassword: false,
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

  useEffect(() => {
    if (error) {
      setTimeout(() => clearError(), 2000);
    }
    // eslint-disable-next-line
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated, props.history]);

  const login = () => {
    if (data.email.trim() !== "") {
      if (data.password.length >= 6) {
        setValidation(null);
        auth("login", { email: data.email, password: data.password });
      } else {
        setValidation({ type: 2, msg: "Min length: 6" });
      }
    } else {
      setValidation({ type: 1, msg: "This field is required" });
    }
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="auth">
        <div className="container">
          <h1>Chat Group</h1>
          <form action="">
            {error && <Alert severity="error">{error}</Alert>}
            <div className="mt-2"></div>
            <TextField
              label="Username or email"
              variant="outlined"
              onChange={handleChange("email")}
              value={data.email}
              fullWidth
              error={validation && validation.type === 1 ? true : false}
              helperText={
                validation && validation.type === 1 ? validation.msg : false
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <div className="mt-3"></div>
            <FormControl variant="outlined" fullWidth>
              <TextField
                id="outlined-adornment-password"
                type={data.showPassword ? "text" : "password"}
                value={data.password}
                onChange={handleChange("password")}
                variant="outlined"
                label="Password"
                error={validation && validation.type === 2 ? true : false}
                helperText={
                  validation && validation.type === 2 ? validation.msg : false
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
              />
            </FormControl>
            <div className="mt-2"></div>
            <input type="button" value="Login" onClick={login} />
          </form>
          <small>
            Don't have an account?<Link to="/register"> register here</Link>
          </small>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default Login;
