import React, { useState, useEffect } from 'react'
import { Checkbox } from '@mui/material'
import MeatPic from '../assets/田季發爺.jpg'
import Meat6Pic from '../assets/茶六.jpg'
import UptownPic from '../assets/雙城.jpg'
import JackSteakPic from '../assets/傑克兄弟牛排.jpg'
import { styled, experimental_sx as sx } from '@mui/system'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Rating from '@mui/material/Rating'
import CircularProgress from '@mui/material/CircularProgress';



export default function Restaurants(props) {

    //props
    const { updateSelectedItem, updateDialogData, setDialogOpen, selectMode, restaurantListData, getRestaurantList,loadingStatus,setLoadingStatus } = props

    const tempData2 = [
        {
            uniqueId: "123",
            name: "茶六燒肉餐廳",
            address: "台中市西區朝富路289號",
            picture: Meat6Pic,
            rate: 4.1,
            date: "2022/03/10",
            kind: "#燒肉#慶生#台中",
            order: "2499雙人套餐",
            price: 2499,
            bestDish: "香菇",
            worseDish: "無",
            comment: "醴本比較好吃，茶六有點太貴了，肉好像也沒有到令人非常驚豔醴本比較好吃，茶六有點太貴了，肉好像也沒有到令人非常驚豔醴本比較好吃，茶六有點太貴了，肉好像也沒有到令人非常驚豔醴本比較好吃，茶六有點太貴了，肉好像也沒有到令人非常驚豔醴本比較好吃，茶六有點太貴了，肉好像也沒有到令人非常驚豔醴本比較好吃，茶六有點太貴了，肉好像也沒有到令人非常驚豔醴本比較好吃，茶六有點太貴了，肉好像也沒有到令人非常驚豔醴本比較好吃，茶六有點太貴了，肉好像也沒有到令人非常驚豔"
        }
    ]

    const handleChecked = (e) => {
        updateSelectedItem(e.target.value)
    }

    const editDialog = (restaurant) => {
        //console.log("restaurant", restaurant)
        setDialogOpen(status => !status)
        updateDialogData(restaurant)
    }

    //只會運行一次
    useEffect(() => {
        setLoadingStatus(true)
        getRestaurantList()
    }, [])

    useEffect(()=>{
        //setLoadingStatus(false)
        const timer=setTimeout(() => {
            setLoadingStatus(false)
        }, 500);
        
        return ()=>{
            clearTimeout(timer)
        }
        
    },[restaurantListData])

    return (
        <Box>
            {loadingStatus ?
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress sx={{ color: "grey.500" }} />
                </Box>
                :
                <List>
                    {restaurantListData.map((restaurant) => (
                        <RestaurantInfo key={restaurant.uniqueId}>
                            {selectMode ?
                                <SelectCheckBox handleChecked={handleChecked} restaurant={restaurant} />
                                : null
                            }
                            <InfoContent editDialog={editDialog} restaurant={restaurant} />
                        </RestaurantInfo>
                    ))}
                </List>
            }

        </Box>
    )


}





const Info = (props) => {
    const { title, inputVal } = props
    return (
        <ItemBody title={title}>
            <ItemTitle variant="h6" >{title}</ItemTitle>
            <ItemInput>{inputVal}</ItemInput>
        </ItemBody>
    )
}

const EditButton = (props) => {
    const { editDialog, restaurant } = props
    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mx: 3 }}>
            <Button variant="contained" sx={{ my: 2 }} color="info" onClick={() => editDialog(restaurant)}>edit</Button>
        </Box>
    )
}

const MainInfo = (props) => {
    const { restaurant } = props
    return (
        <Box sx={{ mx: 2, width: "65%" }}>
            <Typography variant="h4">{restaurant.name}</Typography>
            <Typography sx={{ color: "text.secondary" }}>{restaurant.address}</Typography>
            <Box sx={{ mt: 7 }}>
                <ScoreWapper >{restaurant.rate}</ScoreWapper>
                <Rating readOnly value={Math.round(restaurant.rate)}></Rating>
            </Box>

            <Typography>{restaurant.date}</Typography>
        </Box>
    )
}

const CoverImage = (props) => {
    const { restaurant } = props
    return (
        <Box>
            <img src={restaurant.picture} height={200} width={200} />
        </Box>
    )
}

const Tags = (props) => {
    const { restaurant } = props
    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <Typography sx={{ color: "#4dabf5" }}>{restaurant.kind}</Typography>
        </Box>
    )
}

const SelectCheckBox = (props) => {
    const { handleChecked, restaurant } = props
    return (
        <Box>
            <Checkbox onChange={handleChecked} value={restaurant.uniqueId} />
        </Box>
    )
}


const InfoContent = (props) => {
    const { restaurant, editDialog } = props
    return (
        <InfoContentWrap >
            <InfoCover restaurant={restaurant} />
            <InfoDetail editDialog={editDialog} restaurant={restaurant} />
        </InfoContentWrap>
    )
}

const InfoCover = (props) => {
    const { restaurant } = props
    return (
        <AccordionSummary>
            <CoverImage restaurant={restaurant} />
            <MainInfo restaurant={restaurant} />
            <Tags restaurant={restaurant} />
        </AccordionSummary>
    )
}

const InfoDetail = (props) => {
    const { restaurant, editDialog } = props
    return (
        <AccordionDetails>
            <EditButton editDialog={editDialog} restaurant={restaurant} />
            <Container maxWidth="md">
                <Info title="本次點的餐點" inputVal={restaurant.order} />
                <Info title="價格" inputVal={restaurant.price} />
                <Info title="最推薦的餐點" inputVal={restaurant.bestDish} />
                <Info title="最糟的餐點" inputVal={restaurant.worseDish} />
                <Info title="評論" inputVal={restaurant.comment} />
            </Container>
        </AccordionDetails>
    )
}

/* 樣式組件 */
const RestaurantInfo = styled(Box)({
    display: "flex", alignItems: "center"
})

const InfoContentWrap = styled(Accordion)(
    sx({ my: 3, width: "100%" })
)

const ScoreWapper = styled(Typography)({
    marginLeft: "5px"
})


const ItemBody = styled(Box)((props) => (
    sx({
        display: "flex", my: 3, alignItems: props.title === "評論" ? "start" : "center"
    })
))

const ItemTitle = styled(Typography)({
    minWidth: "150px"
})

const ItemInput = styled(Typography)(
    sx({ mx: 3 })
)



