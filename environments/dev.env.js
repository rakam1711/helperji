exports.devEnvironment=()=>{
    console.log(process.env.MONGO_URI)
    const keys = {
        MONGO_URI:process.env.MONGO_URI,
        jwt_secret: process.env.JWT_SECRET,
    }

    return keys
}