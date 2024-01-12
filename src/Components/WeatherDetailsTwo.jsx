import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";

const WeatherCard = ({ icon, label, value }) => (
  <MDBCol className='mb-2'>
    <MDBCard style={{ color: "#4B515D", borderRadius: "35px" }}>
      <MDBCardBody className="p-4">
        <div className="d-flex align-items-center">
          <MDBIcon
            fas
            icon={icon}
            style={{ color: "#868B94", fontSize: "2rem" }}
          />
          <div className="ms-3">
            <MDBTypography tag="h5">{label}</MDBTypography>
            <MDBTypography tag="p" className="mb-0">
              {value}
            </MDBTypography>
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
);

// ... (other imports)

const WeatherGrid = ({ data, unit, onUnitToggle }) => {
  return (
    <MDBContainer fluid>
      <MDBRow className="mt-4">
        <WeatherCard
          icon="temperature-high"
          label="Max Temp."
          value={`${data && data.main.temp_max}°${unit === 'metric' ? 'C' : 'F'}`}
        />
        <WeatherCard
          icon="temperature-low"
          label="Min Temp."
          value={`${data && data.main.temp_min}°${unit === 'metric' ? 'C' : 'F'}`}
        />
      </MDBRow>
      <MDBRow className="mt-4">
        <WeatherCard
          icon="tachometer-alt"
          label="Pressure"
          value={`${data && data.main.pressure} hPa`}
        />
        <WeatherCard
          icon="tint"
          label="Humidity"
          value={`${data && data.main.humidity}%`}
        />
        {/* Separate Buttons for Celsius and Fahrenheit */}
        <MDBCol className="mb-2">
          <MDBCard
            style={{
              color: unit === 'metric' ? '#fff' : '#4B515D',
              backgroundColor: unit === 'metric' ? '#4caf50' : '#fff',
              borderRadius: '35px',
            }}
            onClick={() => onUnitToggle()}
          >
            <MDBCardBody className="p-4">
              <div className="d-flex align-items-center">
                <MDBIcon
                  fas
                  icon="temperature-high"
                  style={{ color: unit === 'metric' ? '#fff' : '#4B515D', fontSize: '2rem' }}
                />
                <div className="ms-3">
                  <MDBTypography tag="h5">Celsius</MDBTypography>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol className="mb-2">
          <MDBCard
            style={{
              color: unit === 'imperial' ? '#fff' : '#4B515D',
              backgroundColor: unit === 'imperial' ? '#4caf50' : '#fff',
              borderRadius: '35px',
            }}
            onClick={() => onUnitToggle()}
          >
            <MDBCardBody className="p-4">
              <div className="d-flex align-items-center">
                <MDBIcon
                  fas
                  icon="temperature-high"
                  style={{ color: unit === 'imperial' ? '#fff' : '#4B515D', fontSize: '2rem' }}
                />
                <div className="ms-3">
                  <MDBTypography tag="h5">Fahrenheit</MDBTypography>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default WeatherGrid;

