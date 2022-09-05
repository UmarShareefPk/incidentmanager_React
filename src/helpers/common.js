import moment from "moment";

export const setDateTime = (date) => {
   // return date;
   Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }
    try{    
        let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let offset = new Date().getTimezoneOffset();   
        let newDate = new Date(date).addHours((offset/60) * (-1));
        // console.log("date", date);    
        // console.log("newDate", newDate);   
        // console.log("offset", offset);

        return newDate;
    }
    catch(err){
            console.log("Error in dates", err);
            return date;
    }
   
}

