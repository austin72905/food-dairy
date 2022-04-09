import { postForm, get } from './httpUtils.js'
import { Base64 } from 'js-base64';

const domain=process.env.REACT_APP_URL

const reqGetRestaurantList = () => get(`${domain}/Food/GetRestaurantList`)

const reqGetRestaurantKind = () => get(`${domain}/Food/GetRestaurantKind`)

const reqAddRestaurant = (restaurantInfo) => {
    //POST FORM 方法
    const params = new URLSearchParams()
    Object.keys(restaurantInfo).forEach((key) => {
        params.append(key, restaurantInfo[key])
    })

    return postForm(`${domain}/Food/AddRestaurant`, params)
}


const reqUpdateRestaurant = (restaurantInfo) => {
    const params = new URLSearchParams()
    Object.keys(restaurantInfo).forEach((key) => {
        params.append(key, restaurantInfo[key])
    })

    return postForm(`${domain}/Food/SaveRestaurant`, params)
}

const reqDeleteRestaurant = (selectedItem) => {
    const encryptedStr = selectedItem.join(",")

    const postData = Base64.encode(encryptedStr)
    const params = new URLSearchParams()
    params.append("UniqueIdList", postData)

    return postForm(`${domain}/Food/DeleteRestaurant`, params)
}

const reqSearchRestaurants = (searchParams) => {
    console.log("searchParams", searchParams)
    const params = new URLSearchParams()
    params.append(searchParams.name, searchParams.keyWord)
    if (searchParams.kind)
        params.append("kind", searchParams.kind)

    return get(`${domain}/Food/GetRestaurantList?${params}`)
}

export { reqGetRestaurantList, reqAddRestaurant, reqUpdateRestaurant, reqDeleteRestaurant, reqSearchRestaurants, reqGetRestaurantKind }