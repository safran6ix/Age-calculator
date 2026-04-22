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

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif'
  },

  calculator: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '90%',
    maxWidth: '500px'
  },

  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '25px'
  },

  inputGroup: {
    marginBottom: '20px'
  },
  
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontWeight: 'bold'
  },

  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxSizing: 'border-box'
  },

  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },

  button: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },

  resetButton: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },


  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
    textAlign: 'center'
  },

  result: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#e8f4f8',
    borderRadius: '5px'
  },

  resultTitle: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '15px'
  },
  
  ageDetails: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '15px'
  },

  ageItem: {
    textAlign: 'center'
  },

  ageNumber: {
    display: 'block',
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#007bff'
  },

  ageLabel: {
    color: '#666',
    fontSize: '14px'
  },

  totalDays: {
    textAlign: 'center',
    color: '#666',
    fontSize: '14px',
    marginTop: '15px',
    fontStyle: 'italic'
  }
};

export default AgeCalculator;