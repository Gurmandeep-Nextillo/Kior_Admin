import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar.js/Sidebar';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientList } from '../../redux/getPatientListSlice';
import { getDoctorList } from '../../redux/getDoctorListSlice';
import { getPackageList } from '../../redux/getPackageListSlice';
import { getTestList } from '../../redux/getTestListSlice';
import { getHospitalList } from '../../redux/getHospitalListSlice';
import { postBookingRecord } from '../../redux/postBookingRecordSlice';

const AddNewPatient = () => {

    const dispatch = useDispatch()
    //Patient Fields
    const [patients, setPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [patientId, setPatientId] = useState("")
    const [patientFirstName, setPatientFirstName] = useState("")
    const [patientLastName, setPatientLastName] = useState("")
    const [patientEmail, setPatientEmail] = useState("")
    const [patientMobile, setPatientMobile] = useState("")
    const [patientAddress, setPatientAddress] = useState("")
    const [patientGender, setPatientGender] = useState("")
    const [tests, setTests] = useState("")
    const [packages, setPackage] = useState("")
    const [hospital, setHospital] = useState("")

    const [amount, setAmount] = useState(0)
    const [discount, setDiscount] = useState(0);
    const [reffered, setReffered] = useState(1)

    //Doctor Fields
    const [doctors, setDoctors] = useState([])
    const [doctorFirstName, setDoctorFirstName] = useState("")
    const [doctorLastName, setDoctorLastName] = useState("")
    const [doctortEmail, setDoctorEmail] = useState("")
    const [doctorMobileNumber, setDoctorMobileNumber] = useState("")
    const [doctorAddress, setDoctorAddress] = useState("")
    const [doctorGender, setDoctorGender] = useState("")

    //Hospital Fields
    const [hospitalName, setHospitalName] = useState("")
    const [hospitalEmail, setHospitalEmail] = useState("")
    const [hospitalMobileNumber, setHospitalMobileNumber] = useState("")
    const [hospitalAddress, setHospitalAddress] = useState("")

    const getPatientListResponse = useSelector((state) => state.getPatientListReducer.data);
    const getDoctorListResponse = useSelector((state) => state.getDoctorListReducer.data);
    const getTestListResponse = useSelector((state) => state.getTestListReducer.data);
    const getPackageListResponse = useSelector((state) => state.getPackageListReducer.data);
    const getHospitalListResponse = useSelector((state) => state.getHospitalListReducer.data);


    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionName, setSelectedOptionName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const [selectedOptionPackage, setSelectedOptionPackage] = useState('');
    const [selectedOptionNamePackage, setSelectedOptionNamePackage] = useState('');
    const [isDropdownOpenPackage, setIsDropdownOpenPackage] = useState(false);

    const [selectedOptionDoctor, setSelectedOptionDoctor] = useState('');
    const [selectedOptionNameDoctor, setSelectedOptionNameDoctor] = useState('');
    const [isDropdownOpenDoctor, setIsDropdownOpenDoctor] = useState(false);

    const [selectedOptionHospital, setSelectedOptionHospital] = useState('');
    const [selectedOptionNameHospital, setSelectedOptionNameHospital] = useState('');
    const [isDropdownOpenHospital, setIsDropdownOpenHospital] = useState(false);


    useEffect(() => {

        if (selectedOptionName === "") {

            setSelectedOption("");
            setPatientFirstName("")
            setPatientLastName("")
            setPatientAddress("")
            setPatientEmail("")
            setPatientMobile("")

        }

    }, [selectedOptionName])

    const handleInputChange = (event) => {
        // setSelectedOption(event.target.value);
        setSelectedOptionName(event.target.value);
        setIsDropdownOpen(true);
    };

    const handleInputChangePackage = (event) => {
        // setSelectedOption(event.target.value);
        setSelectedOptionNamePackage(event.target.value);
        setIsDropdownOpenPackage(true);
    };

    const handleInputChangeHospital = (event) => {
        // setSelectedOption(event.target.value);
        setSelectedOptionNameHospital(event.target.value);
        setIsDropdownOpenHospital(true);
    };

    const handleSelectChange = (item) => {
        setSelectedOption(item._id);
        setSelectedOptionName(item.firstName + " " + item.lastName);
        setPatientFirstName(item.firstName)
        setPatientLastName(item.lastName)
        setPatientAddress(item.address)
        setPatientEmail(item.email)
        setPatientMobile(item.mobileNumber)
        setIsDropdownOpen(false);
    };

    const filteredOptions = getPatientListResponse?.data.filter(item =>
        (item.firstName + item.lastName).toLowerCase().includes(selectedOptionName.toLowerCase())
    );

    const filteredOptionsDoctor = getDoctorListResponse?.data.filter(item =>
        (item.firstName + item.lastName).toLowerCase().includes(selectedOptionNameDoctor.toLowerCase())
    );

    const filteredOptionsPackage = getPackageListResponse?.data.filter(item =>
        item.name.toLowerCase().includes(selectedOptionNamePackage.toLowerCase())
    );

    const filteredOptionsHospital = getHospitalListResponse?.data.filter(item =>
        item.name.toLowerCase().includes(selectedOptionNameHospital.toLowerCase())
    );


    const handleInputChangeDoctor = (event) => {
        // setSelectedOption(event.target.value);
        setSelectedOptionNameDoctor(event.target.value);
        setIsDropdownOpenDoctor(true);
    };

    const handleSelectChangeDoctor = (item) => {
        setSelectedOptionDoctor(item._id);
        setSelectedOptionNameDoctor(item.firstName + " " + item.lastName);
        setDoctorFirstName(item.firstName)
        setDoctorLastName(item.lastName)
        setDoctorAddress(item.address)
        setDoctorEmail(item.email)
        setDoctorMobileNumber(item.mobileNumber)
        setIsDropdownOpenDoctor(false);
    };

    const handleSelectChangeHospital = (item) => {
        setSelectedOptionHospital(item._id);
        setSelectedOptionNameHospital(item.name);
        setHospitalName(item.name)
        setHospitalEmail(item.email)
        setHospitalMobileNumber(item.mobileNumber)
        setHospitalAddress(item.address)
        setIsDropdownOpenHospital(false);
    };

    const handleSelectChangePackage = (item) => {
        setSelectedOptionPackage(item._id);
        setSelectedOptionNamePackage(item.name);
        setIsDropdownOpenPackage(false);
        setAmount(item.amount)
        setDiscount(item.discount)
    };


    useEffect(() => {
        const paylaod = {
            skip: -1,
        }
        dispatch(getPatientList(paylaod));
        dispatch(getDoctorList(paylaod));
        dispatch(getPackageList(paylaod));
        dispatch(getTestList(paylaod));
        dispatch(getHospitalList(paylaod));

    }, [])

    useEffect(() => {
        console.log("getPatientListResponse ===> ", getPatientListResponse)
        if (getPatientListResponse != null && getPatientListResponse.status == 1) {
            setPatients(getPatientListResponse.data)
        }
    }, [getPatientListResponse])


    useEffect(() => {
        console.log("getDoctorListResponse ===> ", getDoctorListResponse)
        if (getDoctorListResponse != null && getDoctorListResponse.status == 1) {
            setDoctors(getDoctorListResponse.data)
        }
    }, [getDoctorListResponse])


    const [selectedOptionsTest, setSelectedOptionsTest] = useState([]);
    const [isDropdownOpenTest, setIsDropdownOpenTest] = useState(false);
    const [inputValueTest, setInputValueTest] = useState('');

    const selectedOptionsNamesTest = selectedOptionsTest.map(option => option.name).join(', ');

    const handleInputChangeTest = (e) => {
        setInputValueTest(e.target.value);
    };

    const handleSelectChangeTest = (item) => {

        const isSelected = selectedOptionsTest.some((option) => option._id === item._id);
        if (isSelected) {

            setSelectedOptionsTest(selectedOptionsTest.filter((option) => option._id !== item._id));
        } else {

            setSelectedOptionsTest([...selectedOptionsTest, item]);
        }


    };

    useEffect(() => {
        if (selectedOptionsTest.length > 0) {
            var am = 0
            selectedOptionsTest.forEach(element => {
                am += element.amount
                setAmount(am)
            });
        } else {
            setAmount(0)
        }
    }, [selectedOptionsTest])

    useEffect(() => {
        console.log("getTestListResponse ==>", getTestListResponse)
        if (getTestListResponse != null && getTestListResponse.status == 1) {
            setTests(getTestListResponse.data)
        }
    }, [getTestListResponse])

    useEffect(() => {
        console.log("getPackageListResponse ==>", getPackageListResponse)
        if (getPackageListResponse != null && getPackageListResponse.status == 1) {
            setPackage(getPackageListResponse.data)
        }
    }, [getPackageListResponse])


    useEffect(() => {
        console.log("getHospitalListResponse ===>", getHospitalListResponse)
        if (getHospitalListResponse != null && getHospitalListResponse.status == 1) {
            setHospital(getHospitalListResponse.data);
        }
    }, [getHospitalListResponse]);




    const onSubmitClick = () => {
        if (discount > amount) {
            alert("Discount amount must be less than amount")
        }
        else if (selectedOption == "") {
            alert("Please Add Patient Details!")
        }
        else if (selectedOptionsTest.length == 0 && selectedOptionPackage == "") {
            alert("Please select any test or package!")
        } else {
            const payload = {
                userId: selectedOption,
                testIds: selectedOptionsTest,
                packageId: selectedOptionPackage,
                doctorId: selectedOptionDoctor,
                hospitalId: selectedOptionHospital,
                amount: amount,
                discount: discount,
                commision: "",
                date: "",
                time: ""
            };
            dispatch(postBookingRecord(payload))
        }
    };


    return (
        <>
            <div className="dashboard">
                <Sidebar />
                <div className='table_categories'>
                    <div className='categories_head'>
                        <div className='content_dropdown'>
                            <h2>Patient</h2>
                            <div className='head_input_flex' style={{ marginLeft: 20 }}>
                                <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                                    <input
                                        id="dropdown-input"
                                        type="text"
                                        placeholder='Search Patient'
                                        value={selectedOptionName}
                                        onChange={handleInputChange}
                                        style={{ width: 300 }}
                                        className='input_dropdown'
                                        autoComplete='off'
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        style={{
                                            marginLeft: '5px',
                                            right: 12,
                                            background: 'transparent',
                                            border: '1px solid #898686',
                                            color: '#898686',
                                            padding: 3,
                                            borderRadius: 4,
                                            position: 'absolute',
                                            top: 6,
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
                                                        {item.firstName + " " + item.lastName}
                                                    </li>
                                                ))
                                            ) : (
                                                <li style={{ padding: '5px' }}>No results found</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <div className='flex_input_box'>
                                <div className='head_input_flex'>
                                    <Form.Label>First Name <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="first name" value={patientFirstName} autoComplete='off'
                                    />
                                </div>
                                <div className='head_input_flex'>
                                    <Form.Label>Last Name <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="last name" value={patientLastName} autoComplete='off'
                                    />
                                </div>
                            </div>
                            <div className='flex_input_box' style={{ marginTop: 16 }}>
                                <div className='head_input_flex'>
                                    <Form.Label>Email <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                    <Form.Control type="email" placeholder="email" value={patientEmail} autoComplete='off'
                                    />
                                </div>
                                <div className='head_input_flex'>
                                    <Form.Label>Mobile Number <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                    <Form.Control type="number" placeholder="mobile number" value={patientMobile} autoComplete='off'
                                    />
                                </div>
                            </div>
                            <div className='flex_input_box' style={{ marginTop: 16 }}>
                                <div className='head_input_flex'>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" placeholder="address" value={patientAddress} autoComplete='off'
                                    />
                                </div>
                                <div className='head_input_flex'>
                                    <Form.Label>Gender <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Select Gender</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                    </Form.Select>
                                </div>
                            </div>
                            <div className='flex_input_box' style={{ marginTop: 20 }}>
                                <div className='head_input_flex_none'>
                                    <label htmlFor="dropdown-input">Test <span style={{ color: '#10519e' }}>*</span></label><br />
                                    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }} >
                                        <input
                                            id="dropdown-input"
                                            type="text"
                                            placeholder='Select test'
                                            value={selectedOptionsNamesTest}
                                            onChange={handleInputChangeTest}
                                            style={{ width: '100%' }}
                                            readOnly
                                            autoComplete='off'
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => setIsDropdownOpenTest(!isDropdownOpenTest)}
                                            style={{
                                                marginLeft: '5px',
                                                position: 'absolute',
                                                right: 12,
                                                background: 'transparent',
                                                border: '1px solid #898686',
                                                color: '#898686',
                                                padding: 3,
                                                borderRadius: 4,
                                                top: 20,
                                            }}
                                        >
                                            ▼
                                        </Button>
                                        {isDropdownOpenTest && (
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
                                                    maxHeight: '212px',
                                                    overflowY: 'auto',
                                                }}
                                            >
                                                {tests.length > 0 ? (
                                                    tests.map((item) => (
                                                        <div>
                                                            <li
                                                                key={item._id}
                                                                onClick={() => handleSelectChangeTest(item)}
                                                                style={{
                                                                    padding: '5px',
                                                                    cursor: 'pointer',
                                                                    marginBottom: 4,
                                                                    backgroundColor: selectedOptionsTest.some((option) => option._id === item._id) ? '#d4d4d4' : 'transparent'
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
                                                    <Button onClick={() => setIsDropdownOpenTest(false)} className='button_ok'>OK</Button>
                                                </div>

                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <div className='head_input_flex_none'>
                                    <label htmlFor="dropdown-input">Package <span style={{ color: '#10519e' }}>*</span></label><br />
                                    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                                        <input
                                            id="dropdown-input"
                                            type="text"
                                            placeholder='Search Package'
                                            value={selectedOptionNamePackage}
                                            onChange={handleInputChangePackage}
                                            style={{ width: '100%' }}
                                            autoComplete='off'
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => setIsDropdownOpenPackage(!isDropdownOpenPackage)}
                                            style={{
                                                marginLeft: '5px',
                                                right: 12,
                                                background: 'transparent',
                                                border: '1px solid #898686',
                                                color: '#898686',
                                                padding: 3,
                                                borderRadius: 4,
                                                position: 'absolute',
                                                top: 20,
                                            }}
                                        >
                                            ▼
                                        </Button>
                                        {isDropdownOpenPackage && (
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
                                                {filteredOptionsPackage.length > 0 ? (
                                                    filteredOptionsPackage.map((item) => (
                                                        <li
                                                            key={item._id}
                                                            onClick={() => handleSelectChangePackage(item)}
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
                                </div>
                            </div>

                            <div className='flex_input_box' style={{ marginTop: 30, marginBottom: 30 }}>
                                <div className='head_input_flex' style={{ width: '49.5%' }}>
                                    <Form.Label className='label_h2'>Reffered By <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        onChange={(e) => {
                                            const selectedValue = e.target.value;
                                            if (selectedValue === "1") {
                                                setReffered(1);
                                            } else if (selectedValue === "2") {
                                                setReffered(2);
                                            } else if (selectedValue === "3") {
                                                setReffered(3);
                                            }
                                        }}
                                    >
                                        <option value="1">Self</option>
                                        <option value="2">Consultant</option>
                                        <option value="3">Corporate</option>
                                    </Form.Select>
                                </div>
                            </div>
                        </Form.Group>

                        {reffered == 2 && <div className='hidden_show'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <div style={{ marginBottom: 20 }}>
                                    <div style={{ position: 'relative', display: 'inline-block', width: '49.5%' }}>
                                        <input
                                            id="dropdown-input"
                                            type="text"
                                            placeholder='Search Doctor'
                                            value={selectedOptionNameDoctor}
                                            onChange={handleInputChangeDoctor}
                                            className='search_input_dropdown_doctor'
                                            autoComplete='off'
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => setIsDropdownOpenDoctor(!isDropdownOpenDoctor)}
                                            style={{
                                                marginLeft: '5px',
                                                right: 12,
                                                background: 'transparent',
                                                border: '1px solid #898686',
                                                color: '#898686',
                                                padding: 3,
                                                borderRadius: 4,
                                                position: 'absolute',
                                                top: 6,
                                            }}
                                        >
                                            ▼
                                        </Button>
                                        {isDropdownOpenDoctor && (
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
                                                {filteredOptionsDoctor.length > 0 ? (
                                                    filteredOptionsDoctor.map((item) => (
                                                        <li
                                                            key={item._id}
                                                            onClick={() => handleSelectChangeDoctor(item)}
                                                            style={{ padding: '5px', cursor: 'pointer' }}
                                                        >
                                                            {item.firstName + " " + item.lastName}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li style={{ padding: '5px' }}>No results found</li>
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <div className='flex_input_box'>
                                    <div className='head_input_flex'>
                                        <Form.Label>First Name <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="first name" value={doctorFirstName} autoComplete='off' />
                                    </div>
                                    <div className='head_input_flex'>
                                        <Form.Label>Last Name <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="last name" value={doctorLastName} autoComplete='off' />
                                    </div>
                                </div>
                                <div className='flex_input_box' style={{ marginTop: 16 }}>
                                    <div className='head_input_flex'>
                                        <Form.Label>Email <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                        <Form.Control type="email" placeholder="email" value={doctortEmail} autoComplete='off' />
                                    </div>
                                    <div className='head_input_flex'>
                                        <Form.Label>Mobile Number <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                        <Form.Control type="number" placeholder="mobile number" value={doctorMobileNumber} autoComplete='off' />
                                    </div>
                                </div>
                                {/* <div className='flex_input_box' style={{ marginTop: 16 }}>
                                    <div className='head_input_flex'>
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" placeholder="address" value={doctorAddress} />
                                    </div>
                                    <div className='head_input_flex' style={{ width: '49.5%' }}>
                                        <Form.Label>Gender <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Select Gender</option>
                                            <option value="1">Male</option>
                                            <option value="2">Female</option>
                                        </Form.Select>
                                    </div>
                                </div> */}
                            </Form.Group>
                        </div>}

                        {reffered == 3 &&
                            <div className=''>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <div style={{ marginBottom: 20 }}>
                                        <div style={{ position: 'relative', display: 'inline-block', width: '49.4%' }}>
                                            <input
                                                id="dropdown-input"
                                                type="text"
                                                placeholder='Search Corporate'
                                                value={selectedOptionNameHospital}
                                                onChange={handleInputChangeHospital}
                                                className='search_input_dropdown_doctor'
                                                autoComplete='off'
                                            />
                                            <Button
                                                type="button"
                                                onClick={() => setIsDropdownOpenHospital(!isDropdownOpenHospital)}
                                                style={{
                                                    marginLeft: '5px',
                                                    right: 12,
                                                    background: 'transparent',
                                                    border: '1px solid #898686',
                                                    color: '#898686',
                                                    padding: 3,
                                                    borderRadius: 4,
                                                    position: 'absolute',
                                                    top: 6,
                                                }}
                                            >
                                                ▼
                                            </Button>
                                            {isDropdownOpenHospital && (
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
                                                    {filteredOptionsHospital.length > 0 ? (
                                                        filteredOptionsHospital.map((item) => (
                                                            <li
                                                                key={item._id}
                                                                onClick={() => handleSelectChangeHospital(item)}
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
                                    </div>
                                    <div className='flex_input_box'>
                                        <div className='head_input_flex'>
                                            <Form.Label>Name <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                            <Form.Control type="text" placeholder="name" autoComplete='off' value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} />
                                        </div>
                                        <div className='head_input_flex'>
                                            <Form.Label>Email <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                            <Form.Control type="email" placeholder="email" autoComplete='off' value={hospitalEmail} onChange={(e) => setHospitalEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className='flex_input_box' style={{ marginTop: 16 }}>
                                        <div className='head_input_flex'>
                                            <Form.Label>Mobile Number <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                            <Form.Control type="number" placeholder="mobile number" value={hospitalMobileNumber} onChange={(v) => setHospitalMobileNumber(v.target.value)} />
                                        </div>
                                        <div className='head_input_flex'>
                                            <Form.Label>Address <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                            <Form.Control type="type" placeholder="address" autoComplete='off' value={hospitalAddress} onChange={(e) => setHospitalAddress(e.target.value)} />
                                        </div>
                                    </div>
                                </Form.Group>
                            </div>
                        }

                        <Form.Group className="mb-3" controlId="formBasicEmail" style={{ marginTop: 20 }}>
                            <div className='flex_input_box'>
                                <div className='head_input_flex'>
                                    <Form.Label>Amount <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                    <Form.Control type="number" placeholder="amount" disabled autoComplete='off' value={amount} />
                                </div>
                                <div className='head_input_flex'>
                                    <Form.Label>Discount <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                    <Form.Control type="number" placeholder="discount" autoComplete='off' value={discount} onChange={(e) => setDiscount(e.target.value)} />
                                </div>
                            </div>
                            <div className='flex_input_box' style={{ width: '49.5%', marginTop: 16 }}>
                                <div className='head_input_flex'>
                                    <Form.Label>Commission% <span style={{ color: '#10519e' }}>*</span></Form.Label>
                                    <Form.Control type="number" placeholder="Corporate" autoComplete='off' style={{ color: '#000' }} value="Corporate" />
                                </div>
                            </div>
                        </Form.Group>

                        <div className='submit_btn'>
                            <Button onClick={() => onSubmitClick()}> Submit</Button>
                        </div>
                    </Form>

                </div >
            </div >
        </>
    );
};

export default AddNewPatient;