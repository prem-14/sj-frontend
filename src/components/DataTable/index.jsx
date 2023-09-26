import React, { useEffect, useState } from 'react'
import './index.css'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/system'
import CustomColumns from './CustomColumns'
import { useDispatch } from 'react-redux'
import CustomToolbar from './CustomToolbar'
import TableSkeleton from '../Skeletons/TableSkeleton'

const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
  backgroundColor: theme.palette.background.alt,
  fontSize: 'unset',
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.background.variation,
  },
  '& .MuiTablePagination-toolbar': {
    fontSize: '1.3rem',
  },
  '& .MuiTablePagination-displayedRows': {
    fontSize: 'unset',
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
  '& .MuiDataGrid-booleanCell': {
    height: '2em',
    width: '2em',
  },
}))

const DataGridWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  '& .MuiDataGrid-selectedRowCount': {
    visibility: 'visible !important',
    width: 'unset',
    height: 'unset',
  },
}))

const DataTable = (props) => {
  const [selected, setSelected] = useState([])
  const dispatch = useDispatch()
  const formik = props.formik
  const tableActions = props.tableActions
  const tableColumns = props.tableColumns
  const tableData = props.tableData
  const paginationChange = props.paginationChange

  useEffect(() => {
    if (props.isSuccess) {
      setSelected([])
    }
  }, [props.isSuccess])

  const handleRowSelect = (ids) => {
    setSelected(ids)
  }

  const handlePageSizeChange = (newPageSize) => {
    formik.values.limit = newPageSize
    formik.values.page = 1
    // formik.setFieldValue('limit', newPageSize)
    // formik.setFieldValue('page', 1)
    dispatch(paginationChange(formik.values))
  }

  const handlePageChange = (newPage) => {
    formik.values.page = newPage + 1
    dispatch(paginationChange(formik.values))
  }

  return (
    <>
      {props.isLoading ? (
        <TableSkeleton />
      ) : (
        <Box sx={{ height: 500, maxHeight: 600, width: '100%', marginTop: '1rem' }}>
          <DataGridWrapper>
            <CustomDataGrid
              disableVirtualization
              paginationMode='server'
              rows={tableData}
              columns={CustomColumns(tableColumns)}
              autoHeight={tableData.length > 5 ? false : true}
              rowHeight={tableColumns.find((d) => d.type === 'imagewithurl') ? 70 : 50}
              checkboxSelection={tableActions?.length > 0}
              components={{
                Toolbar: () => <CustomToolbar selected={selected} tableActions={tableActions} />,
              }}
              disableSelectionOnClick={true}
              hideFooterSelectedRowCount={true}
              onSelectionModelChange={handleRowSelect}
              rowSelectionModel={selected}
              // onCellClick={handleOnCellClick}
              pagination
              rowsPerPageOptions={
                [5, 20, 40, 60].includes(formik.values.limit) ? [5, 20, 40, 60] : [formik.values.limit, 5, 20, 40, 60]
              }
              rowCount={parseInt(props.totalRecords)}
              pageSize={formik.values.limit}
              onPageSizeChange={handlePageSizeChange}
              page={formik.values.page - 1}
              onPageChange={handlePageChange}
              getRowId={(row) => row[props.uniqueId] || row['id']}
            />
          </DataGridWrapper>
        </Box>
      )}
    </>
  )
}

export default DataTable
