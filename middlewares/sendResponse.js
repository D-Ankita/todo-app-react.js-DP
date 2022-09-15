
const sendResponse =(req , res , config)=>{
    const {statusCode , message , payload,totalPages} = config;
    // console.log("config object:",config);
    res.status(statusCode).json({ message,statusCode:statusCode, data: payload,totalPages:totalPages});
}

module.exports = sendResponse;