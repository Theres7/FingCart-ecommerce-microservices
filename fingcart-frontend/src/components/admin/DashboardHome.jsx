import { Box, Typography } from '@mui/material'
import React from 'react'

function DashboardHome() {
  return (
    <>
        <Box
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Admin Dashboard
        </Typography>

        <Typography variant="body1">
          Select a menu item from the sidebar to manage products, orders, or customers.
        </Typography>
      </Box>
    </>
  )
}

export default DashboardHome