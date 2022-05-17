import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import RoleOperationService from "services/role/RoleOperationService";
// import AlertDescription from "../../../../common/AlertDescription";
import { GenericButton } from "@application";
import { useClasses } from "@application";

const styles = theme => ({
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
});

function UserRoleMapping(props) {
  console.log(props);
  let userAndRole =
    props && props.indexPageData ? props.indexPageData.USERANDROLE : false;
  let userCodeList = Object.keys(userAndRole);

  let roleObjectList = props.indexPageData.ROLELIST;

  const classes = useClasses(styles);
  const [userCode, setUserCode] = useState();
  const [roleIds, setroleIds] = useState([]);
  // const [successMessage, setSuccessMessage] = useState();

  const userCodeOnChange = event => {
    let currentSelectedUserCode = event.target.value;
    setUserCode(currentSelectedUserCode);
    let currentSelectedUserRoleList = Object.keys(
      userAndRole[currentSelectedUserCode]
    );
    debugger;
    setroleIds(currentSelectedUserRoleList);
  };

  const handleChangeMultiple = event => {
    setroleIds(event.target.value);
  };

  const assignRoleToUser = () => {
    RoleOperationService.assignRoleToUser(userCode, roleIds)
      .then(data => {
        //setSuccessMessage("ROles has assigned to user =" + userCode);
        alert("Role has assigned to user");
        props.refreshCurrentModule();
      })
      .catch(err => {});
  };

  return (
    <div style={{ marginTop: "1%" }}>
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item md={3}>
          <FormControl className={classes.formControl} fullWidth={true}>
            <InputLabel htmlFor="age-native-simple">
              Select User Code
            </InputLabel>
            <Select
              native
              value={userCode}
              onChange={userCodeOnChange}
              inputProps={{
                name: "userCode",
                id: "userCode"
              }}
            >
              <option aria-label="None" value="" />
              {userCodeList.map((user, index) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={4}>
          <FormControl className={classes.formControl} fullWidth={true}>
            <InputLabel id="userRoleLabel">User Roles</InputLabel>
            <Select
              labelId="role-mutiple-chip-label"
              id="userRole"
              multiple
              value={roleIds}
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
              {roleObjectList.map(role => (
                <MenuItem key={role.roleId} value={role.roleId}>
                  {role.roleName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={3}>
          <GenericButton
            variant="contained"
            color="primary"
            onClick={assignRoleToUser}
          >
            Assign Role
          </GenericButton>
        </Grid>
      </Grid>
      {/* {successMessage ? <AlertDescription message={AlertDescription} /> : null} */}
    </div>
  );
}

export default UserRoleMapping;
