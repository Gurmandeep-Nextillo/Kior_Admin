import React, { useEffect, useRef, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Modal from 'react-modal';
import Sidebar from '../Sidebar.js/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import getCategoryListSlice, { getCategoryList } from '../../redux/getCategoryListSlice';
import categoriesTableSlice, { category } from '../../redux/categoriesTableSlice';

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

const Categories = () => {

    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [skip, setSkip] = useState(0)

    const [isOpen, setOpen] = useState(false);

    const getCategoryListSuccess = useSelector((state) => state.getCategoryListReducer.data);
    const categoriesSuccess = useSelector((state) => state.categoriesTableReducer.data);
    const updateCategorySuccess = useSelector((state) => state.updateCategoryReducer.data);

    useEffect(() => {
        console.log("getCategoryListSuccess ===>", getCategoryListSuccess)
        if (getCategoryListSuccess != null && getCategoryListSuccess.status == 1) {
            setCategories(getCategoryListSuccess.data);
        }
    }, [getCategoryListSuccess]);

    useEffect(() => {

        const paylaod = {
            skip: skip,
        }
        dispatch(getCategoryList(paylaod));
    }, []);


    const [name, setName] = useState("");

    useEffect(() => {

        if (categoriesSuccess != null && categoriesSuccess.status == 1) {
            console.log("Success inner")
            const paylaod = {
                skip: skip,
            }
            dispatch(getCategoryList(paylaod));
        }
    }, [categoriesSuccess]);

    const onSubmitClick = () => {
        setName("")
        setOpen(false);
        if (name.length == 0) {
            alert("Please enter name!");
        } else {
            const payload = {
                name: name,
                image: "image",
            };
            dispatch(category(payload));
        }
    };


    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = (index) => {
        setCategories(prevCategories => {
            const newCategories = [...prevCategories];
            newCategories[index].isActive = !newCategories[index].isActive;
            return newCategories;
        });
    };

    const handleButtonClick = async () => {
        try {
            const options = {
                types: [
                    {
                        description: 'Text Files',
                        accept: {
                            'text/plain': ['.txt'],
                        },
                    },
                ],
                excludeAcceptAllOption: true,
                multiple: false,
            };

            // Show the file picker
            const [fileHandle] = await window.showOpenFilePicker(options);
            const file = await fileHandle.getFile();
            alert(`Selected file: ${file.name}`);
        } catch (err) {
            console.error(err);
            alert('File selection was canceled or an error occurred.');
        }
    };

    const [scrollPosition, setScrollPosition] = useState({ scrollTop: 0, scrollLeft: 0 });
    const tableRef = useRef(null);

    const handleScroll = () => {
        if (tableRef.current) {
            const { scrollTop, scrollLeft } = tableRef.current;
            setScrollPosition({ scrollTop, scrollLeft });
        }
    };

    return (
        <>
            <div className="dashboard">
                <Sidebar />
                <div className='table_categories'>
                    <div className='categories_head'>
                        <h2>Categories</h2>
                        <div className='search_categories_btn'>
                            <div className="box">
                                <form>
                                    <label>Search</label>
                                    <input required type="search" className="input" id="search" />
                                    <span className="caret"></span>
                                </form>
                            </div>
                            <Button type='button' onClick={() => setOpen(true)}>Add Categories</Button>
                        </div>
                    </div>

                    <div id="tableContainer"
                        ref={tableRef}
                        onScroll={handleScroll}>
                        <Table responsive bordered >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 && categories.map((item, index) => (
                                    <tr>
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
                    </div>

                    {/* <div className="output" style={{ marginTop: '10px' }}>
                        {scrollPosition.scrollTop} <br />
                        {scrollPosition.scrollLeft}
                    </div> */}

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
                            <input type='text' placeholder='name' autoComplete='off' value={name} onChange={(e) => setName(e.target.value)} /><br />
                            <div className='submit_btn'>
                                <Button onClick={() => onSubmitClick()} > Submit</Button>
                            </div>
                        </div>
                    </Modal>
                </div >
            </div >
        </>
    );
};

export default Categories;