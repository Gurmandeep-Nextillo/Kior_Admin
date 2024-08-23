import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar.js/Sidebar';
import { Button, Table } from 'react-bootstrap';
import { getPackageList } from '../../redux/getPackageListSlice';
import { addPackage } from '../../redux/addPackageListSlice';
import { updatePackage } from '../../redux/updatePackageSlice';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { getTestList } from '../../redux/getTestListSlice';
import AddIcon from '@mui/icons-material/Add';
import { uploadFile } from '../../redux/uploadFileSlice';

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

const Packages = () => {

    const dispatch = useDispatch();
    const [skip, setSkip] = useState(0)
    const [isOpen, setOpen] = useState(false);
    const [packages, setPackage] = useState([]);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [from, setFrom] = useState(0)
    const [tests, setTests] = useState([])
    const [packageId, setPackageId] = useState()
    const [image, setImage] = useState(null)
    const [imageSrc, setImageSrc] = useState(null);
    const [imageLocation, setImageLocation] = useState("");

    const getPackageListSuccess = useSelector((state) => state.getPackageListReducer.data);
    const addPackageSuccess = useSelector((state) => state.addPackageReducer.data);
    const updatePackageSuccess = useSelector((state) => state.updatePackageReducer.data);
    const getTestListSuccess = useSelector((state) => state.getTestListReducer.data);
    const uploadFileResponse = useSelector((state) => state.uploadFileReducer.data);


    useEffect(() => {
        console.log("getPackageListSuccess ===>", getPackageListSuccess)
        if (getPackageListSuccess != null && getPackageListSuccess.status == 1) {
            setPackage(getPackageListSuccess.data);
        }
    }, [getPackageListSuccess]);

    useEffect(() => {
        const paylaod = {
            skip: skip,
        }
        dispatch(getPackageList(paylaod));
    }, [skip]);

    useEffect(() => {
        const paylaod = {
            skip: 0,
        }
        dispatch(getTestList(paylaod));
    }, [])

    useEffect(() => {
        if (getTestListSuccess != null && getTestListSuccess.status == 1) {
            setTests(getTestListSuccess.data)
        }
    }, [getTestListSuccess])



    const onSubmitClick = () => {
        setOpen(false);
        if (from == 0) {
            if (image != null) {
                if (name.length == 0) {
                    alert("Please enter name!");
                } if (amount.length == 0) {
                    alert("Please enter amount");
                } else {
                    dispatch(uploadFile(image));
                }
            }
            else {
                alert("Please Select Image First")
            }
        } else {

            if (image != null) {
                if (name.length == 0) {
                    alert("Please enter name!");
                } if (amount.length == 0) {
                    alert("Please enter amount");
                } else {
                    dispatch(uploadFile(image));
                }
            }
            else {
                const payload = {
                    packageId: packageId,
                    name: name,
                    amount: amount,
                    image: imageLocation,
                };
                dispatch(updatePackage(payload))
            }
        }
    };

    const toggleSwitch = (item) => {
        const payload = {
            name: item.name,
            amount: item.amount,
            packageId: item._id,
            isActive: item.isActive == 1 ? 0 : 1,
            isDeleted: item.isDeleted
        }
        dispatch(updatePackage(payload))
    };

    useEffect(() => {
        if (addPackageSuccess != null && addPackageSuccess.status == 1) {
            const paylaod = {
                skip: skip,
            }
            dispatch(getPackageList(paylaod));
        }
    }, [addPackageSuccess]);


    const onDeleteClick = (item) => {
        const payload = {
            name: item.name,
            amount: item.amount,
            packageId: item._id,
            isActive: 0,
            isDeleted: 1,
        }
        dispatch(updatePackage(payload))
    }

    const onEditClick = (item) => {
        setFrom(1)
        setName(item.name)
        setPackageId(item._id)
        setImageLocation(item.image)
        setAmount(item.amount)
        setOpen(true)
        setImageSrc(null)
        setImage(null)
    }

    const onAddClick = () => {
        setFrom(0)
        setName("")
        setImageLocation("")
        setImageSrc(null)
        setImage(null)
        setAmount("")
        setOpen(true)
    }

    useEffect(() => {
        if (updatePackageSuccess != null && updatePackageSuccess.status == 1) {
            setImageLocation("")
            setName("")
            const paylaod = {
                skip: 0,
            }
            dispatch(getPackageList(paylaod));
        }
    }, [updatePackageSuccess])

    useEffect(() => {
        const paylaod = {
            skip: 0,
        }
        dispatch(getPackageList(paylaod));
    }, [])

    useEffect(() => {
        console.log("getPackageListSuccess ===>", getPackageListSuccess)
        if (getPackageListSuccess != null && getPackageListSuccess.status == 1) {
            setPackage(getPackageListSuccess.data);
        }
    }, [getPackageListSuccess]);


    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const selectedOptionsNames = selectedOptions.map(option => option.name).join(', ');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSelectChange = (item) => {
        const isSelected = selectedOptions.some((option) => option._id === item._id);
        if (isSelected) {
            setSelectedOptions(selectedOptions.filter((option) => option._id !== item._id));
        } else {
            setSelectedOptions([...selectedOptions, item]);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
                setImageLocation("")
            };
            reader.readAsDataURL(file);

            setImage(file)
        }
    };

    useEffect(() => {
        if (uploadFileResponse != null && uploadFileResponse.Location != "") {
            if (from == 0) {
                const payload = {
                    name: name,
                    amount: amount,
                    image: uploadFileResponse.Location,
                };
                dispatch(addPackage(payload));
            }
            else {
                const payload = {
                    packageId: packageId,
                    name: name,
                    amount: amount,
                    image: uploadFileResponse.Location,
                };
                dispatch(updatePackage(payload));
            }
        }
    }, [uploadFileResponse])

    return (
        <>
            <div className="dashboard">
                <Sidebar />
                <div className='table_categories'>
                    <div className='categories_head'>
                        <h2>Package</h2>
                        <div className='search_categories_btn'>
                            <div class="box">
                                <form>
                                    <label for="search">Search</label>
                                    <input required autocomplete="off" type="search" class="input" id="search" />
                                    <span class="caret"></span>
                                </form>
                            </div>
                            <Button type='button' onClick={() => onAddClick()}>Add Package</Button>
                        </div>
                    </div>

                    <Table responsive bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages.length > 0 && packages.map((item) => (
                                <tr >
                                    <td>{item.name}</td>
                                    <td>{item.image != "image" && <img src={item.image} alt="Uploaded" style={{ maxWidth: '100%' }} />}</td>
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
                                        < DeleteForeverIcon onClick={() => onDeleteClick(item)} style={{ marginLeft: 20 }} />
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
                            <p>Image</p>
                            <div className="add_picture">
                                <input type="file" onChange={handleFileChange} className='file_upload' id='fileInput' />
                                <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                                    {(imageSrc || imageLocation != "") ? <img src={imageSrc != null ? imageSrc : imageLocation} alt="Uploaded" style={{ maxWidth: '100%' }} /> : <AddIcon />}
                                </label>
                            </div>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <label htmlFor="dropdown-input">Test</label><br />
                                <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                                    <input
                                        id="dropdown-input"
                                        type="text"
                                        placeholder='Select test'
                                        value={selectedOptionsNames}
                                        onChange={handleInputChange}
                                        style={{ width: '100%' }}
                                        readOnly
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
                                            {tests.length > 0 ? (
                                                tests.map((item) => (
                                                    <div>
                                                        <li
                                                            key={item._id}
                                                            onClick={() => handleSelectChange(item)}
                                                            style={{
                                                                padding: '5px',
                                                                cursor: 'pointer',
                                                                marginBottom: 4,
                                                                backgroundColor: selectedOptions.some((option) => option._id === item._id) ? '#d4d4d4' : 'transparent'
                                                            }}
                                                        >
                                                            {item.name}
                                                        </li>
                                                    </div>
                                                ))
                                            ) : (
                                                <li style={{ padding: '5px' }}>No results found</li>
                                            )}
                                            <div className='button_div'>
                                                <Button onClick={() => setIsDropdownOpen(false)} className='button_ok'>OK</Button>
                                            </div>

                                        </ul>
                                    )}
                                </div>
                            </form>
                            <p style={{ marginTop: 16 }}>Name</p>
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

export default Packages;