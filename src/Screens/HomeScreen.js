import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../Components/Room';
import Loader from '../Components/Loader';
import Error from '../Components/Error';
import { DatePicker } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'; // Import the isBetween plugin

dayjs.extend(isBetween); // Extend dayjs with the isBetween plugin

const HomeScreen = () => {
  const { RangePicker } = DatePicker;
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fromdate, setFromDate] = useState();
  const [todate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchkey, setSearchKey] = useState('');
  const [type, setType] = useState('all');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/rooms/getallrooms');
        setRooms(data);
        setDuplicateRooms(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  function filterByDate(dates) {
    const fromDateFormatted = dayjs(dates[0]).format('DD-MM-YYYY');
    const toDateFormatted = dayjs(dates[1]).format('DD-MM-YYYY');

    const filteredRooms = duplicateRooms.filter(room => {
      if (room.currentbookings.length === 0) {
        return true; // Room is available if no bookings exist
      }

      for (const booking of room.currentbookings) {
        if (
          dayjs(fromDateFormatted).isBetween(booking.fromdate, booking.todate, null, '[]') ||
          dayjs(toDateFormatted).isBetween(booking.fromdate, booking.todate, null, '[]') ||
          dayjs(booking.fromdate).isBetween(fromDateFormatted, toDateFormatted, null, '[]') ||
          dayjs(booking.todate).isBetween(fromDateFormatted, toDateFormatted, null, '[]')
        ) {
          return false; // Room is booked during the selected date range
        }
      }
      return true; // Room is available
    });

    setFromDate(fromDateFormatted);
    setToDate(toDateFormatted);
    setRooms(filteredRooms);
  }

  function filterBySearch() {
    const tempRooms = duplicateRooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setRooms(tempRooms)
  }
  
  function filterByType(selectedType) {
    const tempRooms = selectedType === "all" ? duplicateRooms : duplicateRooms.filter(room => room.type.toLowerCase() === selectedType.toLowerCase());
    setRooms(tempRooms);
    setType(selectedType);
  }
  
  return (
    <StyleProvider>
      <div className='container'>
        <div className='row mt-5'>
          <div className="col-md-3">
            <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
          </div>

          <div className="col-md-5 bs">
            <input type="text" className='form-control' placeholder='search rooms' value={searchkey} onChange={(e)=>{setSearchKey(e.target.value)}} onKeyUp={filterBySearch} />
          </div>

          <div className="col-md-3">
            <select className='form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
              <option value="all">All</option>
              {Array.from(new Set(duplicateRooms.map(room => room.type))).map(type => (
                <option key={type} value={type.toLowerCase()}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          {loading ? (
            <Loader />
          ) :  (
            rooms.map(room => (
              <div className='col-md-9 mt-2' key={room._id}>
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            ))
          )}
        </div>
      </div>
    </StyleProvider>
  );
};

export default HomeScreen;
