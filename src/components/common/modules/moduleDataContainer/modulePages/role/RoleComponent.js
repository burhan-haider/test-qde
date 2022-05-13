// import React, { useState, useEffect } from "react";
// import Fab from "@mui/material/Fab";
// import AddIcon from "@material-ui/icons/Add";
// import { GenericDatatable } from "@application";
// import RoleCreationForm from "../role/RoleCreationForm";
// import Dialog from "@mui/material/Dialog";
// import { AppBar, Toolbar, Typography } from "@mui/material";
// import roleOperationService from "../../../../../services/role/RoleOperationService";

// function RoleComponent(props) {
//   const [open, setOpen] = React.useState(false);
//   const [dataSelected, setDataSelected] = useState([]);

//   const selectionIndex = "all";
//   //const selectionIndex = "0,1";

//   const openCreaeUserDialog = () => {
//     setOpen(true);
//   };
//   const closeCreaeUserDialog = () => {
//     setOpen(false);
//   };

//   function addNewRole(newRoleDetails) {
//     roleOperationService
//       .createNewRole("/role/", newRoleDetails)
//       .then(data => {
//         setOpen(false);
//         props.refreshCurrentModule();
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
//   return (
//     <div>
//       <GenericDatatable
//         dataSet={props.indexPageData}
//         isSelection={true}
//         isMultipleSelect={false}
//         selectionIndex={selectionIndex}
//         selected={dataSelected}
//         selectHandler={setDataSelected}
//       ></GenericDatatable>
//       <Fab color="primary" aria-label="add">
//         <AddIcon onClick={openCreaeUserDialog} />
//       </Fab>
//       {/*  /> */}

//       <Dialog
//         maxWidth="md"
//         fullWidth={true}
//         open={open}
//         onClose={closeCreaeUserDialog}
//         aria-labelledby="form-dialog-title"
//       >
//         <AppBar position="static" elevation={1} className="headerStyle">
//           <Toolbar className="flex w-full">
//             <Typography variant="subtitle1" color="inherit">
//               Add Role
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <RoleCreationForm
//           closeCreaeUserDialog={closeCreaeUserDialog}
//           addNewRole={addNewRole}
//         />
//       </Dialog>
//     </div>
//   );
// }

// export default RoleComponent;