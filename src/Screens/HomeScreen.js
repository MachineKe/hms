import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../Components/Room';
import Loader from '../Components/Loader';
import Error from '../Components/Error';

const HomeScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/rooms/getallrooms');
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className='container'>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader/>
        ) : (
          rooms.length > 0 ? (
            rooms.map(room => (
              <div className='col-md-9 mt-2' key={room._id}>
                <Room room={room}/>
              </div>
            ))
          ) : (
            <Error/>
          )
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
