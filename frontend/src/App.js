import MainComponent from './component/maincomponent/MainComponent';
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles({
  container: {
    
  }
});


function App() {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <MainComponent/>
    </div>
  );
}

export default App;
