//Created by Vivek - 14.04.2020
import React, { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider
} from "@mui/material/styles";
import { useClasses } from '@application'
import {
  Table,
  TableContainer,
  TablePagination,
  Paper,
  Grid
} from "@mui/material";
import commonService from "services/common/commonService";
import RTSGenericTableHead from "./RTSGenericTableHead";
import RTSGenericTableTopbar from "./RTSGenericTableTopbar";
import RTSGenericTableBody from "./RTSGenericTableBody";
import RTSGenericPaginationActions from "./RTSGenericPaginationActions";
import HyperlinkModalContentConfig from "../hyperlinks/HyperlinkModalContentConfig";
import masterModuleHyperlinks from "../hyperlinks/MasterModuleHyperlinks";
import GenericDialog from "../dialog/GenericDialog";
import _ from "lodash";

import ActionRegistry from "components/common/modules/actionregistry";

const styles = theme => ({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 400
  },
  paper: {
    width: "100%",
    borderRadius: 15,
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tablePaginationRoot: {
    "& .MuiTablePagination-input": {
      minWidth: "50px",
      borderRadius: "10px",
      fontFamily: "inherit",
      fontSize: "inherit",
      border: "solid 1px #052a4f",
      color: "#353535",
      marginRight: "15px"
    },
    "& .MuiTablePagination-caption": {
      fontFamily: "inherit",
      fontSize: "inherit",
      color: "#353535"
    }
  }
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#353535",
      secondary: "#494949"
    }
  }
});

