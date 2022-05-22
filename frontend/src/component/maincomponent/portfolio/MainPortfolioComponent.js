import {makeStyles, Paper, FormControl, InputLabel, Select, MenuItem, Button} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPortfolio, setPortfolios } from "../../../redux/cryptoSlice";
import PortfolioComponent from "./PortfolioComponent";
import AddNewPortfolioComponent from "./AddNewPortfolioComponent";

const useStyles = makeStyles({
  container: {
    padding: "1%",
    overflow: "hidden"
  },
  innerContainer: {
    display: "flex",
    height: "95vh",
    flexDirection: "column",
    justifyContent: "center",
  },
});

function MainPortfolioComponent(props) {
  const styles = useStyles();
  const dispatch = useDispatch()
  const portfolios = useSelector((state) => state.cryptoReducer.portfolios);

  useEffect(() => {
    const portfolios = JSON.parse(localStorage.getItem("portfolios"));
    if (portfolios) {
      dispatch(setPortfolios({portfolios: portfolios}));
      dispatch(setCurrentPortfolio({index: 0}))
    } else {
      localStorage.setItem("portfolios", JSON.stringify([]));
    }
  }, []);

  return (
    <div className={styles.container}>
      <Paper elevation={8} className={styles.innerContainer}>
        <AddNewPortfolioComponent/>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Cryptos</InputLabel>
          <Select
            label="crypto"
            defaultValue={'0'}
            onChange={(event) => dispatch(setCurrentPortfolio({index: event.target.value}))}
          >
            {
              portfolios.map((item, index) => {
                return <MenuItem key={index} value={index}>{index}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <PortfolioComponent/>
      </Paper>
    </div>
  );
}

export default MainPortfolioComponent;
