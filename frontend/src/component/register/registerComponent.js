import {makeStyles, Paper, FormControl, InputLabel, Input, FormHelperText, Button} from "@material-ui/core"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Alert } from '@material-ui/lab/';
import { register } from "../../utility/api";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "50vh",
    width: "20vw",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }, 
  innerContainer: {
    height: "60%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  usernameInputContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  passwordInputContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  repeatPasswordInputContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  buttonContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  alert: {
    marginTop: "10px",
  }
});

function RegisterComponent(props) {
  const styles = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const handleRegister = async () => {
    if (!repeatPassword || !password || !username) {
      setAlert(
        <Alert className={styles.alert} severity="error">Fields can't be empty.</Alert>
      );
      return;
    } else if (repeatPassword !== password) {
      setAlert(
        <Alert className={styles.alert} severity="error">Passwords must match.</Alert>
      );
      return;
    } else if (password.length < 6) {
      setAlert(
        <Alert className={styles.alert} severity="error">Passwords must be at least six characters.</Alert>
      );
      return;
    } else if (username.length < 4) {
      setAlert(
        <Alert className={styles.alert} severity="error">Username must be at least four characters.</Alert>
      );
      return;
    }
    const data = await register(username, password);
    if (data.success) {
      navigate("/");
    } else {
      <Alert className={styles.alert} severity="error">{data.message}</Alert>
    }
  }

  return (
    <Paper elevation={8} className={styles.container}> 
      <div className={styles.innerContainer}>
        <div className={styles.usernameInputContainer}>
          <FormControl>
            <InputLabel htmlFor="usernameInput">Username</InputLabel>
            <Input 
              id="usernameInput" 
              autoFocus={true}
              onChange={e => setUsername(e.target.value)}
            />
            {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
          </FormControl>
        </div>
        <div className={styles.passwordInputContainer}>
          <FormControl>
            <InputLabel htmlFor="passwordInput">Password</InputLabel>
            <Input 
              type="password"
              id="passwordInput" 
              onChange={e => setPassword(e.target.value)}
            />
            {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
          </FormControl>
        </div>
        <div className={styles.repeatPasswordInputContainer}>
          <FormControl>
            <InputLabel htmlFor="repeatPasswordInput">Repeat password</InputLabel>
            <Input
              type="password"
              id="repeatPasswordInput" 
              onChange={e => setRepeatPassword(e.target.value)}
            />
            {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
          </FormControl>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleRegister()}
          >
            Register
          </Button>
        </div>
        {
          alert
        }
      </div>
    </Paper>
  );
}

export default RegisterComponent;
