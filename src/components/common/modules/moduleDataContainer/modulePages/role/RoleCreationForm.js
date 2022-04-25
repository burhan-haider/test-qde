// import React from "react";
// import { FormHelper } from "../../../../common/FormHelper";

// import {
//   DialogContent,
//   Grid,
//   FormControl,
//   TextField,
//   DialogActions
// } from "@mui/material";
// import { GenericButton } from "@application";

// function RoleCreationForm(props) {
//   const [roleForm, handleChange] = FormHelper({
//     roleName: ""
//   });

//   return (
//     <div>
//       <DialogContent>
//         <div className="px-16 sm:px-24">
//           <Grid container spacing={3}>
//             <Grid item xs={6}>
//               <FormControl className="mt-8 mb-16" required fullWidth>
//                 <TextField
//                   label="Role Name"
//                   autoFocus
//                   name="roleName"
//                   value={roleForm.roleName}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                 />
//               </FormControl>
//             </Grid>
//           </Grid>
//         </div>
//       </DialogContent>
//       <DialogActions className="justify-end pl-8 sm:pl-16">
//         <GenericButton
//           variant="contained"
//           color="primary"
//           className="saveButtonStyle"
//           onClick={() => props.addNewRole(roleForm)}
//         >
//           Add
//         </GenericButton>

//         <GenericButton
//           variant="contained"
//           color="default"
//           className="cancelButtonStyle"
//           onClick={props.closeCreaeUserDialog}
//         >
//           Close
//         </GenericButton>
//       </DialogActions>
//     </div>
//   );
// }

// export default RoleCreationForm;
