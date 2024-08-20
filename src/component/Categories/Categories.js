import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Modal from 'react-modal';
import Sidebar from '../Sidebar.js/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { getCategoryList } from '../../redux/getCategoryListSlice';
import { addCategory } from '../../redux/addCategoriesSlice';
import { updateCategory } from '../../redux/updateCategorySlice';
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

const Categories = () => {

    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryID] = useState("");
    const [skip, setSkip] = useState(0)
    const [name, setName] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [from, setFrom] = useState(0)

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
            if (from == 0) {
                const payload = {
                    name: name,
                    image: "image",
                };
                dispatch(addCategory(payload));
            }
            else {
                const payload = {
                    categoryId: categoryId,
                    name: name,
                    image: "image",
                };
                dispatch(updateCategory(payload))
            }
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

    const onEditClick = (item) => {
        setFrom(1)
        setCategoryID(item._id)
        setName(item.name);
        setOpen(true);
    }

    const onAddClick = () => {
        setFrom(0)
        setName("");
        setOpen(true);
    }

    // useEffect(() => {
    //     if (from == 0 && isOpen) {
    //         setOpen(true);
    //     } else if (from == 1 && isOpen) {
    //         setOpen(true);
    //     }
    // }, [from])

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
                            <Button type='button' onClick={() => onAddClick()}>Add Categories</Button>
                        </div>
                    </div>

                    <div>
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
                                            <EditIcon onClick={() => onEditClick(item)} />
                                            <DeleteForeverIcon onClick={() => onDeleteClick(item)} style={{ marginLeft: 20 }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

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