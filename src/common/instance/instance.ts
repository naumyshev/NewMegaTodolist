import axios from "axios";

const token = '43c9ca0a-088d-4eab-bd9b-b18a6e675845'
const apiKey = '61af136b-19ed-429c-b781-2c52657791c2'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
    },
})