
export const Error = (code,success,message,res) =>{
    return res.status(code).json({
        success,
        message
    });
};