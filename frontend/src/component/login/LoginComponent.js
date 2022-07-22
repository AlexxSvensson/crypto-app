import {makeStyles, Paper, FormControl, InputLabel, Input, Button} from "@material-ui/core"
import { Alert } from '@material-ui/lab/';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../../utility/api'

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

function LoginComponent() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const handleLogin = async () => {
    if (!username || !password) {
      setAlert(
        <Alert className={styles.alert} severity="error">Username or password missing.</Alert>
      );
      return;
    }
    const data = await login(username, password);
    if (data.success) {
      navigate("/");
    } else {
      setAlert(
        <Alert className={styles.alert} severity="error">{data.message}</Alert>
      );
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
          </FormControl>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLogin()}
          >
            Login
          </Button>
        </div>
        <div>
          <a href="/register">Not a member yet? Register here.</a>
        </div>
        {
          alert
        }
      </div>
    </Paper>
  );
}

export default LoginComponent;
