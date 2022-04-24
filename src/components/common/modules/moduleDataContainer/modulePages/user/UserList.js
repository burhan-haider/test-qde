// import React, { useState } from "react";
// import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";
// import GenericDatatable from "../../../../../../@application/datatable/GenericDatatable";
// import UserCreationForm from "./UserCreationForm";
// import Dialog from "@material-ui/core/Dialog";
// import Grid from "@material-ui/core/Grid";
// import { AppBar, Toolbar, Typography } from "@material-ui/core";
// import userOperationService from "../../../../../services/user/UserOperationService";

// export default function UserComponent(props) {
//   const [isDialogopen, setDialogOpen] = React.useState(false);

//   const openCreaeUserDialog = () => {
//     setDialogOpen(true);
//   };
//   const closeCreaeUserDialog = () => {
//     setDialogOpen(false);
//   };

//   function addNewUser(newUserDetails) {
//     userOperationService
//       .createNewUser("api/user/", newUserDetails)
//       .then(data => {
//         closeCreaeUserDialog();
//         props.refreshCurrentModule();
//       })
//       .catch(err => {
//         if (err.response) {
//           alert(err.response.data.message);
//         } else {
//           alert("Error");
//         }
//       });
//   }
//   const selectionIndex = "all";
//   const [rowData, setRowData] = useState([]);

//   return (
//     <div>
//       <Grid container>
//         <GenericDatatable
//           dataSet={props.indexPageData}
//           infoEnabled={false}
//           moduleName="User"
//           isSelection={true}
//           isMultipleSelect={false}
//           selectionIndex={selectionIndex}
//           selected={rowData}
//           selectHandler={setRowData}
//         ></GenericDatatable>
//       </Grid>
//       <Grid
//         style={{ padding: "2px  8px 10px 3px" }}
//         container
//         justify="flex-end"
//         direction="row"
//         spacing={3}
//       >
//         <Fab color="primary" aria-label="add">
//           <AddIcon onClick={openCreaeUserDialog} />
//         </Fab>
//       </Grid>
//       <Dialog
//         maxWidth="md"
//         fullWidth={true}
//         open={isDialogopen}
//         onClose={closeCreaeUserDialog}
//         aria-labelledby="form-dialog-title"
//       >
//         <AppBar position="static" elevation={1} className="headerStyle">
//           <Toolbar className="flex w-full">
//             <Typography variant="subtitle1" color="inherit">
//               Add User
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <UserCreationForm
//           closeCreaeUserDialog={closeCreaeUserDialog}
//           addNewUser={addNewUser}
//         />
//       </Dialog>
//     </div>
//   );
// }
