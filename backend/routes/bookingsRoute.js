const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const dayjs = require("dayjs");
const Room = require("../models/room");
router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays } = req.body;

  try {
    const newbooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate: dayjs(fromdate).format("DD-MM-YYYY"),
      todate: dayjs(todate).format("DD-MM-YYYY"),
      totalamount,
      totaldays,
      transactionId: "1234",
    });
    const booking = await newbooking.save();
    const roomtemp = await Room.findOne({ _id: room._id });
    roomtemp.currentbookings.push({
      bookingid: booking._id,
      fromdate: dayjs(fromdate).format("DD-MM-YYYY"),
      todate: dayjs(todate).format("DD-MM-YYYY"),
      userid: userid,
      status: booking.status,
    });
    await roomtemp.save()
    res.send("Room booked successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }

  router.post('/getbookingsbyuserid', async(req, res) => {
    const userid = req.body.userid
    
    try {
      const bookings = await Booking.find({ userid: userid })
      res.send(bookings)
    } catch (error) {
      return res.status(400).json({ error })
    }
})


  router.post('/cancelbooking', async(req, res) => {
  
    const { bookingid, roomid } = req.body
    
    try {
      const bookingitem = await Booking.findOne({ _id: bookingid })
      bookingitem.status = 'canceled'
await bookingitem.save()
      const room = await Room.findOne({ _id: roomid })
      const bookings = room.currentbookings

      const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid)
      room.currentbookings = temp

      await room.save()

res.send('Your booking canceled successfully')

    } catch (error) {
      return res.status(400).json({error})
      
    }


})  
  

});

module.exports = router;
