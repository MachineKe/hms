import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import Error from '../Components/Error';

const BookingScreen = () => {
  const { roomid } = useParams();
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post("/api/rooms/getroombyid", { roomid: roomid });
        setRoom(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    };
    
    fetchData();
  
  }, [roomid]);
  
  return (
    <div className='m-5'>
      {loading ? (
        <Loader/>
      ) : room ? (
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-5">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} alt="" className="bigimg" />
          </div>
          <div className="col-md-5">
            <div style={{textAlign: 'right'}}>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>Name : </p>
                <p>From Date</p>
                <p>To Date</p>
                <p>Max Count: {room.maxcount}</p>
              </b>
            </div>

            <div style={{textAlign: 'right'}}>
              <b>
                <h1>Amount</h1>
                <hr />
                <p>Total days: </p>
                <p>Rent per day : {room.rentperday}</p>
                <p>Total Amount</p>
              </b>
            </div>

            <div style={{float:"right"}}>
              <button className='btn btn-primary '>Pay Now</button>
            </div>
          </div>
        </div>
      ) : (
        <Error/>
      )}
    </div>
  );
};

export default BookingScreen;
