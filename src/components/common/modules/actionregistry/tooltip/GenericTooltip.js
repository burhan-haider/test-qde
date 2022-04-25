//Created by Vivek - 20.04.2020
import React from "react";
import { makeStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

const useStyles = makeStyles(theme => ({
  arrow: {
    color: theme.palette.common.black
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    //backgroundColor: "#242526",
    fontSize: "16px",
    color: "#fff",
    marginBottom: "7px"
  }
}));

function GenericTooltip(props) {
  const classes = useStyles();
  //return <Tooltip arrow classes={classes} {...props} />;
  return (
    <Tooltip
      arrow
      TransitionComponent={Zoom}
      placement="top-start"
      classes={classes}
      {...props}
    />
  );
}

export default GenericTooltip;
