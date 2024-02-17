import axios from 'axios'

const config =  {
    headers :{
        'SESSIONID':''
    }
}
let sess
const url = "http://127.0.0.1:2222/billing/user_billing_usage/256726079764/3"
console.log('client server starting')
axios.post("http://127.0.0.1:2222/billing/user_signin/",
    {
		"servedMSISDN": "439439499",
		"password": "3d7f4f7dd21d2293bd2d8500c507ad2c0414a156c6ea6f1d144bdc50cf244b82"
		
	

}).then((result)=>{
    console.log(result.data.sessionKey)
    sess = result.data.sessionKey
    console.log('set session key')
    const config =  {
        headers :{
            'SESSIONID':sess
        }
    }
    console.log('getting billing')

    axios.get(url,config).then(results=>{
        // console.log(results.data)
        console.log(results.data.userBillingUsage.dataUsage.perRecordUsage[0].nLeftUnits)

    })
})

//	url := "http://127.0.0.1:2222/billing/user_billing_usage/" + os.Args[1] + "/3"
