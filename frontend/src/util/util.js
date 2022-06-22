const IMAGE_URL = "https://image.tmdb.org/t/p/w500"

const getImage = (imagePath) => {
    return `${IMAGE_URL}${imagePath}`
}

const util = {
    getImage,
}

export default util