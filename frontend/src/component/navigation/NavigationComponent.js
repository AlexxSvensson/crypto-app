import {makeStyles} from "@material-ui/core"
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles({
  canvas: {
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "100%",
    width: "100%",
    backgroundColor: "white"
  },
});

function NavigationComponent() {
  const styles = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={styles.canvas}> 
      sdfsadfsdf
      fgdhdfhdfgh
      rewtwertwert
      dfgdsfg
      bcxbcvxbcxvb
    </div>
  );
}

export default NavigationComponent;
