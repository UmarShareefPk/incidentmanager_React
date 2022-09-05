import moment from "moment";

export const setDateTime = (date) => {
   // return date;
    try{
        let newDate = moment(date).format("YYYY-MM-DD h:mm:ss A");
        newDate = new Date(newDate + " UTC");
       // console.log("date", date);    
       // console.log("newDate", newDate);    
        return newDate;
    }
    catch(err){
            console.log("Error in dates", err);
            return date;
    }
   
}