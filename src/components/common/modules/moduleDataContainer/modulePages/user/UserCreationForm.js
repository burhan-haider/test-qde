// import React from "react";
// import { FormHelper } from "../../../../common/FormHelper";
// import Switch from "@material-ui/core/Switch";

// import {
//   DialogContent,
//   Grid,
//   FormControl,
//   TextField,
//   DialogActions
// } from "@material-ui/core";
// import { GenericButton } from "@application";

// export default function UserCreationForm(props) {
//   const [userForm, handleChange] = FormHelper({
//     username: "Ravi",
//     userPass: "Cognifi@123",
//     firstName: "K",
//     lastName: "l",
//     emailId: "ravi@gmail.com",
//     mobileNo: "8092399476",
//     designation: " LRO",
//     branchCode: "0021",
//     employeeCode: "7896",
//     departmentCode: "5623",
//     accountEnabled: true,
//     accountExpired: false,
//     accountLocked: false,
//     accountDormant: false,
//     accountDeleted: false,
//     credentialsExpired: false,
//     isETLUser: false,
//     chatEnable: true,
//     isDBAuthentication: true,
//     isDBAuthRequired: true,
//     accessStartTime: "00:00:00",
//     accessEndTime: "00:00:00",
//     accessPoints: "",
//     labelDirection: "",
//     language: ""
//   });

//   return (
//     <div>
//       <DialogContent>
//         <div className="px-16 sm:px-24">
//           <Grid container spacing={3}>
//             <Grid item xs={6}>
//               <FormControl className="mt-8 mb-16" required fullWidth>
//                 <TextField
//                   label="User Name"
//                   autoFocus
//                   name="username"
//                   value={userForm.username}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <FormControl className="mt-8 mb-16" required fullWidth>
//                 <TextField
//                   label="First Name"
//                   // autoFocus
//                   name="firstName"
//                   value={userForm.firstName}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                 />
//               </FormControl>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3}>
//             <Grid item xs={6}>
//               <FormControl className="mt-8 mb-16" required fullWidth>
//                 <TextField
//                   label="Last Name"
//                   name="lastName"
//                   value={userForm.lastName}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <FormControl className="mt-8 mb-16" required fullWidth>
//                 <TextField
//                   label="Email ID"
//                   name="emailId"
//                   type="email"
//                   value={userForm.emailId}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                 />
//               </FormControl>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3}>
//             <Grid item xs={6}>
//               <FormControl className="mt-8 mb-16" required fullWidth>
//                 <TextField
//                   label="Mobile No."
//                   name="mobileNo"
//                   type="number"
//                   value={userForm.mobileNo}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <FormControl className="mt-8 mb-16" required fullWidth>
//                 <TextField
//                   label="Designation"
//                   name="designation"
//                   value={userForm.designation}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                 />
//               </FormControl>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3}>
//             <Grid item xs={6}>
//               <FormControl className="mt-8 mb-16" required fullWidth>
//                 <TextField
//                   label="Employee Code"
//                   name="employeeCode"
//                   value={userForm.employeeCode}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <FormControl className="mt-8 mb-16" required fullWidth>
//                 <TextField
//                   label="Branch Code"
//                   // autoFocus
//                   name="branchCode"
//                   value={userForm.branchCode}
//                   onChange={handleChange}
//                   required
//                   variant="outlined"
//                 />
//               </FormControl>
//             </Grid>
//           </Grid>
//           {/* <Grid container spacing={3}>
//             <Grid item xs={6}>
//               <FormControl className="mt-8 mb-16" required fullWidth>
//                 <Switch
//                   checked={userForm.accountEnabled}
//                   onChange={handleChange}
//                   color="primary"
//                   name="accountEnabled"
//                   label="Account Enable"
//                   inputProps={{ 'aria-label': 'primary checkbox' }}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <FormControl className="mt-8 mb-16" required fullWidth>
//               <Switch
//                   checked={userForm.accountExpired}
//                   onChange={handleChange}
//                   color="primary"
//                   name="accountExpired"
//                   label="Account Enable"
//                   inputProps={{ 'aria-label': 'primary checkbox' }}
//                 />
//               </FormControl>
//             </Grid>
//           </Grid> */}
//         </div>
//       </DialogContent>
//       <DialogActions className="justify-end pl-8 sm:pl-16">
//         <GenericButton
//           variant="contained"
//           color="primary"
//           className="saveButtonStyle"
//           onClick={() => props.addNewUser(userForm)}
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
