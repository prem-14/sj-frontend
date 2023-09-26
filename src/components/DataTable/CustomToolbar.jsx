import React, { Fragment } from 'react'
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid'
import { Box, IconButton, Tooltip } from '@mui/material'
import { styled } from '@mui/system'

const CustomGridToolbarContainer = styled(GridToolbarContainer)(({ theme }) => ({
  fontSize: '1.3rem',
  '& .MuiButtonBase-root': {
    fontSize: 'unset',
  },
}))

function CustomToolbar({ selected, tableActions }) {
  return (
    <CustomGridToolbarContainer>
      {selected.length > 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: '0 10px',
            width: '100%',
          }}
        >
          <div>{selected.length} rows selected</div>
          <div>
            {tableActions.map((data, indexhead) => {
              return (
                <Fragment key={data.label}>
                  <Tooltip title={<div style={{ fontSize: '1.2rem' }}>{data.label}</div>}>
                    <IconButton
                      onClick={() => {
                        data.onclick(selected, data.type)
                      }}
                      aria-label={data.label}
                    >
                      {data.icon}
                    </IconButton>
                  </Tooltip>
                </Fragment>
              )
            })}
          </div>
        </Box>
      ) : (
        <Box sx={{ p: '0 10px' }}>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          {/* <GridToolbarExport /> */}
        </Box>
      )}
    </CustomGridToolbarContainer>
  )
}

export default CustomToolbar
