import {makeStyles, Paper} from "@material-ui/core"
import { useEffect } from "react";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
  innerContainer: {
    flex: 1,
    display: "flex",
    borderBottom: "1px solid"
  },
  rank: {
    width: "5%",
    paddingLeft: "2%",
    backgroundColor: "red",
    fontWeight: "bold",
  }, 
  name: {
    flex: 1,
    display: "flex",
    justifyContent: "left",
    fontWeight: 500,  
  },
  price: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "green",
    fontWeight: 500,
  }
});

function RankingListItem(props) {
  const styles = useStyles();
  useEffect(() => {

  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.rank}>#{props.crypto.rank}</div>
        <div className={styles.name}>
          {props.crypto.name}   ({props.short})
        </div>
        <div className={styles.price}>{props.crypto.price}</div>
      </div>
    </div>
  );
}

export default RankingListItem;
