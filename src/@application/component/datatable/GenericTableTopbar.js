// //Created by Vivek - 20.04.2020
// import React, { useState } from "react";
// import clsx from "clsx";
// import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
// import FormControl from "@material-ui/core/FormControl";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import Select from "@material-ui/core/Select";
// import Checkbox from "@material-ui/core/Checkbox";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import CsvDownloader from "react-csv-downloader";
// import ReactExport from "react-export-excel";
// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

// const useStyles = makeStyles(theme => ({
//   parentDiv: {
//     backgroundColor: "#f4f5fa",
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12
//   },
//   moduleNameDiv: {
//     maxHeight: "40px",
//     alignItems: "center",
//     color: "#353535",
//     marginTop: "10px"
//   },
//   textFieldRoot: {
//     width: "100%",
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         //borderColor: "#353535",
//         border: "solid 1px #3a3a3a"
//       },
//       "&:hover fieldset": {
//         border: "solid 2px #3a3a3a"
//       },
//       "&.Mui-focused fieldset": {
//         border: "solid 2px #3a3a3a"
//       }
//     }
//   },
//   textFieldInput: {
//     textAlign: "center"
//   },
//   MuiOutlinedInput: {
//     maxHeight: "36px",
//     borderRadius: "25px",
//     fontSize: "13px",
//     marginRight: "5px",
//     color: "#353535"
//   },
//   formControl: {
//     width: 50,
//     "& .MuiInput-formControl": {
//       marginTop: "8px"
//     },
//     "& .MuiInputLabel-formControl": {
//       fontSize: "0.75Rem"
//     },
//     "& .MuiSelect-iconOutlined": {
//       right: 0
//     }
//   },
//   // VIVEK - CHECKBOX
//   checkboxRoot: {
//     color: "#052a4f",
//     "&$checked": {
//       color: "#052a4f"
//     }
//   },
//   checked: {},
//   //
//   exportIcons: {
//     //margin: "auto",
//     //width: "20px",
//     //height: "20px",
//     maxWidth: "25px",
//     maxHeight: "25px",
//     marginRight: "10px",
//     cursor: "pointer"
//   }
// }));

// const resetItemsHeight = 30;
// const resetItemsPaddingTop = 5;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: resetItemsHeight * 10 + resetItemsPaddingTop,
//       width: 250
//     }
//   }
// };

// function GenericTableTopbar(props) {
//   const {
//     moduleName,
//     filterData,
//     handleResetChange,
//     resetColumns,
//     resetColumnHeaders,
//     rows,
//     headers
//   } = props;

//   //const exportIconsSet = require.context("../assets/icons", true);

//   const classes = useStyles();

//   const headerObject = headers.map((each, index) => {
//     return each.label;
//   });
//   const multiDataSet = [
//     {
//       columns: headerObject ? headerObject : [],
//       data: rows ? rows : []
//     }
//   ];

//   const generatePDF = () => {
//     const doc = new jsPDF("l");
//     doc.autoTable({
//       styles: {
//         fontSize: 7
//       },
//       head: [headerObject],
//       body: rows
//     });
//     //doc.setFontSize(16);
//     doc.save(`${moduleName}.pdf`);
//   };

//   return (
//     <div className={clsx("clearfix justify-start my-2 p-2", classes.parentDiv)}>
//       <div className={clsx("flex pl-6 float-left", classes.moduleNameDiv)}>
//         <Typography
//           variant="h6"
//           style={{ fontFamily: "inherit", fontSize: "16px" }}
//         >
//           {moduleName} Results
//         </Typography>
//       </div>
//       <div className="flex pr-6 items-center float-right">
//         <div className="flex mr-2">
//           <img
//             //src={exportIconsSet("./print_logo.png").default}
//             className={classes.exportIcons}
//             onClick={() => {
//               //window.print();
//             }}
//             alt="Print"
//           />
//           <img
//             //src={exportIconsSet("./pdf_logo.png").default}
//             className={classes.exportIcons}
//             onClick={generatePDF}
//             alt="PDF"
//           />
//           <ExcelFile
//             filename={moduleName}
//             fileExtension="xlsx"
//             //hideElement={true}
//             element={
//               <img
//                 //src={exportIconsSet("./excel_logo.png").default}
//                 className={classes.exportIcons}
//                 alt="Excel"
//               />
//             }
//           >
//             <ExcelSheet
//               dataSet={multiDataSet ? multiDataSet : []}
//               name={moduleName}
//             ></ExcelSheet>
//           </ExcelFile>
//           <CsvDownloader
//             columns={headerObject}
//             datas={rows}
//             filename={moduleName + ".csv"}
//             separator={","}
//           >
//             <img
//               //src={exportIconsSet("./csv_logo.png").default}
//               className={classes.exportIcons}
//               alt="CSV"
//             />
//           </CsvDownloader>
//         </div>
//         <div>
//           <TextField
//             id="outlined-basic"
//             label="Filter"
//             variant="outlined"
//             type="search"
//             size="small"
//             onChange={filterData}
//             classes={{
//               root: classes.textFieldRoot,
//               label: classes.textFieldLabel
//             }}
//             InputProps={{
//               className: classes.MuiOutlinedInput
//             }}
//           />
//         </div>
//         <div>
//           <FormControl className={classes.formControl}>
//             <InputLabel id="demo-mutiple-checkbox-label">Reset</InputLabel>
//             <Select
//               labelId="demo-mutiple-checkbox-label"
//               id="demo-mutiple-checkbox"
//               multiple
//               value={resetColumns}
//               onChange={handleResetChange}
//               input={<Input />}
//               variant="outlined"
//               renderValue={selected => selected.length}
//               MenuProps={MenuProps}
//             >
//               {resetColumnHeaders.map(eachHeader => (
//                 <MenuItem
//                   key={eachHeader.split("~!!~")[0]}
//                   value={eachHeader.split("~!!~")[1]}
//                   disabled={
//                     ["0", "1"].includes(eachHeader.split("~!!~")[0])
//                       ? true
//                       : false
//                   }
//                 >
//                   <Checkbox
//                     checked={
//                       resetColumns.indexOf(eachHeader.split("~!!~")[1]) > -1
//                     }
//                     size="small"
//                     classes={{
//                       root: classes.checkboxRoot,
//                       checked: classes.checked
//                     }}
//                   />
//                   <ListItemText primary={eachHeader.split("~!!~")[2]} />
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GenericTableTopbar;
