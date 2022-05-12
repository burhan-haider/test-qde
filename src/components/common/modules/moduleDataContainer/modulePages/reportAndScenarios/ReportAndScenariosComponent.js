import React, { useState } from "react";
import { GenericDatatable } from "@application";
import ReportAndScenariosBottomContainer from "./ReportAndScenariosBottomContainer";

function ReportAndScenariosComponent(props) {
  const selectionIndex = "all";

  const [dataSelected, setDataSelected] = useState([]);

  return (
    <div className="px-12">
      <GenericDatatable
        dataSet={props.indexPageData}
        //moduleName="IBA Alerts"
        moduleName={props.indexPageData.MODULENAME}
        isSelection={false}
        isMultipleSelect={false}
        selectionIndex={selectionIndex}
        infoEnabled={true}
        BottomContainer={ReportAndScenariosBottomContainer}
        selected={dataSelected}
        selectHandler={setDataSelected}
      />
    </div>
  );
}
export default ReportAndScenariosComponent;
