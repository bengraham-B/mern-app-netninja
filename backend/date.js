function dateString (){
    const date = new Date
    const month = date.getMonth() + 1

    let monthName = "January"
    if(month === 4){
        monthName = "April"
    }
    if(month === 5){
        monthName = "May"
    }

    return `[${date.getDate()} ${monthName} ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`

}

module.exports = dateString