import React from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

function DashboardTable({tableData, columns}) {
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <Paper style={{ height: 400, width: '100%' }}>
         <DataGrid
        rows={tableData}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
      </Paper>
    </>
  )
}

export default DashboardTable;