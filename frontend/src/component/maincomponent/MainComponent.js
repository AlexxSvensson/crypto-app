import {makeStyles} from "@material-ui/core"
import MainPortfolioComponent from "./portfolio/MainPortfolioComponent";
import CryptoRankingList from "./ranking/CryptoRankingList";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { setCryptoPrices } from "../../redux/cryptoSlice";
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles({
  container: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1%",
    height: "95vh",
  }, 
  innerContainer: {
    display: "grid",
    gridTemplateColumns: "50% 50%",
  },
  cryptoRankingList: {

  },
  cryptoPortfolioList: {

  },
});

function MainComponent() {
  const styles = useStyles();
  const [socket, setSocket] = useState(null);
  const cryptoPrices = useSelector((state) => state.cryptoReducer.priceList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket === null)
      setSocket(socketIOClient("http://127.0.0.1:3001"));

    return () => {
      socket.removeAllListeners();
    }
  }, []);

  useEffect(() => {
    if (socket !== null) {
      socket.on('connection', (data) => {
        console.log('Successfully connected!');
        dispatch(setCryptoPrices(data));
      });
      socket.on("cryptoPriceUpdates", (data) => {
        dispatch(setCryptoPrices(data));
      });
    }
  }, [socket]);
  
  useEffect(() => {

  }, [cryptoPrices]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <CryptoRankingList className={styles.cryptoRankingList}/>
        <MainPortfolioComponent className={styles.cryptoPortfolioList}/>
      </div>
    </div>
  );
}

export default MainComponent;
