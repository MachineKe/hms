import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const BookingScreen = () => {
  const { roomid, fromdate, todate } = useParams();
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const fromDateObj = dayjs(fromdate, "DD-MM-YYYY");
  const toDateObj = dayjs(todate, "DD-MM-YYYY");
  const totaldays = toDateObj.diff(fromDateObj, "day") + 1;
  const [totalamount, settotalamount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post("/api/rooms/getroombyid", {
          roomid: roomid,
        });
        settotalamount(data.rentperday * totaldays);
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.error(error);
      }
    };

    fetchData();
  }, [roomid, totaldays]); // added totaldays to the dependencies array

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("currentUser")) {
        window.location.href = "/login"; // corrected the assignment of window.location.href
      }
    };
    checkUser();
  }, []);

  const bookroom = () => {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate: fromDateObj,
      todate: toDateObj,
      totalamount,
      totaldays,
    };
    try {
      setLoading(true);
      const result = axios.post("/api/bookings/bookroom", bookingDetails);
      setLoading(false);
      Swal.fire("Congratulations", "Your Room Book Successfully", "success").then((result) => {
        window.location.href = "/profile";
      });
    } catch (error) {
      setLoading(false);
      Swal.fire("Ooops!", "Something went wrong", "error");
    }
  };

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-5">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} alt="" className="bigimg" />
          </div>
          <div className="col-md-5">
            <div style={{ textAlign: "right" }}>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>Name : {JSON.parse(localStorage.getItem("currentUser")).name}</p>
                <p>From Date : {fromDateObj.format("DD-MM-YYYY")}</p>
                <p>To Date : {toDateObj.format("DD-MM-YYYY")}</p>
                <p>Max Count: {room.maxcount}</p>
              </b>
            </div>

            <div style={{ textAlign: "right" }}>
              <b>
                <h1>Amount</h1>
                <hr />
                <p>Total days: {totaldays}</p>
                <p>Rent per day : {room.rentperday}</p>
                <p>Total Amount : {totalamount}</p>
              </b>
            </div>

            <div style={{ float: "right" }}>
              <button className="btn btn-primary" onClick={bookroom}>
                Pay Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
};

export default BookingScreen;
