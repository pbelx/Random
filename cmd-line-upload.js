var axios = require("axios")
var FormData = require("form-data")
const fs = require("fs")
var xargs = process.argv.slice(2)

console.log("starting requests ====>")

var form = new FormData()
var stream = fs.createReadStream(xargs.toString())
form.append("tlink",stream)
var fheaders = form.getHeaders()



axios.post("http://linode:8080/torrent",form,{
    headers:{
        ...fheaders,
    },
}).then((res)=>{
    console.log(res.data)
})
// fd.submit("http://127.0.0.1:8080/torrent",(err,res)=>{
//     // console.log(res)
//     // res.resume()
//     console.log(res.body)
// })

console.log(xargs)
