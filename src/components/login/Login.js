import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Formsy from "formsy-react";

import { Button, FormControl, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";

import commonService from "../../services/common/commonService";
import COGNIFI_LOGO_FULL from "../../../assets/icons/cognifi_logo_full.png";
import QDE_LOGO from "../../../assets/icons/QDE_LOGO.png";
import Cognifi_Logo_Animated from "../../../assets/icons/Cognifi_Logo_Animated.gif";

import { TextFieldFormsy } from "../common/formsyComponents";
import { submitLogin } from "../../store/actions/auth";
import crypto from "crypto";
// submitLogin;
const useStyles = makeStyles((theme) => ({
  buttonRoot: {
    borderRadius: "25px",
    padding: "0.25% 3% 0.25% 3%",
    marginRight: "21%",
    marginTop: "2%",
    fontSize: "14px",
    fontFamily: "GoogleSans-Regular",
    float: "right",
    outline: "none",
    "&:hover": {
      backgroundColor: "#e4e4e4",
    },
  },
  buttonLabel: {
    textTransform: "initial",
  },

  root: {
    width: "60%",
    margin: "4% auto ",
    textAlign: "center",
    display: "flex",
    "& .MuiOutlinedInput-root": {
      height: "46px",
      borderRadius: "50px",
      fontSize: "14px",
      "& fieldset": {
        borderColor: "default",
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "14px 14px",
      fontFamily: "GoogleSans-Regular",
      // "& fieldset": {
      //   borderColor: "default"
      // }
    },
    "& .MuiInputLabel-outlined": {
      transform: "translate(14px, 16px) scale(1)",
    },
    "& .MuiInputLabel-shrink": {
      transform: " translate(14px, -6px) scale(0.75)",
    },

    "& .MuiSelect-select": {
      "&:focus": {
        borderRadius: "50px",
      },
    },
  },

  option: {
    backgroundColor: "red",
  },
  // textFieldRoot: {
  //   width: "100%"
  //   // marginTop: "2%"
  // },
  // textFieldInput: {
  //   textAlign: "center"
  // },
  // textFieldLabel: {
  //   fontSize: "14px"
  // },

  form: {
    textAlign: "center",
  },
  formDiv: {
    width: "35%",
    float: "right",
    // marginRight: "2%"
  },
  // VerticalLine: {
  //   position: "absolute",
  //   height: "58%",
  //   marginTop: "10%",
  //   width: "2%",
  //   marginLeft: "49%",
  //   borderRight: "1px solid #b1b7c1"
  // },

  cognifiHead: {
    fontFamily: "GoogleSans-Medium",
  },
  LoginImage: {
    position: "absolute",
    // maxHeight: "85%",
    // maxWidth: "85%"
    width: "68%",
    height: "100%",
  },
}));

function Login(props) {
  // login Component
  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  // VIVEK - BCRYPT
  // var bcrypt = require("bcryptjs");
  const exportImage = require.context("../../../assets", true);

  function encryptData(plaintext) {
    const iv = crypto.randomBytes(16);
    const key = crypto.pbkdf2Sync("QDEKEY1234543210", iv, 65536, 16, "sha1");
    var cipher = crypto.createCipheriv("aes-128-gcm", key, iv);
    var encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
    var tag = cipher.getAuthTag();
    return Buffer.concat([iv, encrypted, tag]).toString("base64");
  }

  const handleSubmit = (data, resetForm, invalidateForm) => {
    //console.log("data =", data);
    const encryptedPassword = encryptData(data.userPassword);
    //console.log("passowrd =", encryptedPassword);
    data.userPassword = encryptedPassword;
    const submit = dispatch(
      submitLogin(data, props.loadingHandler ? props.loadingHandler : null)
    );

    submit.then((response) => {
      if (
        (response !== undefined &&
          response.payload &&
          response.payload.status === 500)
      ) {
        invalidateForm({
          username: "Enter Valid Username",
          password: "Enter Valid Password",
        });
        alert("Username and Password does not match");
      } else if (response !== undefined) {
        alert("Something went wrong");
      }
    });
  };

  const onInValidSubmit = () => {
    setIsFormValid(false);
    // console.log("triggerds");
  };

  return (
    <div className="mainBody clearfix">
      <div className={classes.VerticalLine}>
        <img
          src={exportImage("./LoginImage.png").default}
          alt="Login page"
          className={classes.LoginImage}
        />
      </div>
      <div className={classes.formDiv}>
        <div className="logo-area pl-30 pt-20 pb-18 mb-32 text-center">
          <div className="flex justify-center mr-50 mt-12">
            <img src={Cognifi_Logo_Animated} className="w-1/2" alt="Cognifi" />
          </div>
        </div>
        <div className="text-center">
          <Formsy
            onValidSubmit={(data, resetForm, invalidateForm) =>
              handleSubmit(data, resetForm, invalidateForm)
            }
            onValid={() => setIsFormValid(true)}
            onInvalid={() => onInValidSubmit()}
            ref={formRef}
            // className="flex flex-col justify-center w-full"
          >
            <FormControl variant="outlined" className={classes.root}>
              <TextFieldFormsy
                required
                // onChange={handleChange}
                showError="true"
                errorMessage="lla"
                variant="outlined"
                name="userName"
                label="User Name"
                validations="isAlphanumeric"
                validationError="Invalid input"
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  shrink: "true",
                  classes: {
                    root: classes.textFieldRoot,
                    label: classes.textFieldLabel,
                  },
                }}
              />
            </FormControl>
            <FormControl variant="outlined" className={classes.root}>
              <TextFieldFormsy
                required
                // onChange={handleChange}
                variant="outlined"
                name="userPassword"
                type="password"
                label="Password"
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  shrink: "true",
                  classes: {
                    root: classes.textFieldRoot,
                    label: classes.textFieldLabel,
                  },
                }}
              />
            </FormControl>
            <FormControl variant="outlined" className={classes.root}>
              <TextFieldFormsy
                select
                variant="outlined"
                name="Bank"
                label="Bank"
                SelectProps={{
                  native: true,
                }}
                InputProps={{
                  className: classes.MuiOutlinedInput,
                  shrink: "true",
                  classes: {
                    root: classes.textFieldRoot,
                    label: classes.textFieldLabel,
                  },
                }}
              >
                <option aria-label="None" value="" />
                <option value="BankOne">Bank 1</option>
                <option value="BankTwo">Bank 2</option>
                <option value="BankThree">Bank 3</option>
              </TextFieldFormsy>
            </FormControl>
            <Button
              type="submit"
              variant="outlined"
              classes={{
                root: classes.buttonRoot,
                label: classes.buttonLabel,
              }}
              disabled={!isFormValid}
            >
              Log In
            </Button>
          </Formsy>
        </div>
        <br />
        <br /> <br /> <br />
        {/* <hr className={classes.bottomLine} />
        
        <a href="https://www.quantumdataengines.com/" className="flex justify-center mt-14" >Forgot Password?</a>*/}
        <div className="flex justify-center">
          <Typography
            style={{
              fontSize: "14px",
              fontFamily: "GoogleSans-Regular",
            }}
          >
            Version 0.1
          </Typography>
        </div>
        <div className="mt-8 flex justify-center">
          <img className="w-76" src={QDE_LOGO} alt="QDE" />
        </div>
        <div className="mt-8">
          <a
            href="https://www.quantumdataengines.com/"
            className="flex justify-center"
          >
            <Typography
              style={{ fontSize: "14px", fontFamily: "GoogleSans-Regular" }}
            >
              www.quantumdataengines.com
            </Typography>
          </a>
        </div>
      </div>
    </div>
  );
}
export default Login;