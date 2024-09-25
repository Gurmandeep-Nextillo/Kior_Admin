import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Sidebar from '../Sidebar.js/Sidebar';
import Modal from 'react-modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { addHospital } from '../../redux/addHospitalSlice';
import { updateHospital } from '../../redux/updateHospitalSlice';
import { getHospitalList } from '../../redux/getHospitalListSlice';

const modal_setting = {
    content: {
        top: "20%",
        left: "50%",
        right: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, 0)",
        maxWidth: "100%",
        width: "420px",
        borderRadius: "8px",
    },
};

const Hospital = () => {

    const dispatch = useDispatch();
    const [hospital, setHospital] = useState([]);
    const [hospitalId, setHospitalID] = useState("");
    const [skip, setSkip] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");
    const [from, setFrom] = useState(0);
    const [isOpen, setOpen] = useState(false);


    const getHospitalListSuccess = useSelector((state) => state.getHospitalListReducer.data);
    const addHospitalSuccess = useSelector((state) => state.addHospitalReducer.data);
    const updateHospitalSuccess = useSelector((state) => state.updateHospitalReducer.data);


    useEffect(() => {
        if (getHospitalListSuccess != null && getHospitalListSuccess.status == 1) {
            setHospital(getHospitalListSuccess.data);
        }
    }, [getHospitalListSuccess]);

    useEffect(() => {
        const paylaod = {
            skip: skip,
        }
        dispatch(getHospitalList(paylaod));
    }, [skip]);


    const onSubmitClick = () => {
        if (name.length == 0) {
            alert("Please enter name");
        } else if (email.length == 0) {
            alert("Please enter email");
        } else if (mobileNumber.length == 0) {
            alert("Please enter mobile number");
        } else if (address.length == 0) {
            alert("Please enter address");
        } else {
            if (from == 0) {
                const payload = {
                    name: name,
                    email: email,
                    mobileNumber: mobileNumber,
                    address: address,
                };
                setOpen(false);
                dispatch(addHospital(payload));
            }
            else {
                const payload = {
                    hospitalId: hospitalId,
                    name: name,
                    email: email,
                    mobileNumber: mobileNumber,
                    address: address,
                };
                setOpen(false);
                dispatch(updateHospital(payload))
            }
        }
    };

    const toggleSwitch = (item) => {
        const payload = {
            name: item.name,
            email: item.email,
            mobileNumber: item.mobileNumber,
            address: item.address,
            hospitalId: item._id,
            isActive: item.isActive == 1 ? 0 : 1,
            isDeleted: item.isDeleted
        }
        dispatch(updateHospital(payload))
    };

    useEffect(() => {
        console.log("addHospitalSuccess  ===>", addHospitalSuccess)
        if (addHospitalSuccess != null && addHospitalSuccess.status == 1) {
            const paylaod = {
                skip: skip,
            }
            dispatch(getHospitalList(paylaod));
        }
    }, [addHospitalSuccess]);

    const onDeleteClick = (item) => {
        const payload = {
            name: item.name,
            email: item.email,
            mobileNumber: item.mobileNumber,
            address: item.address,
            hospitalId: item._id,
            isActive: 0,
            isDeleted: 1,
        }
        dispatch(updateHospital(payload))
    }

    const onEditClick = (item) => {
        setFrom(1)
        setName(item.name)
        setEmail(item.email)
        setMobileNumber(item.mobileNumber)
        setAddress(item.address)
        setOpen(true)
    }


    const onAddClick = () => {
        setFrom(0)
        setName("")
        setEmail("")
        setMobileNumber("")
        setAddress("")
        setOpen(true)
    }

    useEffect(() => {
        if (updateHospitalSuccess != null && updateHospitalSuccess.status == 1) {
            setName("")
            setEmail("")
            setMobileNumber("")
            setAddress("")
            const paylaod = {
                skip: 0,
            }
            dispatch(getHospitalList(paylaod));
        }
    }, [updateHospitalSuccess])


    return (
        <>
            <div className="dashboard">
                <Sidebar />
                <div className='table_categories'>
                    <div className='categories_head'>
                        <div className='content_dropdown'>
                            <h2>Hospital</h2>
                        </div>
                        <div className='search_categories_btn'>
                            <div class="box">
                                <form>
                                    <label for="search">Search</label>
                                    <input required autocomplete="off" type="search" class="input" id="search" />
                                    <span class="caret"></span>
                                </form>
                            </div>
                            <Button type='button' onClick={() => onAddClick()}>Add Hospital</Button>
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
                            {hospital.length > 0 && hospital.map((item) => (
                                <tr >
                                    <td>{item.name}</td>
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
                                <div className='flex_input_box'>
                                    <div className='head_input_flex'>
                                        <p>Name <span>*</span></p>
                                        <input type='text' placeholder='Name' autoComplete='off' value={name} onChange={(e) => setName(e.target.value)} /><br />
                                    </div>
                                    <div className='head_input_flex'>
                                        <p>Email <span>*</span></p>
                                        <input type='text' placeholder='Email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                                    </div>
                                </div>

                                <div className='flex_input_box'>
                                    <div className='head_input_flex'>
                                        <p style={{ marginTop: 8 }}>Mobile Number <span>*</span></p>
                                        <input type='number' placeholder='Mobile Number' autoComplete='off' value={mobileNumber} onChange={(v) => setMobileNumber(v.target.value)} /><br />
                                    </div>
                                    <div className='head_input_flex'>
                                        <p style={{ marginTop: 8 }}>Address <span>*</span></p>
                                        <input type='text' placeholder='Address' autoComplete='off' value={address} onChange={(e) => setAddress(e.target.value)} /><br />
                                    </div>
                                </div>
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

export default Hospital;