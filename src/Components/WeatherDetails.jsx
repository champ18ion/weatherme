// WeatherDetails.js

import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Basic({data,unit}) {

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45);
    const normalizedIndex = (index + directions.length) % directions.length;
    return directions[normalizedIndex];
  };
  

  return (
   
            <MDBCard style={{ color: "#4B515D", borderRadius: "35px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex">
                  <MDBTypography tag="h4" className="flex-grow-1">
                   {data && data.name} <MDBTypography tag='h6'>{data.sys.country}</MDBTypography>
                  </MDBTypography>
                  <MDBTypography tag="h6">{new Date(data.dt * 1000).toLocaleTimeString()}</MDBTypography>
                </div>

                <div className="d-flex flex-column text-center mt-5 mb-4">
                  <MDBTypography
                    tag="h6"
                    className="display-4 mb-0 font-weight-bold"
                    style={{ color: "#1C2331" }}
                  >
                    {" "}
                    {data && data.main.feels_like}°{unit === 'metric' ? 'C' : 'F'}{" "}
                  </MDBTypography>
                  <MDBTypography tag='h3' style={{ color: "#868B94",fontSize:"1.4rem" }}>
                  {data && data.weather[0].description}
                  </MDBTypography>
                </div>

                <div className="d-flex align-items-center">
                  <div className="flex-grow-1" style={{fontSize: '1rem'}}>
                    <div>
                      <MDBIcon
                        fas
                        icon="wind fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1"> {data.wind.speed}  {unit === 'metric' ? 'm/s' : 'miles/hr'}</span>
                    </div>
                    <div>
                    <MDBIcon fas icon="compass" style={{ color: "#868B94" }} />{"  "}
                      <span className="ms-1"> {(getWindDirection(data.wind.deg))} </span>
                    </div>
                    <div>
                    <MDBIcon fas icon="eye" style={{ color: "#868B94" }}/>{" "}
                      <span className="ms-1"> {data.visibility/1000} km </span>
                    </div>
                  </div>
                  <div>
                    <img
                      src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                      width="100px"
                    />
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          
  );
}


{/* <h2>{data.name}</h2>
<p>Date: {new Date(data.dt * 1000).toLocaleDateString()}</p>
<p>Temperature: {data.main.feels_like} °C / {data.tempF} °F</p>
<p>Min Temperature: {data.main.temp_min} °C / {data.tempMinF} °F</p>
<p>Max Temperature: {data.main.temp_max} °C / {data.tempMaxF} °F</p>
<p>Humidity: {data.main.humidity}%</p>
<p>Wind: {data.wind.speed} m/s, {data.wind.deg}</p>
<p>Description: {data.weather[0].description}</p>
<img styles={{height:"40px",width:"40px"}} src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="Weather Icon" />
<img src={data.weatherIcon} alt="Weather Icon" /> */}