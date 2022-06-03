import React, { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

interface Props {
  columns: Array<string>;
  rows: Array<object>;
}

function ResultsTable({ columns, rows }: Props) {
  const [pageSize, setPageSize] = useState<number>(100);
  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };
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
    <div style={{ height: 400, width: '100%', marginBottom: '100px' }}>
      <DataGrid
        rows={rows}
        columns={columnDefs}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        rowsPerPageOptions={[10, 20, 50, 75, 100]}
        checkboxSelection={false}
        pagination
      />
    </div>
  );
}

export default ResultsTable;
