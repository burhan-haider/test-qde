import React, { useState, useEffect, useCallback } from "react";
import {
  makeStyles,
  Typography,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@material-ui/core";
import {
  GenericButton,
  GenericDialog,
  RTSGenericDatatable
} from "@application";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RTSCommentForm from "./RTSCommentForm";
import RTSUserDataTable from "./RTSUserDataTable";
import RTSAttachEvidenceForm from "./RTSAttachEvidenceForm";
const useStyles = makeStyles(_theme => ({
  root: {
    "& .MuiAccordion-root.Mui-expanded": {
      margin: "0px"
    },
    "& .MuiAccordionSummary-content.Mui-expanded ": {
      margin: "0px"
    },
    backgroundColor: "#003463"
  },
  muiButton: {
    textTransform: "initial",
    marginRight: "1%",
    borderRadius: "15px",
    borderColor: "#052a4f",
    padding: "2px 2.5% 2px 2.5%",
    "&:hover": {
      backgroundColor: "#052a4f",
      color: "white"
    }
  },

  muiTableOutline: {
    border: "#186fe4"
  },
  muiBody: {
    align: "center"
  },

  typographyH: {
    // backgroundColor: "#003463",
    color: "white",
    marginRight: "1%"
  }
}));
function RTScannningData(props) {
  const [wholeData, setWholeData] = useState();
  const [dataSelected, setDataSelected] = useState([]);
  // console.log("Data selected =", dataSelected);
  const [action, setAction] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [property, setProperty] = useState({});
  const [commentData, setCommentData] = useState({});
  const [rtURResponse, setURResponse] = useState();
  const [scanListObject, setScanListObject] = useState({});

  const [eachRecord, setEachRecord] = useState([]);

  const selectionIndex = "all";
  const classes = useStyles();
  useEffect(() => {
    if (props.data !== undefined) {
      props.data.then(response => {
        setWholeData(response);
      });
    }
  }, [props.data]);

  useEffect(() => {
    if (rtURResponse !== undefined) {
      let uniqueElement = {};
      let scanObjList = {};
      const ResultedRecords = rtURResponse["ReportData"]["ResultedRecords"];
      if (ResultedRecords !== null && ResultedRecords.length > 0) {
        for (var i = 0; i < ResultedRecords.length; i++) {
          let scanObject = ResultedRecords[i];
          if (!uniqueElement[scanObject["sourceInfo"]]) {
            uniqueElement[scanObject["sourceInfo"]] = true;
            scanObjList[scanObject["sourceInfo"]] = [];
          }
          scanObjList[scanObject["sourceInfo"]].push([
            scanObject["listId"],
            scanObject["listName"] === "Customer^N"
              ? scanObject["listName"].slice(0, 8)
              : scanObject["listName"].slice(0, 11),
            scanObject["rank"].slice(0, 2),
            scanObject["matchedInfo"],
            scanObject["matchDate"],
            scanObject["uniqueNumber"]
            //scanObject["status"]
          ]);
        }
      }
      setScanListObject(scanObjList);
    }
  }, [rtURResponse]);

  const handleClickAttachEvidence = useCallback(() => {
    if (dataSelected.length > 0) {
      setOpenModal(true);
    } else {
      alert("Select a record");
    }
  }, [dataSelected]);
  const handleClickRefresh = () => {};
  const handleClickTrueAndFalseMatch = useCallback(() => {
    if (dataSelected.length > 0) {
      setCommentData(dataSelected);
      setOpenModal(true);
    } else {
      alert("Please check Atleast One Checkbox");
    }
  }, [dataSelected]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const displayContent = data => {
    setProperty(modalData[data]);
  };

  const date = new Date();
  const getDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const getMonth =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const getYear = date.getFullYear();

  const currentDateAndTime =
    getDate +
    "-" +
    getMonth +
    "-" +
    getYear +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getMilliseconds();
  const currentDate = getDate + "-" + getMonth + "-" + getYear;

  const constructTable = useCallback(() => {
    let resultedRecordsRTS = {};
    let FileName = "";
    let FileImport = "";
    const LoggedUser = wholeData["LOGGEDUSER"]["username"];
    if (rtURResponse !== undefined) {
      resultedRecordsRTS = rtURResponse["ReportData"]["ResultedRecords"];
      FileName = rtURResponse["ReportData"]["FileName"];
      FileImport = rtURResponse["ReportData"]["FileImport"];
    } else {
      resultedRecordsRTS = wholeData["REPORTDATA"]["ResultedRecords"];
      FileName = wholeData["REPORTDATA"]["FileName"];
      FileImport = wholeData["REPORTDATA"]["FileImport"];
    }

    let uniqueNameElm = {};
    if (resultedRecordsRTS !== null && resultedRecordsRTS.length > 0) {
      for (var i = 0; i < resultedRecordsRTS.length; i++) {
        let scanObj = resultedRecordsRTS[i];
        if (!uniqueNameElm[scanObj["sourceInfo"]]) {
          uniqueNameElm[scanObj["sourceInfo"]] = true;
          scanListObject[scanObj["sourceInfo"]] = [];
        }
        scanListObject[scanObj["sourceInfo"]].push([
          scanObj["listId"],
          scanObj["listName"] === "Customer^N"
            ? scanObj["listName"].slice(0, 8)
            : scanObj["listName"].slice(0, 11),
          scanObj["rank"].slice(0, 2),
          scanObj["matchedInfo"],
          scanObj["matchDate"],
          scanObj["uniqueNumber"],
          scanObj["status"]
        ]);
      }
    }
    const headers = [
      "app.common.LISTID",
      "app.common.LISTNAME",
      "app.common.MATCHSCORE",
      "app.common.MATCHEDVALUE",
      "app.common.MATCHDATE",
      "app.common.UNIQUENUMBER",
      "app.common.STATUS"
    ];
    return (
      <div className={classes.muiTableOutline}>
        <RTSUserDataTable data={wholeData} />
        <br></br>
        <Accordion defaultExpanded>
          <AccordionSummary
            classes={{
              root: classes.root,
              expanded: classes.expanedPanel
            }}
            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
            aria-controls="scanResult"
            id="scanResult"
          >
            <Typography className={classes.typographyH}>
              Real Time Scanning Result
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              {Object.keys(scanListObject).map((scanListObjectKey, index) => {
                return (
                  <Grid item xs={12} key={index}>
                    <RTSGenericDatatable
                      moduleName={
                        scanListObjectKey.split("$" || "^")[0].split("~")[1]
                      }
                      dataSet={{
                        DATA: scanListObject[scanListObjectKey],
                        HEADER: headers
                      }}
                      infoEnabled={false}
                      isSelection={true}
                      isMultipleSelect={true}
                      selectionIndex={selectionIndex}
                      selected={dataSelected}
                      selectHandler={setDataSelected}
                      currentDateAndTime={currentDateAndTime}
                      currentDate={currentDate}
                      index={index}
                      fileName={FileName}
                      userData={wholeData}
                      fileImport={FileImport}
                      userCode={LoggedUser}
                      eachRecord={setEachRecord}
                    ></RTSGenericDatatable>
                  </Grid>
                );
              })}

              <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                  <GenericButton
                    variant="outlined"
                    size="small"
                    type="submit"
                    className={classes.muiButton}
                    onClick={e => {
                      handleClickTrueAndFalseMatch();
                      setAction("Approve");
                      displayContent("approveReject");
                    }}
                  >
                    True Match
                  </GenericButton>
                </Grid>
                <Grid item xs={2}>
                  <GenericButton
                    variant="outlined"
                    size="small"
                    type="submit"
                    className={classes.muiButton}
                    onClick={e => {
                      handleClickTrueAndFalseMatch();
                      setAction("Reject");
                      displayContent("approveReject");
                    }}
                  >
                    False Match
                  </GenericButton>
                </Grid>
                <Grid item xs={2}>
                  <GenericButton
                    variant="outlined"
                    size="small"
                    className={classes.muiButton}
                    type="submit"
                    onClick={e => {
                      setAction("AttachEvidence");
                      handleClickAttachEvidence();
                      displayContent("attachEvidence");
                    }}
                  >
                    Attach Evidence
                  </GenericButton>
                </Grid>
                <Grid item xs={2}>
                  <GenericButton
                    variant="outlined"
                    size="small"
                    type="submit"
                    className={classes.muiButton}
                    onClick={e => {
                      setAction("Refresh");
                      handleClickRefresh();
                    }}
                  >
                    Refresh
                  </GenericButton>
                </Grid>
                <Grid item xs={2}></Grid>
                {action === "Approve" || action === "Reject" ? (
                  <GenericDialog
                    state={openModal}
                    property={property}
                    closeModal={handleCloseModal}
                    displayContent={displayContent}
                  >
                    <RTSCommentForm
                      closeModal={handleCloseModal}
                      selectedRecord={dataSelected}
                      commentData={commentData}
                      setURResponse={setURResponse}
                      action={action}
                      fileImport={FileImport}
                      fileName={FileName}
                      LoggedUser={LoggedUser}
                      selectHandler={setDataSelected}
                    ></RTSCommentForm>
                  </GenericDialog>
                ) : action === "AttachEvidence" ? (
                  <GenericDialog
                    state={openModal}
                    property={property}
                    closeModal={handleCloseModal}
                    displayContent={displayContent}
                  >
                    <RTSAttachEvidenceForm />
                  </GenericDialog>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }, [
    action,
    classes.expanedPanel,
    classes.muiButton,
    classes.muiTableOutline,
    classes.root,
    classes.typographyH,
    commentData,
    currentDate,
    currentDateAndTime,
    dataSelected,
    displayContent,
    handleClickAttachEvidence,
    handleClickTrueAndFalseMatch,
    openModal,
    property,
    rtURResponse,
    scanListObject,
    wholeData
  ]);

  const modalData = {
    approveReject: {
      title: "Real Time File Scanning",
      size: "md"
    },
    attachEvidence: {
      title: "View/Attach Evidence",
      size: "lg"
    }
  };

  return (
    <div>
      {wholeData ? (
        constructTable()
      ) : (
        <div>
          <Typography>No Data Found</Typography>
        </div>
      )}
    </div>
  );
}
export default RTScannningData;