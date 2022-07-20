import {makeStyles, FormControl, InputLabel, Select, MenuItem, Button} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPortfolio } from "../../../redux/cryptoSlice";

const useStyles = makeStyles({
  container: {
    width: "70%",
  },
});

function SelectPortfolioComponent() {
  const styles = useStyles();
  const dispatch = useDispatch()
  const portfolios = useSelector((state) => state.cryptoReducer.portfolios);

  const onChange = (name) => {
    let index = 0;
    portfolios.forEach((item, i) => {
      if (item.name === name) {
        index = i;
      } 
    });
    dispatch(setCurrentPortfolio({index: index}));
  }

  return (
    <div className={styles.container}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select portfolio</InputLabel>
        <Select
          defaultValue={portfolios[0].name}
          onChange={(event) => onChange(event.target.value)}
        >
          {
            portfolios.map((item, index) => {
              return <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectPortfolioComponent;
