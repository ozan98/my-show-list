import axios from 'axios'

const API_URL = '/api/shows/'

// Add new media
const addMedia = async (mediaData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, mediaData, config)
    return response.data
}

// Get all media
const getAllMedia = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete media
const deleteMedia = async (mediaId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    console.log(mediaId)
    const response = await axios.delete(API_URL + mediaId, config)

    return response.data
}

const mediaService = {
    addMedia,
    getAllMedia,
    deleteMedia,
}

export default mediaService