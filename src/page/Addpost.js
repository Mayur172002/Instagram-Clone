import React, { useState } from 'react'
import Header from '../Component/Header/Header'

function Addpost() {
    const [data, setdata] = useState({
        image: "",
        chaption: "",
        location: ""
    })
    const FormchangeHandel = () => {

    }
    const SubmitHandel = (e) => {
        e.preventDefault()
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
                            <input class="form-control" type="file" value={data.image} name='image' id="postImage" required />
                        </div>
                        <div class="mb-3">
                            <label for="postCaption" class="form-label">Caption</label>
                            <textarea class="form-control" id="postCaption" value={data.chaption}name='chaption' rows="3" placeholder="Write a caption..." required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="postLocation" class="form-label">Location</label>
                            <input type="text" class="form-control"value={data.location} name='location' id="postLocation" placeholder="Add location" />
                        </div>
                        <button type="submit" class="btn submit-btn w-100">Share</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Addpost