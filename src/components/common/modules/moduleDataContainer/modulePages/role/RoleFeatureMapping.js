import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import RoleOperationService from "../../../../../services/role/RoleOperationService";
import { GenericButton } from "@application";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
}));

function RoleFeatureMapping(props) {
  let featureList = props.indexPageData.FEATURELIST;
  let roleList = props.indexPageData.ROLELIST;
  let roleFeatureMappingList = props.indexPageData.ROLEFEATUREMAPPING;

  const classes = useStyles();
  const [feaureList, setFeaureList] = useState([]);
  const [roleId, setroleId] = useState();
  // const [successMessage, setSuccessMessage] = useState();

  const roleOnChange = event => {
    let currentSelectedroleId = event.target.value;
    setroleId(currentSelectedroleId);
    // userAndRole[currentSelectedUserCode];
    let roleAssignedFeatureList = roleFeatureMappingList.filter(function(
      roleFeaturemapping
    ) {
      return roleFeaturemapping["ROLE"]["roleId"] === currentSelectedroleId;
    });
    let currentSelectedFeatureCodeList = [];
    roleAssignedFeatureList[0]["FEATURELIST"].map(feature => {
      currentSelectedFeatureCodeList.push(feature["featureCode"]);
    });

    setFeaureList(currentSelectedFeatureCodeList);
  };

  const handleChangeMultiple = event => {
    setFeaureList(event.target.value);
  };

  const assignFeatureToRole = () => {
    RoleOperationService.roleFeatureMaping(roleId, feaureList)
      .then(data => {
        //setSuccessMessage("ROles has assigned to user =" + userCode);
        alert("Feature has assigned to role");
        props.refreshCurrentModule();
      })
      .catch(err => {});
  };

  return (
    <div style={{ marginTop: "1%" }}>
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item md={2}>
          <FormControl className={classes.formControl} fullWidth={true}>
            <InputLabel htmlFor="age-native-simple">Select Role</InputLabel>
            <Select
              native
              value={roleId ? roleId : ""}
              onChange={roleOnChange}
              inputProps={{
                name: "roleId",
                id: "roleId"
              }}
            >
              <option aria-label="None" value="" />
              {roleList.map((role, index) => {
                return (
                  <option key={role["roleId"]} value={role["roleId"]}>
                    {role["roleName"]}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={7}>
          <FormControl className={classes.formControl} fullWidth={true}>
            <InputLabel id="userRoleLabel">Feature</InputLabel>
            <Select
              labelId="role-mutiple-chip-label"
              id="userRole"
              multiple
              value={feaureList}
              onChange={handleChangeMultiple}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
            >
              {featureList.map(feature => (
                <MenuItem
                  key={feature["featureCode"]}
                  value={feature["featureCode"]}
                >
                  {feature["featureName"]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={2}>
          <GenericButton
            variant="contained"
            color="primary"
            onClick={assignFeatureToRole}
          >
            Assign Feature
          </GenericButton>
        </Grid>
      </Grid>
      {/* {successMessage ? <AlertDescription message={AlertDescription} /> : null} */}
    </div>
  );
}

export default RoleFeatureMapping;
