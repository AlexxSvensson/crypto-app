import AuthRoute from './utility/AuthRoute'
import MainComponent from './component/maincomponent/MainComponent';
import BackgroundComponent from './component/background/BackgroundComponent';
import NavigationComponent from './component/navigation/NavigationComponent';
import {makeStyles} from "@material-ui/core"
import { BrowserRouter, Route ,Link, Routes} from "react-router-dom";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
