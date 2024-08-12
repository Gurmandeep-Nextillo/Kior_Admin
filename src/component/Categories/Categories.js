import React, { useEffect, useRef, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Modal from 'react-modal';
import Sidebar from '../Sidebar.js/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { getCategoryList } from '../../redux/getCategoryListSlice';
import { addCategory } from '../../redux/addCategoriesSlice';
import { updateCategory } from '../../redux/updateCategorySlice';

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
    const [name, setName] = useState("");
    const [isOpen, setOpen] = useState(false);

    const getCategoryListSuccess = useSelector((state) => state.getCategoryListReducer.data);
    const addCategorySuccess = useSelector((state) => state.addCategoryReducer.data);
    const updateCategorySuccess = useSelector((state) => state.updateCategoryReducer.data);

    useEffect(() => {
        if (getCategoryListSuccess != null && getCategoryListSuccess.status == 1) {
            setCategories(getCategoryListSuccess.data);
        }
    }, [getCategoryListSuccess]);

    useEffect(() => {
        const paylaod = {
            skip: skip,
        }
        dispatch(getCategoryList(paylaod));
    }, [skip]);


    useEffect(() => {
        if (addCategorySuccess != null && addCategorySuccess.status == 1) {
            const paylaod = {
                skip: skip,
            }
            dispatch(getCategoryList(paylaod));
        }
    }, [addCategorySuccess]);

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
            dispatch(addCategory(payload));
        }
    };

    const toggleSwitch = (item) => {
        const payload = {
            name: item.name,
            categoryId: item._id,
            isActive: item.isActive == 1 ? 0 : 1,
            isDeleted: item.isDeleted
        }
        dispatch(updateCategory(payload))
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

    useEffect(() => {
        if (updateCategorySuccess != null && updateCategorySuccess.status == 1) {
            const paylaod = {
                skip: 0,
            }
            dispatch(getCategoryList(paylaod));
        }
    }, [updateCategorySuccess]);

    const onDeleteClick = (item) => {
        const payload = {
            name: item.name,
            categoryId: item._id,
            isActive: 0,
            isDeleted: 1
        }

        dispatch(updateCategory(payload))
    }

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