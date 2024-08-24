import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Sidebar from '../Sidebar.js/Sidebar';
import Modal from 'react-modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

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

    const [isOpen, setOpen] = useState(false);

    const onAddClick = () => {
        setOpen(true);
    }

    const [selected, setSelected] = useState('Aaa');

    const handleSelect = (event) => {
        setSelected(event.target.value);
    };

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
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Option</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr >
                                <td>Aaa</td>
                                <td>example@gmail.com</td>
                                <td>9876543210</td>
                                <td>Mohali</td>
                                <td>
                                    <div className='switch_btn_center'>
                                        <div className="switch">
                                            <div className="toggle"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <EditIcon />
                                    <DeleteForeverIcon style={{ marginLeft: 20 }} />
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <Modal
                        isOpen={isOpen}
                        style={modal_setting}
                        onRequestClose={() => setOpen(false)}
                    >
                        <div className='modal_content_center'>
                            <form>
                                <p>Name</p>
                                <input type='text' placeholder='Name' autoComplete='off' /><br />

                                <p style={{ marginTop: 16 }}>Phone Number</p>
                                <input type='text' placeholder='Phone Number' autoComplete='off' /><br />

                                <p style={{ marginTop: 16 }}>Address</p>
                                <input type='text' placeholder='Address' autoComplete='off' /><br />

                                <p style={{ marginTop: 16 }}>Doctors</p>
                                <div className="selected_otion">
                                    <select value={selected} onChange={handleSelect} className="custom-dropdown-toggle">
                                        <option value="Aaa">Aaa</option>
                                        <option value="Bbb">Bbb</option>
                                        <option value="Ccc">Ccc</option>
                                    </select>
                                </div>
                            </form>

                            <div className='submit_btn'>
                                <Button> Submit</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default Patient;