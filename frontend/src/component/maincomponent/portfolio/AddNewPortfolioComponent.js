import {makeStyles, Button, TextField} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setPortfolios } from "../../../redux/cryptoSlice";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-around"
  },
});

function AddNewPortfolioComponent() {
  const styles = useStyles();
  const dispatch = useDispatch()
  const portfolios = useSelector((state) => state.cryptoReducer.portfolios);

  const addNewPortfolio = () => {
    localStorage.setItem("portfolios", JSON.stringify([...portfolios, []]));
    dispatch(setPortfolios({portfolios: [...portfolios, []]}));
  };

  return (
    <div className={styles.container}>
      <TextField
        className={styles.amountTextField}
        id="amount"
        onChange={(event) => console.log(event.target.value)}
        defaultValue={""}
        placeholder={"name"}
      />
      <Button 
        color={"primary"} 
        variant={"contained"} 
        onClick={addNewPortfolio}>
          New
      </Button>
    </div>
  );
}

export default AddNewPortfolioComponent;
