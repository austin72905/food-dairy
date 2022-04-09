import React, { useState } from 'react'
import { styled } from '@mui/system'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export default function SearchBar(props) {
    const { kindList, searchRestaurants } = props

    const searchTypes = [
        { name: "店名", type: "name" },
        { name: "地址", type: "address" },
        { name: "價格", type: "price" },
        { name: "餐點", type: "order" },
        { name: "評論", type: "comment" }
    ]

    const [searchName, setSearchName] = useState([])
    const [keyWord, setKeyWord] = useState("")

    const [kind, setKind] = useState([])

    const handleKind = (e) => {
        setKind(lastVal => {
            return singleSelect(lastVal, e.target.value)
        })
    }

    const handleSearchType = (e) => {
        setSearchName(lastVal => {
            return singleSelect(lastVal, e.target.value)
        })
    }

    const handleSearchInput = (e) => {
        setKeyWord(e.target.value)
    }

    const search = () => {
        const name = searchName.length === 0 ? searchTypes[0].type : searchName[0]
        if (kind.length === 0)
            searchRestaurants({ name, keyWord })
        else
            searchRestaurants({ name, keyWord, kind: kind[0] })
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Stack direction="row" spacing={2} >
                <Type title="類型" selectVal={searchName} handleFunc={handleSearchType} menu={searchTypes}/>          
                <SearchInput handleSearchInput={handleSearchInput} />
                <Kind title="Kind"  selectVal={kind} handleFunc={handleKind} menu={kindList}/>
                <Button variant="contained" onClick={search}>Search</Button>
            </Stack>
        </Box>
    )
}

const singleSelect = (lastVal, val) => {
    //Select 的 e.target.value 預設是 array ， 所以預設是多選功能
    //下面只是改單選 
    if (lastVal.length === 0)
        return val
    const newVal = val.filter((item) => item !== lastVal[0])
    return newVal
}

const SearchBody = styled(FormControl)({
    minWidth: "150px"
})

const SearchMenu = styled(Select)({
    minWidth: "150px",
})

const SearchWrapper=(props)=>{

    const {selectVal,menu,handleFunc,title}=props

    //select 裡面menu的 樣式，設置maxHeight 可以讓她有拉條
    const MenuProps={
        PaperProps:{
            style:{
                maxHeight:"200px"
            }
        }
    }

    return (
        <SearchBody>
            <InputLabel size="small">{title}</InputLabel>
            <SearchMenu
                size="small"
                MenuProps={MenuProps}
                multiple
                value={selectVal}
                input={<OutlinedInput label="Name" />}
                onChange={handleFunc}
            >
                {title==="Kind"? 
                menu.map((name) => (
                    <MenuItem
                        value={name}
                        key={name}
                    >
                        {name}
                    </MenuItem>
                )):
                menu.map((item) => (
                    <MenuItem
                        value={item.type}
                        key={item.name}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </SearchMenu>
        </SearchBody>
    )
}

const Kind = (props) =><SearchWrapper {...props}/> 
    
const Type=(props) => <SearchWrapper {...props}/>
    
const SearchInput=(props)=>{
    const {handleSearchInput}=props
    return (
        <TextField id="outlined-search" label="Search" type="search" size="small" onChange={handleSearchInput} />
    )
}