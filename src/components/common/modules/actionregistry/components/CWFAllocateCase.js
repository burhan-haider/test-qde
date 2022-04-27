import React, { useRef, useState } from "react";
import Formsy from "formsy-react";
import {
  TextFieldFormsy,
  DatePickerFormsy,
  SelectFormsy
} from "components/common/formsyComponents";
import { MenuItem, FormControl, Paper, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import caseWorkflowService from "services/caseWorkflow/caseWorkflowService";
import { GenericButton } from "@application";
import { useClasses } from '@application'

const styles = theme => ({
  root: {
    width: "100%"
  },
  formControl: {
    margin: theme.spacing(1),
    fullWidth: true,
    display: "flex",
    wrap: "nowrap"
  },
  expandedPanel: {
    backgroundColor: "#f4f5fa"
  },
  heading: {
    color: "#052a4f",
    fontSize: theme.typography.pxToRem(18),
    fontWeight: "500"
  },
  rowDesign: {
    paddingTop: 15
  }
});

function CWFAllocateCase(props) {
  const classes = useClasses(styles);
  const formRef = useRef(null);

  const [isFormValid, setIsFormValid] = useState(false);
  const [submitType, setSubmitType] = useState(null);

  const [openBranchManager, setOpenBranchManager] = useState(false);
  const [openProductManager, setOpenProductManager] = useState(false);

  const paramData = props.data;
  //console.log("paramData :>> ", paramData.caseNo, paramData.actionCode);
  const caseNo = paramData.caseNo;
  const actionCode = paramData.actionCode;
  const usersList = paramData.USERSLIST;
  const subActionsList = paramData.SUBACTIONS;
  const inputParams = paramData.INPUTPARAMS;

  const handleAllocationTo = e => {
    if (e.target.value === "BM") {
      setOpenBranchManager(true);
      setOpenProductManager(false);
    } else {
      setOpenProductManager(true);
      setOpenBranchManager(false);
    }
  };

  const postCase = () => {
    setSubmitType("post");
  };

  const postAndCloseCase = () => {
    setSubmitType("postAndClose");
  };

  const attachEvidence = () => {};

  const handleSubmit = data => {
    setIsFormValid(false);
    Object.entries(inputParams).map((key, value) => {
      data[key[0]] = key[1] === null ? "" : key[1];
    });
    data["caseNos"] = caseNo;
    data["inputActionCode"] = actionCode;
    data["addedToMarkAll"] = "N";
    data["addedToFalsePositive"] = "N";
    data["alertNos"] = "";
    data["fiuReferenceNo"] = "";
    data["fiuReferenceDate"] = "";

    var result = null;
    if (submitType === "post") {
      data["userActionType"] = "Post";
      result = caseWorkflowService.draftCaseAndComments(data);
    } else {
      data["userActionType"] = "PostAndClose";
      result = caseWorkflowService.saveCaseAndComments(data);
    }
    if (result !== null) {
      result
        .then(() => {
          props.reloadData(props.inputParams);
        })
        .finally(() => {
          props.handleClose();
          setIsFormValid(true);
        });
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <div id="topFrame" className={classes.root}>
        <Formsy
          onValidSubmit={data => handleSubmit(data)}
          onValid={() => setIsFormValid(true)}
          onInvalid={() => setIsFormValid(false)}
          ref={formRef}
          className="flex flex-col justify-center w-full"
        >
          <Grid
            container
            alignItems="flex-start"
            spacing={2}
            className={classes.rowDesign}
          >
            <Grid item xs={4}>
              {/*<FormControl className={classes.formControl}>
                 <DatePickerFormsy
                  variant="outlined"
                  name="lastReviewedDate"
                  label="Account Reviewed Date"
                  ampm={false}
                  className={undefined}
                  dateTime={false}
                  allowKeyboardControl={true}
                  required={true}
                  value={new Date()}
                  disabled={true}
                /> 
                </FormControl>*/}

              <FormControl className={classes.formControl}>
                <SelectFormsy
                  variant="outlined"
                  name="allocationReason"
                  label="Allocation Reason"
                  value=""
                  className={undefined}
                  onChange={() => {}}
                  required={true}
                >
                  <MenuItem value="">Select One</MenuItem>
                  {subActionsList && subActionsList !== null
                    ? Object.entries(subActionsList).map((key, value) => {
                        return (
                          <MenuItem value={key[1]} key={value}>
                            {key[1]}
                          </MenuItem>
                        );
                      })
                    : null}
                </SelectFormsy>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.formControl}>
                <SelectFormsy
                  variant="outlined"
                  name="allocateTo"
                  label="Allocate To"
                  value=""
                  className={undefined}
                  onChange={e => handleAllocationTo(e)}
                  required={true}
                >
                  <MenuItem value="BM">Branch Manager</MenuItem>
                  <MenuItem value="PM">Product Manager</MenuItem>
                </SelectFormsy>
              </FormControl>
            </Grid>
            {openBranchManager
              ? usersList && usersList != null
                ? usersList.map((user, index) => (
                    <Grid item xs={4} key={index}>
                      <FormControl className={classes.formControl}>
                        <SelectFormsy
                          variant="outlined"
                          name="reassignToUserCode"
                          label="Assigned User"
                          value=""
                          className={undefined}
                          onChange={() => {}}
                          required={true}
                        >
                          <MenuItem value="">Select One</MenuItem>
                          {user
                            ? Object.entries(user).map((key, value) => {
                                return (
                                  <MenuItem value={key[1]} key={value}>
                                    {key[1]}
                                  </MenuItem>
                                );
                              })
                            : null}
                        </SelectFormsy>
                      </FormControl>
                    </Grid>
                  ))
                : null
              : null}
            {openProductManager
              ? usersList && usersList != null
                ? usersList.map((user, index) => (
                    <Grid item xs={4} key={index}>
                      <FormControl className={classes.formControl}>
                        <SelectFormsy
                          variant="outlined"
                          name="reassignToUserCode"
                          label="Assigned User"
                          value=""
                          className={undefined}
                          onChange={() => {}}
                          required={true}
                        >
                          <MenuItem value="">Select One</MenuItem>
                          {user
                            ? Object.entries(user).map((key, value) => {
                                return (
                                  <MenuItem value={key[1]} key={value}>
                                    {key[1]}
                                  </MenuItem>
                                );
                              })
                            : null}
                        </SelectFormsy>
                      </FormControl>
                    </Grid>
                  ))
                : null
              : null}
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextFieldFormsy
                  variant="outlined"
                  name="comments"
                  label="Comments"
                  className={undefined}
                  onChange={() => {}}
                  validationError=""
                  required={true}
                  multiline={true}
                  value=""
                ></TextFieldFormsy>
              </FormControl>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid
              container
              alignItems="flex-start"
              justify="flex-end"
              direction="row"
              style={{ marginRight: 15, marginBottom: 10 }}
            >
              <GenericButton
                type="submit"
                variant="outlined"
                color="primary"
                aria-label={""}
                className={classes.button}
                name="post"
                value="post"
                style={{ margin: 10 }}
                disabled={!isFormValid}
                onClick={() => postCase()}
              >
                Post
              </GenericButton>
              <GenericButton
                type="submit"
                variant="outlined"
                color="primary"
                aria-label={""}
                className={classes.button}
                name="postAndClose"
                value="postAndClose"
                style={{ margin: 10 }}
                disabled={!isFormValid}
                onClick={() => postAndCloseCase()}
              >
                Post & Close
              </GenericButton>
              <GenericButton
                type="submit"
                variant="outlined"
                color="primary"
                aria-label={""}
                className={classes.button}
                name="attachEvidence"
                value="attachEvidence"
                style={{ margin: 10 }}
                disabled={!isFormValid}
                onClick={() => attachEvidence()}
              >
                Attach Evidence
              </GenericButton>
            </Grid>
          </Grid>
        </Formsy>
      </div>
    </Paper>
  );
}

export default CWFAllocateCase;
