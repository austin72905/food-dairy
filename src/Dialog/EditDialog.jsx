import React, { useEffect, useState } from 'react'
import { Input, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, TextField, Box, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { styled, experimental_sx as sx } from '@mui/system'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'


export default function EditDialog(props) {

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



    const titleList = [
        { title: "店名", name: "name" },
        { title: "地址", name: "address" },
        { title: "種類", name: "kind" },
        { title: "日期", name: "date" },
        { title: "本次點的餐點", name: "order" },
        { title: "價格", name: "price" },
        { title: "最推薦的餐點", name: "bestDish" },
        { title: "最糟的餐點", name: "worseDish" },
        { title: "評分", name: "rate" },
        { title: "評論", name: "comment" },
        { title: "上傳圖片", name: "picture" },
    ]

    const { dialogOpen, restaurantData, updateRestaurant, addRestaurant, updateDialogData } = props
    //console.log(dialogOpen)
    const [dialogOpenStatus, setDialogOpenStatus] = useState(false)
    const [editData, setEditData] = useState(initData)
    const [dateVal, setdDteVal] = useState(new Date())
    const [nameRequire, setNameRequire] = useState(true)


    const closeDialog = () => {
        setEditData(initData)
        updateDialogData(initData)
        setDialogOpenStatus(false)
        setNameRequire(true)
    }

    useEffect(() => {
        setDialogOpenStatus(true)
    }, [dialogOpen])
    //讓對話框第一次時會關閉
    useEffect(() => {
        setDialogOpenStatus(false)
    }, [])

    useEffect(() => {
        console.log("editData", editData)
        setEditData(restaurantData)
    }, [restaurantData])

    const handleInput = (name, e) => {
        console.log("name", name)
        if (name === "picture") {
            //console.log("pic", e.target.files[0])
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(file)
            let newData = { ...editData }
            reader.onload = () => {
                newData[name] = reader.result
                console.log("newData", newData)
                //setEditData(newData)
            }
            setEditData(newData)

        } else if (name === "date") {
            setdDteVal(e)
            let newData = { ...editData }
            newData[name] = e.toLocaleDateString()
            setEditData(newData)
        } else {
            let val = e.target.value
            let newData = { ...editData }
            val = setInputMaxVal(name, val)
            newData[name] = val
            setEditData(newData)
        }



    }

    const saveData = () => {

        //檢查是否有沒填的欄位
        if (isEmptyOrSpaces(editData.name)) {
            setNameRequire(false)
            return
        }

        //console.log(editData !== initData)

        if (editData.uniqueId === "")

            addRestaurant(editData)
        else
            updateRestaurant(editData)


        closeDialog()
    }



    return (
        <Dialog
            open={dialogOpenStatus}
            sx={{ maxHeight: "500px", position: "absolute", top: "20%" }}
            fullWidth={true}
        >
            <DialogTitle>
                <ModalTitle closeDialog={closeDialog} />
            </DialogTitle>
            <DialogContent dividers>
                {!nameRequire ? <RequireRemind>* 店名為必填</RequireRemind> : null}

                <NamePart
                    handleInput={handleInput}
                    titleList={titleList}
                    inputVal={editData.name}
                    title="店名" />

                <AddressPart
                    handleInput={handleInput}
                    titleList={titleList}
                    inputVal={editData.address}
                    title="地址" />

                <KindPart
                    handleInput={handleInput}
                    titleList={titleList}
                    inputVal={editData.kind}
                    title="種類" />

                <DatePart
                    handleInput={handleInput}
                    dateVal={dateVal}
                    titleList={titleList}
                    title="日期" />

                <OrderPart
                    handleInput={handleInput}
                    titleList={titleList}
                    inputVal={editData.order}
                    title="本次點的餐點" />
                <PricePart
                    handleInput={handleInput}
                    titleList={titleList}
                    inputVal={editData.price}
                    title="價格" />

                <BestDishPart
                    handleInput={handleInput}
                    titleList={titleList}
                    inputVal={editData.bestDish}
                    title="最推薦的餐點" />
                <WorseDishPart
                    handleInput={handleInput}
                    titleList={titleList}
                    inputVal={editData.worseDish}
                    title="最糟的餐點" />
                <RatePart
                    handleInput={handleInput}
                    titleList={titleList}
                    inputVal={editData.rate}
                    title="評分" />

                <CommentPart
                    handleInput={handleInput}
                    titleList={titleList}
                    inputVal={editData.comment}
                    title="評論" />

                <PicturePart
                    handleInput={handleInput}
                    titleList={titleList}
                    title="上傳圖片" />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={saveData}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

/* 樣式組件 */
const ItemBody = styled(Box)((props) => (
    sx({
        display: "flex", my: 3, alignItems: props.title === "評論" || props.title === "上傳圖片" ? "start" : "center"
    })
))

const ItemTitle = styled(Typography)({
    minWidth: "150px"
})


const RequireRemind = styled(Typography)({
    color: "red"
})



const Item = (props) => {
    const { inputVal, handleInput, titleList, title } = props
    const titleNamePair = titleList.find(item => item.title === title)
    return (
        <ItemBody title={title}>
            <ItemTitle>{title}</ItemTitle>
            {title === "上傳圖片" ?
                <ItemImage titleList={titleNamePair} handleInput={handleInput} />
                : <ItemInput titleList={titleNamePair} handleInput={handleInput} inputVal={inputVal} />
            }
        </ItemBody>
    )
}

const ItemInput = (props) => {
    const { inputVal, handleInput, titleList } = props
    return (
        <TextField fullWidth label={titleList.title} sx={{ mx: 3 }} minRows={3} multiline={titleList.title == "評論"} type={titleList.title == "價格" || titleList.title == "評分" ? "number" : "text"} size="small" value={inputVal} onChange={(e) => handleInput(titleList.name, e)} />
    )
}


const ItemImage = (props) => {
    const { handleInput, titleList } = props
    return (
        <Input type="file" accept="image/*" label={titleList.title} sx={{ mx: 3 }} size="small" onChange={(e) => handleInput(titleList.name, e)} />
    )
}

const ItemDate = (props) => {
    const { handleInput, titleList, title, dateVal } = props
    const titleNamePair = titleList.find(item => item.title === title)
    return (
        <ItemBody title={title}>
            <ItemTitle>{title}</ItemTitle>
            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <DatePicker
                    label="日期"
                    value={dateVal}
                    renderInput={(params) =>
                        <TextField {...params} size="small" fullWidth sx={{ mx: 3 }} />
                    }
                    onChange={(newDateVal) => handleInput(titleNamePair.name, newDateVal)}
                />
            </LocalizationProvider>
        </ItemBody>
    )
}


const ModalTitle = (props) => {
    const { closeDialog } = props
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", height: "20px", alignItems: "center" }}>
            edit restaurant
            <IconButton onClick={closeDialog}>
                <CloseIcon />
            </IconButton>
        </Box>
    )
}





/* 語意清晰組件 */
const NamePart = (props) => <Item {...props} />

const AddressPart = (props) => <Item {...props} />

const KindPart = (props) => <Item {...props} />

const DatePart = (props) => <ItemDate {...props} />

const OrderPart = (props) => <Item {...props} />

const PricePart = (props) => <Item {...props} />

const BestDishPart = (props) => <Item {...props} />

const WorseDishPart = (props) => <Item {...props} />

const RatePart = (props) => <Item {...props} />

const CommentPart = (props) => <Item {...props} />

const PicturePart = (props) => <Item {...props} />


/* 工具函數 */
const setInputMaxVal = (name, val) => {
    if (name === "price" || name === "rate") {
        if (val < 0)
            val = 0

        if (name === "rate") {
            if (val > 5)
                val = 5
        }
    }

    return val
}


function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}