require('dotenv').config()
const axios = require('axios')
const cheerio = require('cheerio')

Date.prototype.yyyymmdd = function()
{
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();

    return yyyy + '-' + (mm[1] ? mm : '0'+mm[0]) + '-' + (dd[1] ? dd : '0'+dd[0]);
}

var today = new Date().yyyymmdd()

const getTodayCommit = async() => {
    const target_url = "https://github.com/clinoz"
    const response = await axios.get(target_url,{
        responseType:"arraybuffer",
        headers:{
            Cookie: "tz=Asia%2FSeoul"
        }
    })
    if (response.status==200){
        const $ = cheerio.load(response.data)
        for (var i=1; i<8; i++) {
            data_date = $("g:nth-child(53) rect:nth-child("+i+")").attr("data-date")
            if (data_date==today) {
                count = $("g:nth-child(53) rect:nth-child("+i+")").attr("data-count")
                console.log(count)
                break;
            } else {
                continue;
            }
        }

    }
}
getTodayCommit()