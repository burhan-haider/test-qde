import React, { useState, useEffect, useMemo } from "react";
import ReactDataGrid, { SelectColumn } from "react-data-grid";

const GenericDatagrid = (props) => {
  const [sortColumns, setSortColumns] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState(() => new Set());
  const [direction, setDirection] = useState("ltr");

  const { dataSet, utilColumn = false } = props;

  useEffect(() => {
    console.log("Props:-", dataSet);
    let tempColumns = [];
    let tempRows = [];

    if (utilColumn === "select") {
      tempColumns.push(SelectColumn);
    }

    dataSet.HEADER.forEach((header, index) => {
      tempColumns.push({
        key: header,
        name: header,
        resizable: true,
        sortable: true,
        filterable: true,
      });
    });
    dataSet.DATA.forEach((data, index) => {
      let tempData = data.map((dval) => {
        return dval === null ? "N.A" : dval;
      });
      console.log("Temp Data: ", tempData);
      tempRows.push(
        tempData.reduce(
          (item, col) => ({
            ...item,
            [dataSet.HEADER[data.indexOf(col)]]: col !== null ? col : "N.A",
          }),
          {}
        )
      );
    });

    console.log("tempRows", tempRows);
    console.log("tempColumns", tempColumns);

    setColumns(tempColumns);
    setRows(tempRows);
  }, [dataSet, utilColumn]);

  const rowKeyGetter = (row) => {
    return row.id || 0;
  };

  const summaryRows = useMemo(() => {
    const summaryRow = {
      id: "total_0",
      totalCount: rows.length,
      yesCount: rows.filter((r) => r.available).length,
    };
    return [summaryRow];
  }, [rows]);

  const getComparator = (sortColumn) => {
    return (a, b) => {
      return a[sortColumn].localeCompare(b[sortColumn]);
    };
  };

  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, sortColumns]);

  return (
    <ReactDataGrid
      rowKeyGetter={rowKeyGetter}
      columns={columns}
      rows={sortedRows}
      defaultColumnOptions={{
        sortable: true,
        resizable: true,
      }}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      onRowsChange={setRows}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
      summaryRows={summaryRows}
      className="fill-grid rdg-light"
      direction={direction}
    />
  );
};

export default GenericDatagrid;
