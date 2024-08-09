import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Sidebar from '../Sidebar.js/Sidebar';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryList } from '../../redux/getCategoryListSlice';
import Modal from 'react-modal';
import { getTestList } from '../../redux/getTestListSlice';

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


const Test = () => {

    const dispatch = useDispatch();
    const [isOn, setIsOn] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [testes, setTestes] = useState([]);

    const getTestListSuccess = useSelector((state) => state.getTestListReducer.data);

    useEffect(() => {
        console.log("getTestListSuccess ===>", getTestListSuccess)
        if (getTestListSuccess != null && getTestListSuccess.status == 1) {
            setTestes(getTestListSuccess.data);
        }
    }, [getTestListSuccess]);

    useEffect(() => {
        dispatch(getTestList());
    }, []);

    const toggleSwitch = (index) => {
        setTestes(prevCategories => {
            const newTestes = [...prevCategories];
            newTestes[index].isActive = !newTestes[index].isActive;
            return newTestes;
        });
    };

    return (
        <>
            <div className="dashboard">
                <Sidebar />
                <div className='table_categories'>
                    <div className='categories_head'>
                        <h2>Test</h2>
                        <div className='search_categories_btn'>
                            <div class="box">
                                <form>
                                    <label for="search">Search</label>
                                    <input required autocomplete="off" type="search" class="input" id="search" />
                                    <span class="caret"></span>
                                </form>
                            </div>
                            <Button type='button' onClick={() => setOpen(true)}>Add Test</Button>
                        </div>
                    </div>

                    <Table responsive bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Status</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testes.map((item, index) => (
                                <tr >
                                    <td>image</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className='switch_btn_center'>
                                            <div className={`switch ${isOn ? 'on' : 'off'}`} onClick={() => toggleSwitch(index)}>
                                                <div className="toggle"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Button variant="danger" >Delete</Button>
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
                            <p>Category Image</p>
                            <div className="add_picture"
                            // onClick={handleButtonClick}
                            >
                                <AddIcon />
                            </div>
                            <p>Category Name</p>
                            <input type='text' placeholder='name' /><br />
                            <div className='submit_btn'>
                                <Button onClick={() => setOpen(false)}>Submit</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default Test;