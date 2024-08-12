import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Sidebar from '../Sidebar.js/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { getTestList } from '../../redux/getTestListSlice';
import { addTest } from '../../redux/addTestSlice';
import { updateTest } from '../../redux/updateTestSlice';
import { getCategoryList } from '../../redux/getCategoryListSlice';

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
    const [skip, setSkip] = useState(0)
    const [isOpen, setOpen] = useState(false);
    const [test, setTest] = useState([]);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");

    const getTestListSuccess = useSelector((state) => state.getTestListReducer.data);
    const addTestSuccess = useSelector((state) => state.addTestReducer.data);
    const updateTestSuccess = useSelector((state) => state.updateTestReducer.data);

    const getCategoryListSuccess = useSelector((state) => state.getCategoryListReducer.data);

    useEffect(() => {
        if (getTestListSuccess != null && getTestListSuccess.status == 1) {
            setTest(getTestListSuccess.data);
        }
    }, [getTestListSuccess]);

    useEffect(() => {
        const paylaod = {
            skip: skip,
        }
        dispatch(getTestList(paylaod));

    }, [skip]);

    const onSubmitClick = () => {
        setName("")
        setOpen(false);
        if (name.length == 0) {
            alert("Please enter name!");
        } else {
            const payload = {
                categoryId: selectedOption,
                name: name,
                image: "image",
            };
            dispatch(addTest(payload));
        }
    };

    const toggleSwitch = (item) => {
        const payload = {
            name: item.name,
            testId: item._id,
            isActive: item.isActive == 1 ? 0 : 1,
            isDeleted: item.isDeleted
        }
        dispatch(updateTest(payload))
    };

    useEffect(() => {
        if (addTestSuccess != null && addTestSuccess.status == 1) {
            const paylaod = {
                skip: skip,
            }
            dispatch(getTestList(paylaod));
        }
    }, [addTestSuccess]);


    const onDeleteClick = (item) => {
        const payload = {
            name: item.name,
            testId: item._id,
            isActive: 0,
            isDeleted: 1,
        }
        dispatch(updateTest(payload))
    }

    useEffect(() => {
        if (updateTestSuccess != null && updateTestSuccess.status == 1) {
            const paylaod = {
                skip: 0,
            }
            dispatch(getTestList(paylaod));
        }
    }, [updateTestSuccess])

    useEffect(() => {
        const paylaod = {
            skip: 0,
        }
        dispatch(getCategoryList(paylaod));
    }, [])

    useEffect(() => {
        if (getCategoryListSuccess != null && getCategoryListSuccess.status == 1) {
            setCategories(getCategoryListSuccess.data);
        }
    }, [getCategoryListSuccess]);


    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Selected option: ${selectedOption, selectedOptionName}`);
    };


    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionName, setSelectedOptionName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleInputChange = (event) => {
        setSelectedOption(event.target.value);
        setSelectedOptionName(event.target.value);
        setIsDropdownOpen(true);
    };

    const handleSelectChange = (item) => {
        setSelectedOption(item._id);
        setSelectedOptionName(item.name);
        setIsDropdownOpen(false);
    };

    const filteredOptions = getCategoryListSuccess?.data.filter(item =>
        item.name.toLowerCase().includes(selectedOption.toLowerCase())
    );

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
                            {test.map((item, index) => (
                                <tr >
                                    <td>{item.name}</td>
                                    <td>image</td>
                                    <td>
                                        <div className='switch_btn_center'>
                                            <div className={`switch ${item.isActive ? 'on' : 'off'}`} onClick={(val) => toggleSwitch(item)}>
                                                <div className="toggle"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={() => onDeleteClick(item)}>Delete</Button>
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
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="dropdown-input">Category</label><br />
                                <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                                    <input
                                        id="dropdown-input"
                                        type="text"
                                        placeholder='Select Category'
                                        value={selectedOptionName}
                                        onChange={handleInputChange}
                                        style={{ width: '100%' }}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        style={{
                                            marginLeft: '5px',
                                            position: 'absolute',
                                            right: 15,
                                            top: 20
                                        }}
                                    >
                                        ▼
                                    </Button>
                                    {isDropdownOpen && (
                                        <ul
                                            style={{
                                                position: 'absolute',
                                                zIndex: 1,
                                                backgroundColor: 'white',
                                                border: '1px solid #ccc',
                                                listStyleType: 'none',
                                                margin: 0,
                                                padding: '5px',
                                                width: '100%',
                                                maxHeight: '150px',
                                                overflowY: 'auto',
                                            }}
                                        >
                                            {filteredOptions.length > 0 ? (
                                                filteredOptions.map((item) => (
                                                    <li
                                                        key={item._id}
                                                        onClick={() => handleSelectChange(item)}
                                                        style={{ padding: '5px', cursor: 'pointer' }}
                                                    >
                                                        {item.name}
                                                    </li>
                                                ))
                                            ) : (
                                                <li style={{ padding: '5px' }}>No results found</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </form>
                            <p style={{ marginTop: 16 }}>Test Name</p>
                            <input type='text' placeholder='name' autoComplete='off' value={name} onChange={(e) => setName(e.target.value)} /><br />
                            <div className='submit_btn'>
                                <Button onClick={() => onSubmitClick()} > Submit</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default Test;