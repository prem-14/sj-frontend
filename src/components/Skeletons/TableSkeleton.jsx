import * as React from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { styled } from '@mui/system'
import { useMediaQuery, useTheme } from '@mui/material'

const SkeletonWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  width: '100%',
  background: theme.palette.background.alt,
  margin: 'auto',
  borderRadius: '10px',
  marginTop: '20px',
}))

const SkeletonHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: 80,
  justifyContent: 'space-around',
  alignItems: 'center',
  background: theme.palette.background.variation,
  gap: '10px',
}))

const SkeletonRow = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: 80,
  gap: '10px',
}))

export default function TableSkeleton() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('tablet'))
  const columnCount = matches ? 3 : 6
  const rowCount = 6

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <SkeletonWrapper>
        {/* Header Row */}
        <SkeletonHeader>
          {[...Array(columnCount)].map((_, index) =>
            index === 0 ? (
              <Skeleton key={index} variant='text' width={30} height={40} /> // For checkbox
            ) : (
              <Skeleton key={index} variant='text' width={140} height={60} />
            )
          )}
        </SkeletonHeader>

        {/* Data Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {[...Array(rowCount)].map((_, index) => (
            <SkeletonRow key={index}>
              {[...Array(columnCount)].map((_, index) =>
                index === 0 ? (
                  <Skeleton variant='text' width={30} height={40} /> // For checkbox
                ) : (
                  <Skeleton variant='text' width={140} height={60} />
                )
              )}
            </SkeletonRow>
          ))}
        </div>
      </SkeletonWrapper>
    </Box>
  )
}
