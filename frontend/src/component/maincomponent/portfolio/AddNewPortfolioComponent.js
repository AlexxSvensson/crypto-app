import {makeStyles, Button, TextField} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setPortfolios } from "../../../redux/cryptoSlice";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px"
  },
  button: {
    marginLeft: "5%"
  },
});

function AddNewPortfolioComponent() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const portfolios = useSelector((state) => state.cryptoReducer.portfolios);

  const addNewPortfolio = () => {
    localStorage.setItem("portfolios", JSON.stringify([...portfolios, {name: name, data: []}]));
    dispatch(setPortfolios({portfolios: [...portfolios, {name: name, data: []}]}));
    setName("");
  };

  return (
    <div className={styles.container}>
      <TextField
        label="Add new portfolio..."
        id="standard-helperText"
        onChange={(event) => setName(event.target.value)}
        value={name}
        placeholder={"name"}
        />
      <Button 
        className={styles.button}
        color={"primary"} 
        variant={"contained"} 
        onClick={addNewPortfolio}>
          Add
      </Button>
    </div>
  );
}

export default AddNewPortfolioComponent;
