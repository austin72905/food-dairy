import axios from 'axios';

const get = async(url,queryString=null) => {

    if(queryString)
        url+=`?${queryString}`
    const resp = await axios.get(url)
    return resp
        
}

const postForm = async (url, postData, header = null) => {
    const resp = await axios.post(url, postData)
    return resp
}

export {postForm,get}