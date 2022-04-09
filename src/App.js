import React, { useEffect, useState } from 'react'
import { styled, MenuItem, Snackbar, FormControl, InputLabel, OutlinedInput, Select, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ButtonGroup, AppBar, Toolbar, Container, IconButton, Typography, TextField, Box, Button, Stack, List, ListItemButton, ListItemText, Accordion, AccordionSummary, AccordionDetails, Card, CardMedia, Rating } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

import TopAppBar from './UtilBar/TopAppBar.jsx'
import SearchBar from './Search/SearchBar.jsx'
import EditDialog from './Dialog/EditDialog.jsx'
import MsgDialog from './Dialog/MsgDialog.jsx';
import AlertDialog from './Dialog/AlertDialog.jsx'
import Restaurants from './Restaurants/Restaurants.jsx'

import { reqGetRestaurantList, reqGetRestaurantKind, reqAddRestaurant, reqUpdateRestaurant, reqDeleteRestaurant, reqSearchRestaurants } from './api/foodApiService.js'

import axios from 'axios';
import { Base64 } from 'js-base64';
import { display } from '@mui/system';

export default function App() {

    const initData = {
        uniqueId: "",
        name: "",
        address: "",
        picture: "",
        rate: 0,
        date: new Date().toLocaleDateString(),
        kind: "",
        order: "",
        price: 0,
        bestDish: "",
        worseDish: "",
        comment: ""
    }

    const [loadingStatus, setLoadingStatus] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectMode, setSelectMode] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])
    const [msgDialogOpen, setMsgDialogOpen] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [kindList, setKindList] = useState([])

    const addNewRestaurant = () => {
        setDialogOpen(status => !status)
    }

    const checkDelete = (status) => {
        if (selectedItem.length === 0)
            setSnackBarOpen(true)
        else
            setMsgDialogOpen(status)
    }

    const handleSnackBarClose = () => {
        setSnackBarOpen(false)
    }

    const switchSelectMode = () => {

        setSelectMode(status => !status)
    }

    const updateSelectedItem = (uniqueId) => {
        if (selectedItem.includes(uniqueId))
            setSelectedItem(items => {
                //console.log("ditems=",items)
                items.forEach((item, index, arr) => {
                    if (item === uniqueId)
                        arr.splice(index, 1)
                })

                return items
            })
        else
            setSelectedItem(items => {
                //console.log("items=",items)
                items.push(uniqueId)
                return items
            })
    }

    //讓子組件監聽這個值
    const [restaurantListData, setRestaurantListData] = useState([])

    const [restaurantData, setRestaurantData] = useState(initData)

    const getRestaurantList = async () => {
        //const resp = await axios.get("http://localhost:19870/Food/GetRestaurantList")
        const resp = await reqGetRestaurantList()
        const result = resp.data
        console.log("result=", result)
        if (result.code === 1)
            setRestaurantListData(result.data)

    }

    const addRestaurant = async (restaurantInfo) => {
        setLoadingStatus(true)
        console.log("restaurantInfo", restaurantInfo)
        // //POST FORM 方法
        // const params = new URLSearchParams()
        // Object.keys(restaurantInfo).forEach((key) => {
        //     params.append(key, restaurantInfo[key])
        // })
        // const resp = await axios.post("http://localhost:19870/Food/AddRestaurant", params)
        const resp = await reqAddRestaurant(restaurantInfo)
        const result = resp.data
        getRestaurantList()
        getRestaurantKind()
    }

    const updateRestaurant = async (restaurantInfo) => {
        setLoadingStatus(true)
        // const params = new URLSearchParams()
        // Object.keys(restaurantInfo).forEach((key) => {
        //     params.append(key, restaurantInfo[key])
        // })
        // const resp = await axios.post("http://localhost:19870/Food/SaveRestaurant", params)
        const resp = await reqUpdateRestaurant(restaurantInfo)
        const result = resp.data
        getRestaurantList()
        getRestaurantKind()
    }

    const deleteRestaurant = async () => {
        setLoadingStatus(true)
        // const encryptedStr = selectedItem.join(",")

        // const postData = Base64.encode(encryptedStr)
        // const params = new URLSearchParams()
        // params.append("UniqueIdList", postData)
        // const resp = await axios.post("http://localhost:19870/Food/DeleteRestaurant", params)
        const resp = await reqDeleteRestaurant(selectedItem)
        const result = resp.data
        getRestaurantList()
        getRestaurantKind()
    }

    const updateDialogData = (restaurant) => {
        //console.log("restaurantData", restaurantData)
        //console.log("restaurant in updateDialogData", restaurant)
        setRestaurantData(restaurant)
    }

    const getRestaurantKind = async () => {
        //const resp = await axios.get("http://localhost:19870/Food/GetRestaurantKind")
        const resp = await reqGetRestaurantKind()
        const result = resp.data
        console.log("result", result)
        if (result.code == 1)
            setKindList(result.data)
    }

    const searchRestaurants = async (searchParams) => {
        setLoadingStatus(true)
        // console.log("searchParams", searchParams)
        // const params = new URLSearchParams()
        // params.append(searchParams.name, searchParams.keyWord)
        // if (searchParams.kind)
        //     params.append("kind", searchParams.kind)
        // const resp = await axios.get(`http://localhost:19870/Food/GetRestaurantList?${params}`)
        const resp = await reqSearchRestaurants(searchParams)
        const result = resp.data
        console.log("result", result)
        if (result.code == 1)
            setRestaurantListData(result.data)
    }

    //console.log("selectedItem ", selectedItem)
    useEffect(() => {
        getRestaurantKind()
    }, [])

    //關掉選擇模式時，消除已選選項
    useEffect(() => {
        if (!selectMode) {
            setSelectedItem([])
        }
    }, [selectMode])

    useEffect(() => {
        //setTimeout(()=>setLoadingStatus(false),3000)

    }, [restaurantListData])

    return (

        <Container>
            <TopAppBar />
            <Container maxWidth="xl" sx={{ border: "solid 0px black", backgroundColor: "#FBFBF9" }}>
                <Toolbar />

                <Box sx={{ display: "flex", justifyContent: "flex-end", my: 1 }}>
                    <Button variant="contained" size="small" color="success" onClick={addNewRestaurant}>new</Button>
                </Box>

                <SearchBar kindList={kindList} searchRestaurants={searchRestaurants} />
                <SelectDelBtn switchSelectMode={switchSelectMode} checkDelete={checkDelete} />


                <AlertDialog snackBarOpen={snackBarOpen} handleSnackBarClose={handleSnackBarClose} />
                <MsgDialog msgDialogOpen={msgDialogOpen} checkDelete={checkDelete} selectedItem={selectedItem} deleteRestaurant={deleteRestaurant} setSelectedItem={setSelectedItem} />
                <EditDialog dialogOpen={dialogOpen} restaurantData={restaurantData} addRestaurant={addRestaurant} updateRestaurant={updateRestaurant} updateDialogData={updateDialogData} />

                <Restaurants setDialogOpen={setDialogOpen} selectMode={selectMode} updateSelectedItem={updateSelectedItem} restaurantListData={restaurantListData} getRestaurantList={getRestaurantList} updateDialogData={updateDialogData} loadingStatus={loadingStatus} setLoadingStatus={setLoadingStatus} />




            </Container>

        </Container>
    )
}


const DeleteButton = (props) => {

    const { checkDelete } = props

    return (
        <IconButton color="error" edge="start" onClick={() => checkDelete(true)}>
            <DeleteIcon />
        </IconButton>
    )
}

const SelectDelBtn = (props) => {

    const { switchSelectMode, checkDelete } = props

    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={switchSelectMode} sx={{ mx: 1 }}>選取</Button>
            <DeleteButton checkDelete={checkDelete} />
        </Box>
    )
}