function RTSGenericDatatable(props) {
  const classes = useClasses(styles);
  const [isDatatableShown, setIsDatatableShown] = useState(true);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  //const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  // VIVEK - using resettedData only for filtering the fields based on resetted columns data
  const [resettedData, setResettedData] = useState([]);
  const completeHeader = props.dataSet.HEADER ? props.dataSet.HEADER : [];
  const completeData = props.dataSet.DATA ? props.dataSet.DATA : [];
  const actionButtons = props.dataSet.ACTIONBUTTONS
    ? props.dataSet.ACTIONBUTTONS
    : [];
  // const matchedData = props.matchedData.MATCHDATA;
  const selectionIndex = props.selectionIndex ? props.selectionIndex : "all";
  const isSelection = props.isSelection ? props.isSelection : false;
  const isMultipleSelect = props.isMultipleSelect;
  const selected = props.selected ? props.selected : [];
  const { BottomContainer, selectHandler, eachRecord } = props;

  const hyperlinksMap = masterModuleHyperlinks.getAllHyperlinksData();
  const [allHeadCells, setAllHeadCells] = useState([]);
  const [resetColumnHeaders, setResetColumnHeaders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [property, setProperty] = useState({});
  const [hyperlinkContent, setHyperlinkContent] = useState({});
  const [resetColumns, setResetColumns] = useState([]);
  const [rowComponentView, setRowComponentView] = useState([]);
  // const [selectedPage, setSelectedPage] = useState(false);
  //console.log("VIVEK------");
  // VIVEK - setting rows data
  useEffect(() => {
    //console.log("useEffect 1");
    setRows(completeData);
    setResettedData(completeData);
  }, [completeData]);

  useEffect(() => {
    //console.log("useEffect 2");
    const intermediateAllHeadCells = [];
    const intermediateResetColumnHeaders = [];
    for (var i = 0; i < completeHeader.length; i++) {
      intermediateAllHeadCells.push({
        id: completeHeader[i],
        disablePadding: false,
        label: commonService.getLabel(completeHeader[i], completeHeader[i]),
        hyperlink: hyperlinksMap.has(completeHeader[i]),
        hyperlinkFunction: hyperlinksMap.has(completeHeader[i])
          ? hyperlinksMap.get(completeHeader[i])["function"]
          : "",
        hyperlinkTitle: hyperlinksMap.has(completeHeader[i])
          ? hyperlinksMap.get(completeHeader[i])["title"]
          : "",
        hyperlinkDetailsModule: hyperlinksMap.has(completeHeader[i])
          ? hyperlinksMap.get(completeHeader[i])["detailsModule"]
          : ""
      });

      intermediateResetColumnHeaders.push(
        i +
          "~!!~" +
          completeHeader[i] +
          "~!!~" +
          commonService.getLabel(completeHeader[i], completeHeader[i])
      );
    }
    setAllHeadCells(intermediateAllHeadCells);
    setResetColumnHeaders(intermediateResetColumnHeaders);
  }, [completeHeader, hyperlinksMap]);
  useEffect(() => {
    //console.log("useEffect 3");
    setHeaders(allHeadCells);
  }, [allHeadCells]);

  useEffect(() => {
    //console.log("useEffect 4");
    if (resetColumns.length === 0) {
      setHeaders(allHeadCells);
      setRows(completeData);
      setResettedData(completeData);
    } else {
      var updatedHeaderList = allHeadCells;
      var updatedDataList = completeData;
      resetColumns.filter(eachItem => {
        let mainIndex = "";
        updatedHeaderList.filter((eachHeader, eachIndex) => {
          return eachHeader.id === eachItem ? (mainIndex = eachIndex) : "";
        });

        if (mainIndex !== "") {
          updatedHeaderList = removeItem(updatedHeaderList, mainIndex);
          setHeaders(updatedHeaderList);

          updatedDataList = updatedDataList.map(eachRow => {
            return removeItem(eachRow, mainIndex);
          });
          setRows(updatedDataList);
          setResettedData(updatedDataList);
        }
      });
    }
  }, [allHeadCells, completeData, resetColumns]);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const displayProperty = data => {
    setProperty(data.modalData);
    setHyperlinkContent(data);
  };

  const handleRequestSort = (event, requestedProperty) => {
    const isAsc = orderBy === requestedProperty && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(requestedProperty);
  };

  // VIVEK - 22.05.2020 - selection logic revamped
  const handleSelectAllClick = event => {
    if (event.target.checked) {
      // VIVEK - rows.map is for selecting the whole table data
      // const newSelecteds = rows.map((n) => n[selectionIndex]);
      const currentPageRows = _.chunk(rows, rowsPerPage)[page];
      const splits = selectionIndex.split(",");
      const newSelecteds = currentPageRows.map(n => {
        let customArray = [];
        if (splits.includes("all")) {
          customArray = n;
        } else {
          splits.filter(each => (customArray = [...customArray, n[each]]));
        }
        return customArray;
      });
      selectHandler(newSelecteds);
      return;
    }
    selectHandler([]);
  };

  const handleClick = (event, selectedRow) => {
    const selectedArray = selected.filter(elm => elm[0] === selectedRow[0]);
    let newSelected = [];
    if (selectedArray.length === 0) {
      newSelected = [...selected, selectedRow];
    } else {
      newSelected = selected.filter(elm => elm[0] !== selectedRow[0]);
    }
    selectHandler(newSelected);
    //setrecordSelection(selectHandler);
  };
  //console.log("VIVEK - selected = ", selected);

  const handleRadioClick = (event, selectedRow) => {
    selectHandler(selectedRow);
  };

  const handleChangePage = (event, newPage) => {
    setPage(Number(newPage - 1));
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // VIVEK - datatable filter
  const filterData = event => {
    var updatedDataList = resettedData;
    updatedDataList = updatedDataList.filter(eachRow => {
      return eachRow.some(x => {
        return x !== null
          ? x.toLowerCase().search(event.target.value.toLowerCase()) !== -1
          : false;
      });
    });
    setRows(updatedDataList);
    // VIVEK - updating pagination after filtering to remove the page count exception
    setPage(0);
  };

  // VIVEK - reset columns
  const handleResetChange = event => {
    setResetColumns(event.target.value);
  };

  const removeItem = (items, i) => {
    const index = Number(i);
    return items.slice(0, index).concat(items.slice(index + 1, items.length));
  };

  const changeComponentView = row => {
    setIsDatatableShown(!isDatatableShown);
    if (row !== null) {
      setRowComponentView(row);
    }
  };

  // const deligateAction = actionCode => {
  //   ActionRegistry.generateAction(actionCode);
  // };

  function getHyperlinkDetails(index) {
    if (headers[index]) {
      return (
        headers[index].hyperlink +
        "~^^~" +
        headers[index].hyperlinkFunction +
        "~^^~" +
        headers[index].hyperlinkTitle +
        "~^^~" +
        headers[index].hyperlinkDetailsModule
      );
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        {isDatatableShown ? (
          //VIVEK - GenericDatatable part started
          <Paper className={classes.paper}>
            {/* VIVEK - TOPBAR PART */}
            <RTSGenericTableTopbar
              moduleName={props.moduleName}
              filterData={filterData}
              handleResetChange={handleResetChange}
              resetColumns={resetColumns}
              resetColumnHeaders={resetColumnHeaders}
              currentDateAndTime={props.currentDateAndTime}
              currentDate={props.currentDate}
              loggedUser={props.userCode}
              fileName={props.fileName}
              fileImport={props.fileImport}
              selected={selected}
              // selectHandler={props.setDataSelected}
              moduleIndex={props.index}
              userInputData={props.userData}
              completeData={completeData}
              completeHeader={completeHeader}
              rows={rows}
              headers={headers}
            />
            <TableContainer className={classes.container}>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size="small"
                aria-label="generic table"
              >
                {/* VIVEK - HEADER PART */}

                <RTSGenericTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  //rowCount={rows.length}
                  rowCount={
                    rows.length < rowsPerPage ? rows.length : rowsPerPage
                  }
                  headers={headers}
                  isSelection={isSelection}
                  isMultipleSelect={isMultipleSelect}
                />
                {/* VIVEK - BODY PART */}
                <RTSGenericTableBody
                  headers={headers}
                  rows={rows}
                  order={order}
                  orderBy={orderBy}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  selected={selected}
                  handleClick={handleClick}
                  getHyperlinkDetails={getHyperlinkDetails}
                  openModal={handleClickOpenModal}
                  displayProperty={displayProperty}
                  changeComponentView={changeComponentView}
                  infoEnabled={props.infoEnabled}
                  isSelection={isSelection}
                  selectionIndex={selectionIndex}
                  isMultipleSelect={isMultipleSelect}
                  handleRadioClick={handleRadioClick}

                  //rtURResponse={props.rtURResponse}
                />
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 50]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              // selectedPage={selectedPage}
              page={page}
              // selected={setSelectedPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={RTSGenericPaginationActions}
              classes={{
                root: classes.tablePaginationRoot
              }}
            />

            <Grid item xs={12}>
              <Grid
                container
                alignItems="flex-start"
                justify="flex-end"
                direction="row"
                style={{ marginRight: 15, marginBottom: 10 }}
              >
                {actionButtons
                  ? actionButtons.map(actions =>
                      actions != null
                        ? Object.entries(actions).map((key, value) => {
                            return (
                              <ActionRegistry
                                action={{
                                  actionCode: key[0],
                                  actionName: key[1]
                                }}
                                color="primary"
                                variant="outlined"
                                key={value}
                                data={selected}
                                marginStyle={{ margin: 10 }}
                                reloadData={props.reloadData}
                                inputParams={props.inputParams}
                              />
                            );
                          })
                        : null
                    )
                  : null}
              </Grid>
            </Grid>
          </Paper>
        ) : (
          //VIVEK - GenericDetailsBottomContainer part started
          <BottomContainer
            moduleName={props.moduleName}
            headers={headers}
            row={rowComponentView}
            changeComponentView={changeComponentView}
            bottomAction={actionButtons}
          />
        )}
        <GenericDialog
          closeModal={handleCloseModal}
          state={openModal}
          property={property}
          // selectHandler={selectHandler}
        >
          <HyperlinkModalContentConfig
            data={hyperlinkContent}
            closeModal={handleCloseModal}
          />
        </GenericDialog>
      </div>
    </ThemeProvider>
  );
}

export default RTSGenericDatatable;
