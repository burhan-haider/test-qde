// //Created by Vivek - 18.04.2020
// import React from "react";
// import PropTypes from "prop-types";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import TableSortLabel from "@material-ui/core/TableSortLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import { makeStyles } from "@material-ui/core/styles";
// import { Typography } from "@material-ui/core";

// const useStyles = makeStyles(theme => ({
//   visuallyHidden: {
//     border: 0,
//     clip: "rect(0 0 0 0)",
//     height: 1,
//     margin: -1,
//     overflow: "hidden",
//     padding: 0,
//     position: "absolute",
//     top: 20,
//     width: 1
//   },
//   headerLabels: {
//     fontFamily: "inherit",
//     fontSize: "14px",
//     fontWeight: "bold",
//     color: "#353535"
//   },
//   tableHead: {
//     backgroundColor: "#f4f5fa"
//   },
//   // VIVEK - CHECKBOX
//   checkboxRoot: {
//     color: "#052a4f",
//     "&$checked": {
//       color: "#052a4f"
//     }
//   },
//   checked: {}
// }));

// function GenericTableHead(props) {
//   const {
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//     onRequestSort,
//     headers,
//     isSelection,
//     isMultipleSelect
//   } = props;
//   const classes = useStyles();
//   const createSortHandler = property => event => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead className={classes.tableHead}>
//       <TableRow>
//         <TableCell padding="checkbox">
//           {isSelection === true ? (
//             isMultipleSelect === true ? (
//               <Checkbox
//                 indeterminate={numSelected > 0 && numSelected < rowCount}
//                 checked={rowCount > 0 && numSelected === rowCount}
//                 onChange={onSelectAllClick}
//                 size="small"
//                 color="default"
//                 classes={{
//                   root: classes.checkboxRoot,
//                   checked: classes.checked
//                 }}
//               />
//             ) : null
//           ) : null}
//         </TableCell>
//         {headers.map(headCell => (
//           <TableCell
//             id={headCell.id}
//             key={headCell.id}
//             align={headCell.numeric ? "left" : "left"}
//             padding={headCell.disablePadding ? "none" : "default"}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               <Typography className={classes.headerLabels}>
//                 {headCell.label}
//               </Typography>
//               {orderBy === headCell.id ? (
//                 <span className={classes.visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </span>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// GenericTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
//   headers: PropTypes.array.isRequired
// };

// export default GenericTableHead;
