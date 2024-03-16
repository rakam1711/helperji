const Contact = require('../../../models/contact');

exports.listingContacts = async(req,res,next) =>{
    try {
        const list = await Contact.find({})
        return res.status(200).send({
            statusText:"ok",
            status:200,
            message: "data listed successfully",
            data:{list}

        })

        
    } catch (error) {

        res.status(400).send({
            statusText:'Bad Request',
            status:400,
            message: error.message||'Getting error while listing contact data',
            data:{}
        })
        
    }
}