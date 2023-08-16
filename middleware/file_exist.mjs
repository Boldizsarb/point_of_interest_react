
const filePayloadExist = (req,res,next) =>{
    if(!req.files) return res.status(400).json({status:"error", massage: "Missing file"})
    next()
}

export default filePayloadExist
