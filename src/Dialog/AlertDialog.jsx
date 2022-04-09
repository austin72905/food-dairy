import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function AlertDialog(props) {
    const { snackBarOpen, handleSnackBarClose } = props
    return (
        <Snackbar open={snackBarOpen} autoHideDuration={2000} onClose={handleSnackBarClose}>
            <Alert severity="info" sx={{ width: '100%' }} onClose={handleSnackBarClose}>
                didn't select items
            </Alert>
        </Snackbar>
    )
}
