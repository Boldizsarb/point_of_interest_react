import path from "path"
/////////////////////////////// picture upload!! 

const fileExtLimit = (allowedExtArray)=>{
    return(req, res, next) => { 
        
            const files = req.files

            const fileExtensions = []

            Object.keys(files).forEach((key) => {
                fileExtensions.push(path.extname(files[key].name))
            })

            const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext))

            if(!allowed){
                res.status(422).json({    // 422 = Uprocessable Entity
                    message: "Only picture file types are allowed"
                })
            }

            next()
    
    }
}

export default fileExtLimit