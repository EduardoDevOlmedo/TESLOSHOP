import axios from "axios"

const teslOApi = axios.create({
    baseURL: '/api'
})

export default teslOApi