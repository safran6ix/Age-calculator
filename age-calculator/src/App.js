import React, { useState } from "react";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);
  const [error, setError] = useState('');

  const calculateAge = () => {
    if(!birthDate){
      setError('Please select a date');
      setAge(null);
      return;
    }

    const today = new Date();
    const birth = new Date(birthDate);

    //Check if birth date is in the future
    if(birth > today){
      setError('Birth date cannot be in the future');
      setAge(null);
      return;
    }

    let ageYears = today.getFullYear() - birth.getFullYear();
    let ageMonths = today.getMonth() - birth.getMonth();
    let ageDays = today.getDate() - birth.getDay();

    //Adjust if birthday hasn't occurred yet this year
    if(ageDays < 0){
      ageMonths--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      ageDays += lastMonth.getDate();
    }

    if(ageMonths < 0){
      ageYears--;
      ageMonths += 12;
    }

    setAge({years: ageYears, months: ageMonths, days: ageDays});
    setError('');
  };
  
  const resetForm = () => {
    setBirthDate('');
    setAge(null);
    setError('');
  };



return(
  <div>
    
  </div>
)


}