import React, { useState } from "react";
import { Button, Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const Room = ({ room, fromdate, todate }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg" alt={room.name} />
      </div>
      <div className="col-md-7 text-left">
        <b>
          <h1>{room.name}</h1>
          <p>Max Count: {room.maxcount}</p>
          <p>Phone Number: {room.phonenumber}</p>
          <p>Type: {room.type}</p>
          {fromdate && <p>From Date: {fromdate}</p>}
          {todate && <p>To Date: {todate}</p>}
        </b>

        <div style={{ float: "right" }}>
          {fromdate && todate && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <button className="btn btn-primary m-2">Book Now</button>
            </Link>
          )}
          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 bigimg"
                  src={url}
                  alt={`Room ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Room;
