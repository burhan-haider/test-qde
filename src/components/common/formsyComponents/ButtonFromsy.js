import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import _ from "lodash";

const useStyles = makeStyles(theme => ({
  buttonRoot: {
    borderRadius: "25px",
    marginRight: "1%",
    color: "#052a4f",
    backgroundColor: "#fff",
    border: "1px solid #052a4f",
    fontFamily: "inherit",
    "&:hover, &:focus": {
      color: "#fff",
      backgroundColor: "#052a4f"
    }
  },
  buttonLabel: {
    textTransform: "capitalize"
    //color: "white"
  }
}));

function GenericButton(props) {
  const classes = useStyles();
  const importedProps = _.pick(props, [
    "className",
    "disabled",
    "id",
    "name",
    "color",
    "variant"
  ]);

  return (
    <Button
      {...importedProps}
      classes={{
        root: classes.buttonRoot,
        label: classes.buttonLabel
      }}
      {...props}
    />
  );
}

export default GenericButton;
