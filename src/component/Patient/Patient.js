import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Sidebar from '../Sidebar.js/Sidebar';
import Modal from 'react-modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientList } from '../../redux/getPatientListSlice';
import { addPatient } from '../../redux/addPatientSlice';
import { updatePatient } from '../../redux/updatePatientSlice';

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

const Patient = () => {

    const dispatch = useDispatch();
    const [patient, setPatient] = useState([]);
    const [patientId, setPatientID] = useState("");
    const [skip, setSkip] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");
    const [from, setFrom] = useState(0);
    const [isOpen, setOpen] = useState(false);


    const getPatientListSuccess = useSelector((state) => state.getPatientListReducer.data);
    const addPatientSuccess = useSelector((state) => state.addPatientReducer.data);
    const updatePatientSuccess = useSelector((state) => state.updatePatientReducer.data);


    useEffect(() => {
        if (getPatientListSuccess != null && getPatientListSuccess.status == 1) {
            setPatient(getPatientListSuccess.data);
        }
    }, [getPatientListSuccess]);

    useEffect(() => {
        const paylaod = {
            skip: skip,
        }
        dispatch(getPatientList(paylaod));
    }, [skip]);


    const onSubmitClick = () => {
        setOpen(false);
        if (firstName.length == 0) {
            alert("Please enter firstName");
        } else if (lastName.length == 0) {
            alert("Please enter lastName");
        } else if (email.length == 0) {
            alert("Please enter email");
        } else if (mobileNumber.length == 0) {
            alert("Please enter mobile number");
        } else if (address.length == 0) {
            alert("Please enter address");
        } else {
            if (from == 0) {
                const payload = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    mobileNumber: mobileNumber,
                    address: address,
                };

                dispatch(addPatient(payload));
            }
            else {
                const payload = {
                    patientId: patientId,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    mobileNumber: mobileNumber,
                    address: address,
                };
                dispatch(updatePatient(payload))
            }
        }
    };

    const toggleSwitch = (item) => {
        const payload = {
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            mobileNumber: item.mobileNumber,
            address: item.address,
            patientId: item._id,
            isActive: item.isActive == 1 ? 0 : 1,
            isDeleted: item.isDeleted
        }
        console.log("payload ==>", payload)
        dispatch(updatePatient(payload))
    };

    useEffect(() => {
        console.log("addPatientSuccess  ===>", addPatientSuccess)
        if (addPatientSuccess != null && addPatientSuccess.status == 1) {
            const paylaod = {
                skip: skip,
            }
            dispatch(getPatientList(paylaod));
        }
    }, [addPatientSuccess]);

    const onDeleteClick = (item) => {
        const payload = {
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            mobileNumber: item.mobileNumber,
            address: item.address,
            patientId: item._id,
            isActive: 0,
            isDeleted: 1,
        }
        dispatch(updatePatient(payload))
    }

    const onEditClick = (item) => {
        setFrom(1)
        setFirstName(item.firstName)
        setLastName(item.lastName)
        setEmail(item.email)
        setMobileNumber(item.mobileNumber)
        setAddress(item.address)
        setOpen(true)
    }


    const onAddClick = () => {
        setFrom(0)
        setFirstName("")
        setLastName("")
        setEmail("")
        setMobileNumber("")
        setAddress("")
        setOpen(true)
    }

    useEffect(() => {
        if (updatePatientSuccess != null && updatePatientSuccess.status == 1) {
            setFirstName("")
            setLastName("")
            setMobileNumber("")
            setAddress("")
            const paylaod = {
                skip: 0,
            }
            dispatch(getPatientList(paylaod));
        }
    }, [updatePatientSuccess])


    return (
        <>
            <div className="dashboard">
                <Sidebar />
                <div className='table_categories'>
                    <div className='categories_head'>
                        <div className='content_dropdown'>
                            <h2>Patient</h2>
                        </div>
                        <div className='search_categories_btn'>
                            <div class="box">
                                <form>
                                    <label for="search">Search</label>
                                    <input required autocomplete="off" type="search" class="input" id="search" />
                                    <span class="caret"></span>
                                </form>
                            </div>
                            <Button type='button' onClick={() => onAddClick()}>Add Patient</Button>
                        </div>
                    </div>

                    <Table responsive bordered>
                        <thead className='tabel_head'>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Option</th>
                            </tr>
                        </thead>

                        <tbody>
                            {patient.length > 0 && patient.map((item) => (
                                <tr >
                                    <td>{item.firstName + " " + item.lastName}</td>
                                    <td> {item.email}</td>
                                    <td>{item.mobileNumber}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <div className='switch_btn_center'>
                                            <div className={`switch ${item.isActive ? 'on' : 'off'}`} onClick={() => toggleSwitch(item)}>
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
                                <p>First Name</p>
                                <input type='text' placeholder='First Name' autoComplete='off' value={firstName} onChange={(e) => setFirstName(e.target.value)} /><br />

                                <p style={{ marginTop: 16 }}>Last Name</p>
                                <input type='text' placeholder='Last Name' autoComplete='off' value={lastName} onChange={(e) => setLastName(e.target.value)} /><br />

                                <p style={{ marginTop: 16 }}>Email</p>
                                <input type='text' placeholder='Email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} /><br />

                                <p style={{ marginTop: 16 }}>Mobile Number</p>
                                <input type='number' placeholder='Mobile Number' autoComplete='off' value={mobileNumber} onChange={(v) => setMobileNumber(v.target.value)} /><br />

                                <p style={{ marginTop: 16 }}>Address</p>
                                <input type='text' placeholder='Address' autoComplete='off' value={address} onChange={(e) => setAddress(e.target.value)} /><br />

                                <p style={{ marginTop: 16 }}>Reffered By</p>
                                <select>
                                    <option>consultant</option>
                                    doctor
                                    <option>Corporate</option>
                                    Hospital
                                </select>

                            </form>

                            <div className='submit_btn'>
                                <Button onClick={() => onSubmitClick()}> Submit</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default Patient;