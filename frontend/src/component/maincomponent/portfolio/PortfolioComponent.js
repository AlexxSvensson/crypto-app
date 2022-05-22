import {makeStyles, Button} from "@material-ui/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPortfolio, setPortfolios, setEditMode } from "../../../redux/cryptoSlice";
import AddCryptoToPortfolioComponent from "./AddCryptoToPortfolioComponent";
import CryptoListComponent from "./CryptoListComponent";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "2%"
  },
  innnerContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  amountTextField: {
    width: "33%",
    '& input:disabled': {
      color: 'black',
    },
  },
  listContainer: {
    width: "100%",
    maxHeight: "75%",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    maxHeight: "90%",
    overflowY: "scroll",
    listStylePosition: "none",
  },
  listItem: {
    margin: 0
  },
  editButtonContainer: {
    maxWidth: "50px",
    alignSelf: "flex-start",
    justifySelf: "start"
  }
});

function PortfolioComponent() {
  const styles = useStyles();
  const dispatch = useDispatch();
  
  const cryptoPrices = useSelector((state) => state.cryptoReducer.priceList);
  const currentPortfolioIndex = useSelector((state) => state.cryptoReducer.currentPortfolioIndex);
  const tempPortfolio = useSelector((state) => state.cryptoReducer.tempPortfolio);
  const editMode = useSelector((state) => state.cryptoReducer.editMode);


  const onSavePortfolio = () => {
    if (editMode) {
      console.log(tempPortfolio)
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

  return (
    <div className = {styles.container}>
      <div className = {styles.innnerContainer}>
        <div className={styles.editButtonContainer}>
          <Button 
            color={"primary"} 
            variant={"contained"}
            onClick={() => onSavePortfolio()}
          >
            { editMode ? "Save" : "Edit" }
          </Button>
        </div>
        {
          tempPortfolio.length !== 0 && cryptoPrices.cryptos &&
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
