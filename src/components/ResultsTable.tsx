import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

interface Props {
  columns: Array<string>;
  rows: Array<object>;
}

function ResultsTable({ columns, rows }: Props) {
  const columnDefs: GridColDef[] = [];
  columns.map((column) => {
    columnDefs.push({
      field: column,
      headerName: column.toUpperCase(),
      // type: typeof firstRow[column as keyof typeof firstRow],
      // width: 100,
      sortable: true,
      valueGetter: (params: GridValueGetterParams) => {
        return typeof params.row[column] === 'object'
          ? JSON.stringify(params.row[column])
          : params.row[column];
      },
    });
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columnDefs}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
      />
    </div>
  );
}

export default ResultsTable;
