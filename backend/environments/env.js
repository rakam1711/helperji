const {devEnvironment} = require('./dev.env')
const {prodEnvironment} = require('./prod.env')

exports.env=()=>{
    if (process.env.NODE_ENV?.includes('production')) {
        return prodEnvironment()
    }else if (process.env.NODE_ENV?.includes('development')) {
        console.log('process.env.NODE_ENV',process.env.NODE_ENV)
        return devEnvironment()
    }
}