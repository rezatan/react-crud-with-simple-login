//import useState
import { useState, useEffect } from 'react';

//import useNavigate
import { useNavigate } from 'react-router-dom';

//import API
import api from '../../api/Index';

export default function PostCreate() {

    //define state
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');

    //state validation
    const [errors, setErrors] = useState([]);
    
    

    //useNavigate
    const navigate = useNavigate();

    //method handle file change
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    //method store post
    const storePost = async (e) => {
        e.preventDefault();
        
        //init FormData
        const formData = new FormData();

        //append data
        formData.append('image', image);
        formData.append('title', title);
        formData.append('body', body);
        formData.append('category_id', categoryId);

        //send data with API
        await api.post('/api/posts', formData)
            .then(() => {
                
                //redirect to posts index
                navigate('/posts');

            })
            .catch(error => {
                
                //set errors response to state "errors"
                setErrors(error.response.data);
            })
    }
        //run hook useEffect
        useEffect(() => {
            const fetchDataPosts = async () => {

                //fetch data from API with Axios
                await api.get('/api/categories')
                    .then(response => {
                        
                        //assign response data to state "posts"
                        setCategories(response.data.categories);
                    })
                
            }
            //call method "fetchDataPosts"
            fetchDataPosts();
        }, []);
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={storePost}>
                            
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Image</label>
                                    <input type="file" onChange={handleFileChange} className="form-control"/>
                                    {
                                        errors.image && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.image[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Title</label>
                                    <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} placeholder="Title Post"/>
                                    {
                                        errors.title && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.title[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Category</label>
                                    <select className="form-select" name="category_id" onChange={(e) => setCategoryId(e.target.value)}>
                                    {
                                    categories.map((category, index) =>  (
                                        <option key={index} value = { category.id }> { category.name } </option>
                                    ))
                                    }
                                    </select>                                    
                                    {
                                        errors.category && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.category[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Content</label>
                                    <textarea className="form-control" onChange={(e) => setBody(e.target.value)} rows="5" placeholder="Body Post"></textarea>
                                    {
                                        errors.body && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.body[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}