import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../Components/Loader";
import Swal from "sweetalert2";
import {Tag,Divider} from 'antd'
const ProfileScreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  const items = [
    {
      key: "1",
      label: "Profile",
      content: <MyProfile user={user} />,
    },
    {
      key: "2",
      label: "Bookings",
      content: <MyBookings user={user} />,
    },
  ];

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        {items.map((item) => (
          <Tabs.TabPane key={item.key} tab={item.label}>
            {item.content}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default ProfileScreen;

export function MyBookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "/api/bookings/getbookingsbyuserid/",
          {
            userid: user._id,
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user._id]);

  async function cancelBooking(bookingid, roomid) {
    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/cancelbooking", {
        bookingid,
        roomid,
      }).data;
      console.log(result);
      setLoading(false);
      Swal.fire("Congrats", "Your booking cancelled", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <div>Error fetching bookings.</div>}
      {bookings.map((booking) => (
        <div key={booking._id} className="bs">
          <h1>{booking.room}</h1>
          <p>
            <b>BookingId</b>: {booking._id}
          </p>
          <p>
            <b>CheckIn </b>: {booking.fromdate}
          </p>
          <p>
            <b>Check Out</b> : {booking.todate}
          </p>
          <p>
            <b>Amount</b> : {booking.totalamount}
          </p>
          <p>
            <b>Status</b> :{" "}
            {booking.status === "booked" ? (<Tag color="green">BOOKED</Tag>) : (<Tag color="orange">CANCELED</Tag>)}
          </p>
          <div className="text-right">
            {booking.status !== "canceled" && (
              <button
                className="btn btn-primary"
                onClick={() => cancelBooking(booking._id, booking.roomid)}
              >
                CANCEL BOOKING
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function MyProfile({ user }) {
  return (
    <div>
      <h1>My Profile</h1>
      <br />
      <h1>Name: {user.name}</h1>
      <h1>Email: {user.email}</h1>
      <h1>isAdmin: {user.isAdmin ? "Yes" : "No"}</h1>
    </div>
  );
}
