import {makeStyles, Button} from "@material-ui/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPortfolio, setPortfolios, setEditMode, setTempPortfolio } from "../../../redux/cryptoSlice";
import AddCryptoToPortfolioComponent from "./AddCryptoToPortfolioComponent";
import CryptoListComponent from "./CryptoListComponent";

const useStyles = makeStyles({
  container: {
    flex: 1,
    marginTop: "10px",
  },
  innnerContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  editButtonContainer: {
    alignSelf: "flex-start",
    display: "flex",
  },
  cancelButton: {
    backgroundColor: "red",
    color: "white",
    marginLeft: "10%"
  },
});

function PortfolioComponent() {
  const styles = useStyles();
  const dispatch = useDispatch();
  
  const cryptoPrices = useSelector((state) => state.cryptoReducer.priceList);
  const currentPortfolioIndex = useSelector((state) => state.cryptoReducer.currentPortfolioIndex);
  const tempPortfolio = useSelector((state) => state.cryptoReducer.tempPortfolio);
  const currentPortfolio = useSelector((state) => state.cryptoReducer.currentPortfolio);
  const editMode = useSelector((state) => state.cryptoReducer.editMode);


  const onSavePortfolio = () => {
    if (editMode) {
      let newPortfolios = JSON.parse(localStorage.getItem("portfolios")).map((item, index) => {
        if (index === currentPortfolioIndex) {
          return tempPortfolio;
        }
        return item;
      });
      if (!newPortfolios.length) newPortfolios.push(tempPortfolio);
      localStorage.setItem("portfolios", JSON.stringify(newPortfolios));
      dispatch(setPortfolios({portfolios: newPortfolios}));
      dispatch(setCurrentPortfolio({index: currentPortfolioIndex}));
    }
    dispatch(setEditMode({value: !editMode}));
  };

  const onCancelPortfolioChange = () => {
    dispatch(setEditMode({value: false}));
    dispatch(setTempPortfolio({portfolio: currentPortfolio}))
  }

  return (
    <div className = {styles.container}>
      <div className = {styles.innnerContainer}>
        {
        editMode &&
        <div className={styles.editButtonContainer}>
          <Button 
            color={"primary"} 
            variant={"contained"}
            onClick={() => onSavePortfolio()}
          >
            Save
          </Button>
          <Button 
            className={styles.cancelButton} 
            variant={"contained"}
            onClick={() => onCancelPortfolioChange()}
          >
            Cancel
        </Button>
        </div>
        }
        {
          cryptoPrices.cryptos &&
          <CryptoListComponent/>
        }
        {
        editMode &&
        <AddCryptoToPortfolioComponent/>
        }
      </div>
    </div>
  );
}

export default PortfolioComponent;
