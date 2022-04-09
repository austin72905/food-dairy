import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'

export default function TopAppBar() {
    return (
        <AppBar position='fixed' color="primary" sx={{ zIndex: 1305 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{ mr: 2, color: "white" }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography sx={{ mr: 2, width: 200, color: "white" }} component="div" variant="h6">Food Dairy</Typography>
            </Toolbar>
        </AppBar>
    )
}
