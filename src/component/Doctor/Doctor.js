import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Sidebar from '../Sidebar.js/Sidebar';
import Modal from 'react-modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorList } from '../../redux/getDoctorListSlice';
import { addDoctor } from '../../redux/addDoctorSlice';
import { updateDoctor } from '../../redux/updateDoctorSlice';

const modal_setting = {
    content: {
        top: "30%",
        left: "50%",
        right: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, 0)",
        maxWidth: "100%",
        width: "420px",
        borderRadius: "8px",
    },
};

const Doctor = () => {

    const dispatch = useDispatch();
    const [doctor, setDoctor] = useState([]);
    const [doctorId, setDoctorID] = useState("");
    const [skip, setSkip] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [from, setFrom] = useState(0);
    const [isOpen, setOpen] = useState(false);


    const getDoctorListSuccess = useSelector((state) => state.getDoctorListReducer.data);
    const addDoctorSuccess = useSelector((state) => state.addDoctorReducer.data);
    const updateDoctorSuccess = useSelector((state) => state.updateDoctorReducer.data);


    useEffect(() => {
        if (getDoctorListSuccess != null && getDoctorListSuccess.status == 1) {
            setDoctor(getDoctorListSuccess.data);
        }
    }, [getDoctorListSuccess]);

    useEffect(() => {
        const paylaod = {
            skip: skip,
        }
        dispatch(getDoctorList(paylaod));
    }, [skip]);

    const onSubmitClick = () => {
        setOpen(false);
        if (firstName.length == 0) {
            alert("Please enter firstName");
        } else if (lastName.length == 0) {
            alert("Please enter lastName");
        } else if (email.length == 0) {
            alert("Please enter email");
        } else {
            if (from == 0) {
                const payload = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                };

                dispatch(addDoctor(payload));
            }
            else {
                const payload = {
                    doctorId: doctorId,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                };
                dispatch(updateDoctor(payload))
            }
        }
    };

    const toggleSwitch = (item) => {
        const payload = {
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            doctorId: item._id,
            isActive: item.isActive == 1 ? 0 : 1,
            isDeleted: item.isDeleted
        }
        dispatch(updateDoctor(payload))
    };

    useEffect(() => {
        console.log("addDoctorSuccess  ===>", addDoctorSuccess)
        if (addDoctorSuccess != null && addDoctorSuccess.status == 1) {
            const paylaod = {
                skip: skip,
            }
            dispatch(getDoctorList(paylaod));
        }
    }, [addDoctorSuccess]);

    const onDeleteClick = (item) => {
        const payload = {
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            doctorId: item._id,
            isActive: 0,
            isDeleted: 1,
        }
        dispatch(updateDoctor(payload))
    }

    const onEditClick = (item) => {
        setFrom(1)
        setFirstName(item.firstName)
        setLastName(item.lastName)
        setEmail(item.email)
        setDoctorID(item._id)
        setOpen(true)
    }

    const onAddClick = () => {
        setFrom(0)
        setFirstName("")
        setLastName("")
        setEmail("")
        setOpen(true)
    }

    useEffect(() => {
        console.log("updateDoctorSuccess  ===>", updateDoctorSuccess)
        if (updateDoctorSuccess != null && updateDoctorSuccess.status == 1) {
            setFirstName("")
            setLastName("")
            const paylaod = {
                skip: 0,
            }
            dispatch(getDoctorList(paylaod));
        }
    }, [updateDoctorSuccess])

    return (
        <>
            <div className="dashboard">
                <Sidebar />
                <div className='table_categories'>
                    <div className='categories_head'>
                        <div className='content_dropdown'>
                            <h2>Doctor</h2>
                        </div>
                        <div className='search_categories_btn'>
                            <div class="box">
                                <form>
                                    <label for="search">Search</label>
                                    <input required autocomplete="off" type="search" class="input" id="search" />
                                    <span class="caret"></span>
                                </form>
                            </div>
                            <Button type='button' onClick={() => onAddClick()}>Add Doctor</Button>
                        </div>
                    </div>

                    <Table responsive bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Option</th>
                            </tr>
                        </thead>

                        <tbody>
                            {doctor.length > 0 && doctor.map((item) => (
                                <tr >
                                    <td>{item.firstName + " " + item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <div className='switch_btn_center'>
                                            <div className={`switch ${item.isActive ? 'on' : 'off'}`} onClick={(val) => toggleSwitch(item)}>
                                                <div className="toggle"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <EditIcon onClick={() => onEditClick(item)} />
                                        <DeleteForeverIcon onClick={() => onDeleteClick(item)} style={{ marginLeft: 20 }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Modal
                        isOpen={isOpen}
                        style={modal_setting}
                        onRequestClose={() => setOpen(false)}
                    >
                        <div className='modal_content_center'>
                            <form>
                                {/* <div className='flex_input_box'> */}
                                <p>First Name</p>
                                <input type='text' placeholder='First Name' autoComplete='off' value={firstName} onChange={(e) => setFirstName(e.target.value)} /><br />

                                <p style={{ marginTop: 16 }}>Last Name</p>
                                <input type='text' placeholder='Last Name' autoComplete='off' value={lastName} onChange={(e) => setLastName(e.target.value)} /><br />
                                {/* </div> */}

                                <p style={{ marginTop: 16 }}>Email</p>
                                <input type='text' placeholder='Email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                            </form>

                            <div className='submit_btn'>
                                <Button onClick={() => onSubmitClick()}> Submit</Button>
                            </div>
                        </div>
                    </Modal>
                </div >
            </div >
        </>
    );
};

export default Doctor;