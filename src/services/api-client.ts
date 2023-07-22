import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'e551762626b24bb6b134196c95d32fff'
    }
})