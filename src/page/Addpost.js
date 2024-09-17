import React, { useState } from 'react'
import Header from '../Component/Header/Header'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Addpost() {
    const redirect = useNavigate()
    const [data, setdata] = useState({
        image: "",
        chaption: "",
        location: ""
    })
    const FormchangeHandel = (e) => {
        const { name, value ,files} = e.target
        if(files && files.length > 0){
            const file = e.target.files?.[0]
            if(file){
                const reader = new FileReader();
                reader.onload = ()=>{
                    setdata({ ...data, [name]: reader.result });
                }
                reader.readAsDataURL(file);
            }
        }else{
            setdata({ ...data, [name]: value })
        }
        console.log(data);
    }
    // const handleFileChange = (e)=>{
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setdata(reader.result );
    //         };
    //         reader.readAsDataURL(file);
    //       }
    //       console.log("filefile",data);
    // }
    const SubmitHandel = (e) => {
        e.preventDefault()
        const InstaUser = JSON.parse(localStorage.getItem('instaUser')) || []
        const lastInstaUser = InstaUser[InstaUser.length - 1];
        const existingPost = JSON.parse(localStorage.getItem('newpost')) || []
        const NewPostData = {
            id : lastInstaUser.id,
            name : lastInstaUser.fullname,
            image : data.image,
            chaption : data.chaption,
            location : data.location,
        }
        existingPost.push(NewPostData);
        localStorage.setItem('newpost',JSON.stringify(existingPost));
        setdata({...data,image :"",chaption:"",location:""})
        toast.success('New Post Successfully !!')
        setTimeout(() => {
            redirect('/')
        }, 1000);

    }
    return (
        <div>
            <Header />
            <div class="container">
                <div class="add-post-container shadow-sm">
                    <h3 class="text-center mb-4">Add New Post</h3>
                    <form onChange={FormchangeHandel} onSubmit={SubmitHandel}>
                        <div class="mb-3">
                            <label for="postImage" class="form-label">Upload Image</label>
                            <input class="form-control" type="file" name='image' id="postImage" required />
                        </div>
                        <div class="mb-3">
                            <label for="postCaption" class="form-label">Caption</label>
                            <textarea class="form-control" id="postCaption" value={data.chaption} name='chaption' rows="3" placeholder="Write a caption..." required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="postLocation" class="form-label">Location</label>
                            <input type="text" class="form-control" value={data.location} name='location' id="postLocation" placeholder="Add location" />
                        </div>
                        <button type="submit" class="btn submit-btn w-100">Share</button>
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default Addpost




