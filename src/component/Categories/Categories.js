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
import { uploadFile } from '../../redux/uploadFileSlice';

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

const Categories = () => {

    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryID] = useState("");
    const [skip, setSkip] = useState(0);
    const [name, setName] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [from, setFrom] = useState(0);
    const [image, setImage] = useState(null)
    const [imageSrc, setImageSrc] = useState(null);
    const [imageLocation, setImageLocation] = useState("");

    const getCategoryListSuccess = useSelector((state) => state.getCategoryListReducer.data);
    const addCategorySuccess = useSelector((state) => state.addCategoryReducer.data);
    const updateCategorySuccess = useSelector((state) => state.updateCategoryReducer.data);
    const uploadFileResponse = useSelector((state) => state.uploadFileReducer.data);


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
        if (from == 0) {
            if (image != null) {
                if (name.length == 0) {
                    alert("Please enter name!");
                } else {
                    setOpen(false);
                    dispatch(uploadFile(image));
                }
            }
            else {
                alert("Please Select Image First")
            }
        }
        else {

            if (image != null) {
                if (name.length == 0) {
                    alert("Please enter name!");
                } else {
                    setOpen(false);
                    dispatch(uploadFile(image));
                }
            }
            else {
                const payload = {
                    categoryId: categoryId,
                    name: name,
                    image: imageLocation,
                };
                setOpen(false);
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
            setImageLocation("")
            setName("")
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
        setImageSrc(null)
        setFrom(1)
        setCategoryID(item._id)
        setName(item.name)
        setImageLocation(item.image)
        setImage(null)
        setOpen(true)
    }

    const onAddClick = () => {
        setFrom(0)
        setName("");
        setImageSrc(null)
        setImage(null)
        setImageLocation("")
        setOpen(true);
    }

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
                    image: uploadFileResponse.Location,
                };
                dispatch(addCategory(payload));
            }
            else {
                const payload = {
                    categoryId: categoryId,
                    name: name,
                    image: uploadFileResponse.Location,
                };
                dispatch(updateCategory(payload))
            }
        }
    }, [uploadFileResponse])

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
                                {categories.length > 0 && categories.map((item) => (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.image != "image" && <img src={item.image} alt="Uploaded" style={{ maxWidth: '100%' }} />}</td>
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
                            <p>Image <span style={{ color: '#10519e' }}>*</span></p>
                            <div className="add_picture">
                                <input type="file" onChange={handleFileChange} className='file_upload' id='fileInput' />
                                <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                                    {(imageSrc || imageLocation != "") ? <img src={imageSrc != null ? imageSrc : imageLocation} alt="Uploaded" style={{ maxWidth: '100%' }} /> : <AddIcon />}
                                </label>
                                <AddIcon />
                            </div>
                            <p >Name <span style={{ color: '#10519e' }}>*</span></p>
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