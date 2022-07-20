import {makeStyles, TextField, Button} from "@material-ui/core";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTempPortfolio } from "../../../redux/cryptoSlice";

const useStyles = makeStyles({
  amountTextField: {
    width: "33%",
    '& input:disabled': {
      color: 'black',
    },
  },
  listContainer: {
    width: "100%",
    maxHeight: "50vh",
    overflowY: "auto",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    listStylePosition: "none",
  },
  listItem: {
    margin: 0
  },
});

function CryptoListComponent() {
  const styles = useStyles();
  const dispatch = useDispatch();
  
  const cryptoPrices = useSelector((state) => state.cryptoReducer.priceList);
  const currentPortfolioIndex = useSelector((state) => state.cryptoReducer.currentPortfolioIndex);
  const tempPortfolio = useSelector((state) => state.cryptoReducer.tempPortfolio);
  const editMode = useSelector((state) => state.cryptoReducer.editMode);
  const cryptos = useMemo(() => {
    return (
      <ul className = {styles.list}>
        {
          tempPortfolio.data && tempPortfolio.data.length !== 0 &&
          tempPortfolio.data.map((item, index) => {
            console.log(item)
            console.log(cryptoPrices.cryptos)
            return (
              <li key={index} className={styles.listItem}> 
                <TextField
                  className={styles.amountTextField}
                  id={`short${currentPortfolioIndex}-${index}`}
                  disabled={true}
                  value={item.short}
                  InputProps={{ disableUnderline: true }}
                />
                <TextField
                  className={styles.amountTextField}
                  id={`amount${currentPortfolioIndex}-${index}`}
                  disabled={!editMode}
                  onChange={(event) => changeTempPortfolioAmount(event.target.value, item.short)}
                  value={item.amount}
                  InputProps={{ disableUnderline: !editMode }}
                />
                <TextField
                  className={styles.amountTextField}
                  id={`value${currentPortfolioIndex}-${index}`}
                  disabled={true}
                  value={item.amount * cryptoPrices.cryptos[item.short].price}
                  InputProps={{ disableUnderline: true }}
                />
              </li>
            )
          })
        }
      </ul>
    );
  }, [tempPortfolio, editMode])

  const changeTempPortfolioAmount = (amount, short) => {
    const newT = tempPortfolio.data.map((item) => {
      if (item.short === short) {
        const updatedItem = {
          ...item,
          amount: amount
        }
        return updatedItem;
      }
      return item;
    })
    dispatch(setTempPortfolio({portfolio: { name: tempPortfolio.name, data: newT}}));
  };

  return (
    <div className = {styles.listContainer}> 
      {cryptos}
    </div>
  );
}

export default CryptoListComponent;
