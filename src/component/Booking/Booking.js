import React, { useDebugValue, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Sidebar from '../Sidebar.js/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingRecord } from '../../redux/getBookingRecordSlice';


const Booking = () => {

    const navigation = useNavigate();
    const dispatch = useDispatch();

    const [bookings, setBookings] = useState([])
    const getBookingListSuccess = useSelector((state) => state.getBookingRecordReducer.data);



    useEffect(() => {
        console.log("Boooking")
        dispatch(getBookingRecord())
    }, [])

    useEffect(() => {
        console.log("getBookingListSuccess", getBookingListSuccess)
        if (getBookingListSuccess != null && getBookingListSuccess.status == 1) {
            setBookings(getBookingListSuccess.data)
        }
    }, [getBookingListSuccess])

    return (
        <>
            <div className="dashboard">
                <Sidebar />
                <div className='table_categories'>
                    <div className='categories_head'>
                        <div className='content_dropdown'>
                            <h2>Booking</h2>
                        </div>
                        <div className='search_categories_btn'>
                            <div class="box">
                                <form>
                                    <label for="search">Search</label>
                                    <input required autocomplete="off" type="search" class="input" id="search" />
                                    <span class="caret"></span>
                                </form>
                            </div>
                            <Button type='button' onClick={() => navigation('/add_new_patient')}>Add New</Button>
                        </div>
                    </div>

                    <Table responsive bordered>
                        <thead className='tabel_head'>
                            <tr>
                                <th>Name</th>
                                <th>Test/Package</th>
                                <th>Amount</th>
                                <th>Discount</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookings.length > 0 && bookings.map((item) => (
                                <tr >
                                    <td>{item.userId.firstName + " " + item.userId.lastName}</td>
                                    <td>sfd</td>
                                    <td>{item.amount}</td>
                                    <td>{item.discountAmount}</td>
                                    <td>{item.bookingDate}</td>
                                    {/* <td>
                                        <div className='switch_btn_center'>
                                            <div className={`switch ${item.isActive ? 'on' : 'off'}`} onClick={() => toggleSwitch(item)}>
                                                <div className="toggle"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <EditIcon onClick={() => onEditClick(item)} />
                                        <DeleteForeverIcon onClick={() => onDeleteClick(item)} style={{ marginLeft: 20 }} />
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div >
            </div >
        </>
    );
};

export default Booking;