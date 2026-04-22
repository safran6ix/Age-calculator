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
  <div style={styles.container}>
    <div style={styles.calculator}>
        <h1 style={styles.title}>Age Calculator</h1>

      <div style={styles.inputGroup}>
         <label style={styles.label}>
            Enter your birth date:
         </label>

         <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          style={styles.input}
          max={new Date().toISOString().split('T')[0]}
         />
      </div>

      <div style={styles.buttonGroup}>
        <button onClick={calculateAge} style={styles.button}>
            Calculate Age
        </button>
        <button onClick={resetForm} style={styles.resetButton}>
          Reset
        </button>
      </div>

      {error && (
        <div style={styles.error}>
        {error}
        </div>
      )}

      {age && (
        <div style={styles.result}>
          <h2 style={styles.resultTitle}>Your Age:</h2>
          <div style={styles.ageDetails}>
            <div style={styles.ageItem}>
              <span style={styles.ageNumber}>{age.years}</span>
              <span style={styles.ageLabel}>Years</span>
            </div>
            <div style={styles.ageItem}>
              <span style={styles.ageNumber}>{age.months}</span>
              <span style={styles.ageLabel}>Months</span>
            </div>
            <div style={styles.ageItem}>
              <span style={styles.ageNumber}>{age.days}</span>
              <span style={styles.ageLabel}>Days</span>
            </div>
          </div>
          <p style={styles.totalDays}>
            Total Days Alive: {age.years * 365 + age.months * 30 + age.days}+ days
          </p>
        </div>
      )}
    </div>
  </div>
);
};