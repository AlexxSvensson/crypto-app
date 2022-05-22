import {makeStyles, TextField, Button} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTempPortfolio } from "../../../redux/cryptoSlice";


const useStyles = makeStyles({
  autoComplete: {
    flexGrow: 1,
    maxWidth: "37%",
  },
  amountTextField: {
    width: "33%",
    '& input:disabled': {
      color: 'black',
    },
  },
  addCryptoDiv: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "end",
    justifyContent: "space-between",
    paddingLeft: "2%",
    paddingRight: "2%"
  },
});

function AddCryptoToPortfolioComponent(props) {
  const styles = useStyles();
  const dispatch = useDispatch()
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(0);
  const cryptoNames = useSelector((state) => state.cryptoReducer.cryptoNames);
  const tempPortfolio = useSelector((state) => state.cryptoReducer.tempPortfolio);
  const cryptoPrices = useSelector((state) => state.cryptoReducer.priceList);
  useEffect(() => {

  }, []);

  const onAmountChange = (value) => {
    const floatValue = parseFloat(value);
    if (floatValue) {
      setSelectedAmount(parseFloat(value));
    } else {
      setSelectedAmount(0);
    }
  };

  const addToPortfolio = () => {
    if (tempPortfolio.filter(item => item.short === selectedCrypto).length) {
      alert(selectedCrypto + " already in portfolio.");
      return;
    }
    const crypto = cryptoPrices.cryptos[selectedCrypto]
    if (crypto)
      dispatch(setTempPortfolio({portfolio: [...tempPortfolio, {short: selectedCrypto, name: crypto.name, amount: selectedAmount}]}));
  };

  return (
    <div className={styles.addCryptoDiv}>
      <Autocomplete
        disablePortal
        className={styles.autoComplete}
        id="combo-box-demo"
        options={cryptoNames}
        sx={{ width: 300 }}
        onChange={(event) => setSelectedCrypto(event.target.innerText)}
        renderInput={(params) => <TextField {...params} label="Cryptos" />}
      />
      <TextField
        className={styles.amountTextField}
        id="amount"
        onChange={(event) => onAmountChange(event.target.value)}
        defaultValue={0}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => addToPortfolio()}
      >
        Add
      </Button>
    </div>
  );
}

export default AddCryptoToPortfolioComponent;
