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
import { SelectFormsy } from "components/common/formsyComponents";
import Formsy from "formsy-react";
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
  // console.log(props);
  let userAndRole =
    props && props.indexPageData ? props.indexPageData.USERANDROLE : false;
  let pendingUsers = props.indexPageData ? props.indexPageData.PENDINGUSER : [];
  let userCodeList = [];

  Object.keys(userAndRole).map((key,index)=>{
    userCodeList.push(key);
  })
  
  Object.keys(pendingUsers).map((user, index)=>{
    userCodeList.push(user)
  })

  let roleObjectList = props.indexPageData.ROLELIST;

  const classes = useClasses(styles);
  const [userCode, setUserCode] = useState();
  const [roleIds, setroleIds] = useState([]);
  const [roleCodeList, setRoleCodeList] = useState([]);
  const [activateField, setActivateField] = useState(false);
  // const [successMessage, setSuccessMessage] = useState();

  const userCodeOnChange = event => {
    setActivateField(true);
    let currentSelectedUserCode = event.target.value;
    setUserCode(currentSelectedUserCode);
    let currentSelectedUserRoleList = userAndRole[currentSelectedUserCode]?Object.values(
      userAndRole[currentSelectedUserCode]
    ):Object.values(
      pendingUsers[currentSelectedUserCode]
    );
    setroleIds(currentSelectedUserRoleList); 
  };

  const handleChangeMultiple = event => {

    let selectedList = event.target.value;
    let allRoles = roleObjectList;
    let currentSelectedRoleCodeList = [];

    if(selectedList.length > 0){
      selectedList.map(roleId => {
        allRoles.map(role => {
          if(role.roleName == roleId){
            if(currentSelectedRoleCodeList.filter(e=>e===role.roleName).length === 0){
              currentSelectedRoleCodeList.push(role.roleId);
            }
          }
          return null;
        })
        return null;
      })
    }

    // console.log("current Code List:-", currentSelectedRoleCodeList);
    // console.log("allRoles:-",allRoles)
    // console.log("Event:-",selectedList)
    setRoleCodeList(currentSelectedRoleCodeList);
    setroleIds(event.target.value);
  };

  const assignRoleToUser = () => {
    RoleOperationService.assignRoleToUser(userCode, roleCodeList)
      .then(data => {
        //setSuccessMessage("ROles has assigned to user =" + userCode);
        alert("Role has assigned to user");
        props.refreshCurrentModule();
      })
      .catch(err => {});
  };

  return (
    <Formsy>
    <div style={{ marginTop: "1%" }}>
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item md={3}>
          <FormControl className={classes.formControl} fullWidth={true}>
            {/* <InputLabel htmlFor="age-native-simple">
              Select User Code
            </InputLabel> */}
            <SelectFormsy
              variant="outlined"
              name="userCode"
              native
              label="Select User Code"
              value={userCode ? userCode : ""}
              onChange={userCodeOnChange}
              inputProps={{
                name: "userCode",
                id: "userCode"
              }}
            >
              <option aria-label="None" disabled value="" />
              {userCodeList.map((user, index) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </SelectFormsy>
          </FormControl>
        </Grid>
        <Grid item md={5}>
          <FormControl className={classes.formControl} fullWidth={true}>
            {/* <InputLabel id="userRoleLabel">User Roles</InputLabel> */}
            <SelectFormsy
              labelId="role-mutiple-chip-label"
              label="Select Role"
              id="userRole"
              name="userRole"
              variant="outlined"
              disabled={!activateField}
              multiple
              value={roleIds}
              onChange={handleChangeMultiple}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip 
                      key={value} 
                      label={value} 
                      className={classes.chip} 
                      />
                  ))}
                </div>
              )}
            >
              {roleObjectList.map(role => (
                <MenuItem key={role.roleName} value={role.roleName}>
                  {role.roleName}
                </MenuItem>
              ))}
            </SelectFormsy>
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
    </Formsy>
  );
}

export default UserRoleMapping;
