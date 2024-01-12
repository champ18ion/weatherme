import React, { useState } from 'react';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';

const WeatherForm = ({ onCityChange, handleUnitToggle }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      onCityChange(city);
      // Clear the input field after submission
      setCity('');
    }
  };

  const handleKeyPress = (e) => {
    // Submit the form if Enter key is pressed
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <>
      <div className='d-flex justify-content-center m-2'>
        <div className='d-flex gap-2'>
          <MDBInput
            label='Enter your City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type='text'
            onKeyPress={handleKeyPress}
          />
          <MDBBtn color='white' rounded onClick={handleSubmit}>
            Go
          </MDBBtn>
        </div>
      </div>
    </>
  );
};

export default WeatherForm;
