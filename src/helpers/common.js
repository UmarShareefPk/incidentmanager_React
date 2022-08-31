import moment from "moment";

export const setDateTime = (date) => {
    let newDate = moment(date).format("YYYY-MM-DD h:mm:ss A");
    newDate = new Date(newDate + " UTC");    
    return newDate.toString();
}