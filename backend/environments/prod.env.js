exports.prodEnvironment=()=>{
    const keys = {
        MONGO_URI:process.env.MONGO_URI,
    }

    return keys
}