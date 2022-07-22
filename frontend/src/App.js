import AuthRoute from './utility/AuthRoute'
import MainComponent from './component/maincomponent/MainComponent';
import BackgroundComponent from './component/background/BackgroundComponent';
import NavigationComponent from './component/navigation/NavigationComponent';
import LoginComponent from './component/login/LoginComponent';
import {makeStyles} from "@material-ui/core"
import { BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterComponent from './component/register/registerComponent';

const useStyles = makeStyles({
  container: {
    
  }
});

function App() {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <BackgroundComponent/>
        <Routes>
          <Route exact path="/" element={<MainComponent/>} />
          <Route exact path="/test" element={<AuthRoute children={<NavigationComponent/>}/>}/>
          <Route exact path="/login" element={<LoginComponent/>}/>
          <Route exact path="/register" element={<RegisterComponent/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
