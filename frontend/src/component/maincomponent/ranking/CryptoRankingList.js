import {makeStyles, Paper} from "@material-ui/core"
import RankingListItem from "./RankingListItem";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  container: {
    display: "flex",
    padding: "1%",
    height: "80vh",
  },
  innerContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "1%"
  },
  list: {
    flex: 1,
    listStyleType: "none",
    overflowY: "scroll",
    padding: 0,
    margin: 0,
  },
  listBar: {
    display: "flex",
    flexDirection: "row",
    marginRight: "1.9%",
    fontSize: "18px",
    fontWeight: "bold",
  },
  listBarRank: {
    width: "7%",
    backgroundColor: "red",
    display: "flex",
    justifyContent: "left", 
  }, 
  listBarName: {
    flex: 1,
    display: "flex",
    justifyContent: "left",    
  },
  listBarPrice: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "green",
  }
});

function CryptoRankingList(props) {
  const styles = useStyles();
  const cryptoPrices = useSelector((state) => state.cryptoReducer.priceList);

  return (
    <div className={styles.container}>
      <Paper elevation={8} className={styles.innerContainer}>
        <div className={styles.listBar}>
          <div className={styles.listBarRank}>Rank</div>
          <div className={styles.listBarName}>Name</div>
          <div className={styles.listBarPrice}>Price</div>
        </div>
        <ul className={styles.list}>
          {
            cryptoPrices.cryptos &&
            Object.keys(cryptoPrices.cryptos).map((item, index) => {
              return (
                <li key={index}> 
                  <RankingListItem 
                    crypto={cryptoPrices.cryptos[item]} 
                    short={item} />
                </li>
              );
            })
          }
        </ul>
      </Paper>
    </div>
  );
}

export default CryptoRankingList;
