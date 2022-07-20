import {makeStyles, Paper, FormControl, InputLabel, Select, MenuItem, Button} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPortfolio, setEditMode, setPortfolios } from "../../../redux/cryptoSlice";
import PortfolioComponent from "./PortfolioComponent";
import AddNewPortfolioComponent from "./AddNewPortfolioComponent";
import SelectPortfolioComponent from "./SelectPortfolioComponent";

const useStyles = makeStyles({
  container: {
    padding: "1%",
    display: "flex"
  },
  innerContainer: {
    flex: 1,
    display: "flex",
    padding: "10% 5% 10% 5%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  selectContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

function MainPortfolioComponent(props) {
  const styles = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    const portfolios = JSON.parse(localStorage.getItem("portfolios"));
    if (portfolios) {
      dispatch(setPortfolios({portfolios: portfolios}));
      dispatch(setCurrentPortfolio({index: 0}))
    } else {
      localStorage.setItem("portfolios", JSON.stringify([{name: "temp", data: []}]));
    }
  }, []);

  return (
    <div className={styles.container}>
      <Paper elevation={8} className={styles.innerContainer}>
        <div className={styles.selectContainer}>
          <SelectPortfolioComponent/>
          <Button 
            color="primary" 
            variant="contained"
            onClick={() => dispatch(setEditMode({value: true}))}
            >
            Edit
          </Button>
        </div>
        <AddNewPortfolioComponent/>
        <PortfolioComponent/>
      </Paper>
    </div>
  );
}

export default MainPortfolioComponent;
