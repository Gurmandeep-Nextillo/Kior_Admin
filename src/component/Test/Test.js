import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Sidebar from '../Sidebar.js/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { getTestList } from '../../redux/getTestListSlice';
import { addTest } from '../../redux/addTestSlice';
import { updateTest } from '../../redux/updateTestSlice';
import { getCategoryList } from '../../redux/getCategoryListSlice';
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


const Test = () => {

    const dispatch = useDispatch();
    const [skip, setSkip] = useState(0)
    const [isOpen, setOpen] = useState(false);
    const [test, setTest] = useState([]);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [from, setFrom] = useState(0)
    const [testId, setTestId] = useState()

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
        setOpen(false);
        if (selectedOptionName.length == 0) {
            alert("Please select your Category!");
        } else if (name.length == 0) {
            alert("Please enter name!");
        } else if (amount.length == 0) {
            alert("Please enter amount");
        } else {
            if (from == 0) {
                const payload = {
                    name: name,
                    amount: amount,
                };

                dispatch(addTest(payload));
            }
            else {
                const payload = {
                    testId: testId,
                    name: name,
                    amount: amount,
                };
                dispatch(updateTest(payload))
            }
        }
    };

    const toggleSwitch = (item) => {
        const payload = {
            name: item.name,
            amount: item.amount,
            testId: item._id,
            isActive: item.isActive == 1 ? 0 : 1,
            isDeleted: item.isDeleted
        }
        dispatch(updateTest(payload))
    };

    useEffect(() => {
        console.log("addTestSuccess  ===>", addTestSuccess)
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
            amount: item.amount,
            testId: item._id,
            isActive: 0,
            isDeleted: 1,
        }
        dispatch(updateTest(payload))
    }

    const onEditClick = (item) => {
        setFrom(1)
        setName(item.name);
        setTestId(item._id);
        setAmount(item.amount);
        setOpen(true);
    }

    const onAddClick = () => {
        setFrom(0)
        setName("");
        setAmount("");
        setOpen(true);
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


    const [selected, setSelected] = useState('Aaaaa');

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
                            <h2>Test</h2>
                            <div className="selected_otion">
                                <select value={selected} onChange={handleSelect} className="custom-dropdown-toggle">
                                    <option value="Aaaaa">Aaaaa</option>
                                    <option value="Bbbbb">Bbbbb</option>
                                    <option value="Ccccc">Ccccc</option>
                                </select>
                            </div>
                        </div>
                        <div className='search_categories_btn'>
                            <div class="box">
                                <form>
                                    <label for="search">Search</label>
                                    <input required autocomplete="off" type="search" class="input" id="search" />
                                    <span class="caret"></span>
                                </form>
                            </div>
                            <Button type='button' onClick={() => onAddClick()}>Add Test</Button>
                        </div>
                    </div>

                    <Table responsive bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {test.length > 0 &&
                                test.map((item) => (
                                    <tr >
                                        <td>{item.name}</td>
                                        <td>{item.amount}</td>
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
                            <p style={{ marginTop: 16 }}>Amount</p>
                            <input type='number' placeholder='amount' autoComplete='off' value={amount} onChange={(v) => setAmount(v.target.value)} /><br />

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