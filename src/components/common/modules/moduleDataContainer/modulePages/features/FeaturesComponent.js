import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import EditIcon from "@material-ui/icons/Edit";
import { GenericDatatable, GenericDialog } from "@application";
import FeaturesModules from "components/common/modules/moduleDataContainer/modulePages/features/FeaturesModules";
import * as MessageActions from "../../../../../../app/store/actions/message";

const useStyles = makeStyles(theme => ({
  root: {
    transform: "translateZ(0px)",
    flexGrow: 1
  },
  speedDialWrapper: {
    position: "relative",
    marginTop: theme.spacing(5),
    height: 40
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2)
    }
  },
  speedDialAction: {
    backgroundColor: "#d4d4d4"
  }
}));

function FeaturesComponent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [property, setProperty] = useState({});
  const [dataSelected, setDataSelected] = useState([]);
  const [actionType, setActionType] = useState("");
  //console.log(dataSelected);

  const selectionIndex = "all";
  //const selectionIndex = "0,1,3";

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const modalData = {
    createFeature: {
      title: "Create New Feature",
      size: "lg"
    },
    updateFeature: {
      title: "Update Feature",
      size: "lg"
    }
  };

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const displayProperty = data => {
    setProperty(modalData[data]);
  };

  return (
    <div className="px-12">
      <div>
        <GenericDatatable
          dataSet={props.indexPageData}
          moduleName="All Features"
          isSelection={true}
          isMultipleSelect={false}
          selectionIndex={selectionIndex}
          infoEnabled={false}
          selected={dataSelected}
          selectHandler={setDataSelected}
        />
      </div>
      <div className={classes.speedDialWrapper}>
        <SpeedDial
          ariaLabel="Features"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="left"
        >
          <SpeedDialAction
            key="updateFeature"
            className={classes.speedDialAction}
            icon={<EditIcon />}
            tooltipTitle="Update"
            tooltipPlacement="top"
            onClick={e => {
              if (dataSelected.length > 0) {
                setActionType("updateFeature");
                handleClickOpenModal();
                displayProperty("updateFeature");
              } else {
                dispatch(
                  MessageActions.showMessage({
                    message: "Please select any feature to continue",
                    variant: "warning"
                  })
                );
              }
            }}
          />
          <SpeedDialAction
            key="createFeature"
            className={classes.speedDialAction}
            icon={<SpeedDialIcon />}
            tooltipTitle="Create"
            tooltipPlacement="top"
            onClick={e => {
              setActionType("createFeature");
              handleClickOpenModal();
              displayProperty("createFeature");
            }}
          />
        </SpeedDial>
      </div>
      <GenericDialog
        closeModal={handleCloseModal}
        state={openModal}
        property={property}
      >
        <FeaturesModules
          closeModal={handleCloseModal}
          actionType={actionType}
          selectedFeature={actionType === "updateFeature" ? dataSelected : []}
        />
      </GenericDialog>
    </div>
  );
}

export default FeaturesComponent;
