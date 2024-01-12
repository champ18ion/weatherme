import React from 'react';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBRow className="">
       <MDBCol  className="vh -100 bg-primary" md='6'>
        md="4"
      </MDBCol>
      <MDBCol md='6'>
        <div className='bg-dark pb-3'>md="8"</div>
        <MDBRow>
          <MDBCol className="bg-success p-2" md='6'>
            md="6"
          </MDBCol>
          <MDBCol  className="bg-warning" md='6'>
            md="6"
          </MDBCol>
        </MDBRow>
      </MDBCol>
     
    </MDBRow>
  );
}