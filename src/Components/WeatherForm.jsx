import React, { useState } from 'react';
import { MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';

const WeatherForm = ({ onCityChange,error }) => {
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
      <div className='d-flex justify-content-center m-3'>
        <div className='d-flex gap-2 w-50'>
          <MDBInput
            label='Enter your City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type='text'
            style={{border: 'none', borderRadius: '35px', outline: 'none'}}
            onKeyPress={handleKeyPress}
          />
          <MDBBtn color='white' rounded onClick={handleSubmit}>
            Go
          </MDBBtn>
        </div>
      </div>
      {error && (<div className='d-flex flex-column align-items-center'><h3 style={{ color: 'red', marginTop: '10px' }}>{error}</h3>
      <MDBIcon fas icon='exclamation-triangle' style={{ fontSize: '5rem' }} /> </div>)}
    </>
  );
};

export default WeatherForm;
