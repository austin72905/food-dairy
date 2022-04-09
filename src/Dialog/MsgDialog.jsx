import React ,{useEffect,useState}from 'react'
import { styled, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ButtonGroup, AppBar, Toolbar, Container, IconButton, Typography, TextField, Box, Button, Stack, List, ListItemButton, ListItemText, Accordion, AccordionSummary, AccordionDetails, Card, CardMedia, Rating } from '@mui/material'
export default function MsgDialog(props) {

    const {checkDelete,msgDialogOpen,selectedItem,deleteRestaurant,setSelectedItem}=props
    
    const confirmDelte=()=>{
        deleteRestaurant()
        checkDelete()
        setSelectedItem([])
    }

    return (
        <Dialog
            open={msgDialogOpen}
            fullWidth={true}
            maxWidth="xs"
        >
            <DialogTitle >
                Message
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    是否刪除所選取的{selectedItem.length}個項目?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={confirmDelte}>確定</Button>
                <Button variant="outlined" onClick={()=>checkDelete(false)}>取消</Button>
            </DialogActions>
        </Dialog>
    )
}
