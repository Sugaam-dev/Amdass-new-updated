import React,{useState,useEffect} from "react";
import Datepicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaCalendarAlt} from "react-icons/fa";
import '../Styles/cal.css';
import { addDays, getDay, subDays } from "date-fns";

function CustomInput({value, onClick}){
    return(
        <div className="input-group">
            <input placeholder='MM/DD/YYYY' type="text" className="form-control" value={value} onClick={onClick} readOnly/>
            <div className="input-group-append">
                <span className="input-group-text">
                    <FaCalendarAlt/>
                </span>
            </div>
        </div>    )
}
function Calender({passdata}){
    const[selectedDate,setDate] = useState(null);
    const current = new Date();
    const today = current.getDay();

    Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
    }
    var dayOfWeek = 6;//sat
    var date = new Date();
    date.setDate(date.getDate() + (dayOfWeek + 7 - date.getDay()) % 7);
    var dateArray = new Array();


    function getDates(startDate, stopDate) {
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            if (currentDate.getDay() != 0 && currentDate.getDay() != 6){
          dateArray.push(currentDate)}
          currentDate = currentDate.addDays(1);
        }
        return dateArray;
      }
    useEffect(()=>{
        passdata(selectedDate)

    },[selectedDate])

    useEffect(() => {
    
        if (today==5 && today ==6){
            getDates(new Date().addDays(1),(new Date()).addDays(7));
        }
        // if (today==4){
        //     getDates((new Date()).addDays(1),(new Date()).addDays(8));
        // }
        if (today==0){
            getDates(new Date(),new Date());
        }
        else{
        getDates(new Date().addDays(1), date);
        }
       
      }, [dateArray]);

    const handleDateChange=(Date)=>{
        setDate(Date)
    }

    return(
        <div className="Calender">
            <label><Datepicker selected={selectedDate} onChange={handleDateChange} includeDates={dateArray} customInput={<CustomInput/>}/></label>
        </div>
        );
        
}
export default Calender;



