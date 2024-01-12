import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBTypography } from 'mdb-react-ui-kit';

const Forecast = ({ data, unit }) => {
  console.log(data);

  // Omit the first item in the data array
  const forecastData = data.slice(1);

  return (
    <MDBContainer fluid>
      <MDBRow className="forecast mt-4">
        <h2 className="mb-3">5-Day Forecast</h2>
        {forecastData.map((day) => (
          <MDBCol key={day.date} className="forecast-item me-3">
            <MDBCard style={{ borderRadius: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
              <MDBCardBody className="p-3 d-flex flex-column align-items-center">
                <div className="mb-2">
                  <MDBIcon
                    fas
                    icon={`temperature-${day.img}`}
                    style={{ color: "#868B94", fontSize: "1.5rem" }}
                  />
                </div>
                <p className="mb-2">{formatDate(day.date)}</p>
                <img
                    style={{ height: "40px", width: "40px", marginRight: "8px" }}
                    src={`http://openweathermap.org/img/wn/${day.img}.png`}
                    alt="Weather Icon"
                  />
                <div className="d-flex align-items-center mb-2">
                 
                  <span>{day.temp}°{unit === 'metric' ? 'C' : 'F'}</span>
                </div>
                <MDBTypography tag="p" className="mb-0 text-center">
                  {day.description}
                </MDBTypography>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};

// Function to format date like "Monday, 12 Jan"
const formatDate = (dateString) => {
  const options = { weekday: 'long', day: 'numeric', month: 'short' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

export default Forecast;
