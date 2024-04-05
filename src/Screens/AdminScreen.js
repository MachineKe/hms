import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../Components/Loader";
import Swal from "sweetalert2";

const { TabPane } = Tabs;

const AdminScreen = () => {
  const items = [
    {
      key: "1",
      label: "Bookings",
      children: <Bookings />,
    },
    {
      key: "2",
      label: "Rooms",
      children: <Rooms />,
    },
    {
      key: "3",
      label: "Add Room",
      children: <Addroom />,
    },
    {
      key: "4",
      label: "Users",
      children: <Users />,
    },
  ];

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  });

  return (
    <div className="mt-3 mr-3 ml-3 bs">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey="1">
        {items.map((item) => (
          <TabPane tab={item.label} key={item.key}>
            {item.children}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminScreen;

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // This flag to track if the component is mounted or not
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/bookings/getallbookings");
        if (isMounted) {
          setBookings(data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      // Cleanup function to handle component unmounting
      isMounted = false;
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader />}
        {error && <p>Error: {error.message}</p>}
        <table className="table table-bordered table-dark">
          <thead className="bs thead-dark">
            <tr>
              <th>Booking id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Rooms() {
  const [rooms, setrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // This flag to track if the component is mounted or not
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/rooms/getallrooms");
        if (isMounted) {
          setrooms(data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      // Cleanup function to handle component unmounting
      isMounted = false;
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>
        {loading && <Loader />}
        {error && <p>Error: {error.message}</p>}
        <table className="table table-bordered table-dark">
          <thead className="bs thead-dark">
            <tr>
              <th>Room id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent per day</th>
              <th>Max Count</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length > 0 &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phone}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // This flag to track if the component is mounted or not
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/users/getallusers");
        if (isMounted) {
          setUsers(data);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      // Cleanup function to handle component unmounting
      isMounted = false;
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loader />}
        {error && <p>Error: {error.message}</p>}
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "YES" : "NO"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Addroom() {
  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState("");
  const [maxcount, setmaxcount] = useState("");
  const [description, setdescription] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [type, settype] = useState("");
  const [imgurl1, setimgurl1] = useState("");
  const [imgurl2, setimgurl2] = useState("");
  const [imgurl3, setimgurl3] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function addroom() {
    // Check if any of the required fields are empty
    if (!name || !rentperday || !maxcount || !description || !phonenumber || !type || !imgurl1 || !imgurl2 || !imgurl3) {
      Swal.fire('Error', 'Please fill in all the fields', 'error');
      return;
    }
  
    const newroom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imgurl1, imgurl2, imgurl3],
    };
  
    try {
      setLoading(true);
      const result = await axios.post("/api/rooms/addroom", newroom).data;
      console.log(result);
      setLoading(false);
      Swal.fire('Congrats', 'New Room Added Successfully', 'success').then(result => {
        window.location.href = '/home';
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      Swal.fire('Oops', 'Something went wrong', 'error');
    }
  }
  

  return (
    <div className="row">

{loading&&<Loader/>}

      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="room name"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="rent per day"
          value={rentperday}
          onChange={(e) => {
            setrentperday(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="max count"
          value={maxcount}
          onChange={(e) => {
            setmaxcount(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="phone number"
          value={phonenumber}
          onChange={(e) => {
            setphonenumber(e.target.value);
          }}
        />
      </div>
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="type"
          value={type}
          onChange={(e) => {
            settype(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL1"
          value={imgurl1}
          onChange={(e) => {
            setimgurl1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL2"
          value={imgurl2}
          onChange={(e) => {
            setimgurl2(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL3"
          value={imgurl3}
          onChange={(e) => {
            setimgurl3(e.target.value);
          }}
        />

        <div className="text-right">
          <button className="btn btn-primary mt-2" onClick={addroom}>
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}
