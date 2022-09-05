import moment from "moment";

export const setDateTime = (date) => {
    try{
        let newDate = moment(date).format("YYYY-MM-DD h:mm:ss A");
        newDate = new Date(newDate + " UTC");    
        return newDate.toString();
    }
    catch(err){
            console.log("Error in dates", err);
            return date.toString();
    }
   
}