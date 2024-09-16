import React, { useEffect, useState } from 'react'
import Header from '../Component/Header/Header'
import profileView from '../../src/assets/view-profile.svg'
import { HomeJsonData, ProfileData } from '../utils/alljsonfile/homejsonData'
import posticon from '../../src/assets/post-icon.svg'
import guides from '../../src/assets/guides.svg'
import reels from '../../src/assets/reels.svg'
import video from '../../src/assets/video.svg'
import tags from '../../src/assets/tag.svg'
import setting from '../../src/assets/setting.svg'
import { useNavigate } from 'react-router-dom'


export default function Profile() {
  const redirect = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('userdata')) {
      redirect('/login')
    }
  }, [])

  const GetuserData = JSON.parse(localStorage.getItem('userdata')) || []
  const InstaUser = JSON.parse(localStorage.getItem('instaUser')) || []
  // console.log(InstaUser[0].id);
  const lastInstaUser = InstaUser[InstaUser.length - 1];
  const FilterGetdata = GetuserData.filter((item) => item.id === lastInstaUser.id);
  const [getdata, setgetdata] = useState(FilterGetdata[0] || {})
  const FormChangeHandel = (e) => {
    const { name, value } = e.target
    setgetdata((prevdata) => ({ ...prevdata, [name]: value }));
  }

  const DataSubmit = (e) => {
    e.preventDefault()
    const lastInstaUser = InstaUser[InstaUser.length - 1];
    const FilterGetdata = GetuserData.filter((item) => item.id === lastInstaUser.id);
    if (FilterGetdata) {
      localStorage.setItem('instaUser', JSON.stringify([getdata]));
    }
    // return GetuserData
  }
  return (
    <div>
      <Header />
      {
        FilterGetdata?.map((item, index) => {
          return (
            <div key={index} className='profile-view px-5 mt-4 d-flex  gap-5 align-items-center'>
              <div className=''>
                <img src={profileView} className='img-fluid' />
              </div>
              <div className='profile-name-text '>
                <div className='profile-name d-flex gap-4 align-items-center'>
                  <h5>{item.username}</h5>
                  <button className='btn-edit' data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Profile</button>
                  <img src={setting} className='img-fluid' />
                </div>
                <div className='d-flex justify-content-between align-items-center mt-3'>
                  <div className='profile-contant'><span>1.258</span> potst</div>
                  <div className='profile-contant'><span>4M</span> followers</div>
                  <div className='profile-contant'><span>1.250</span> following</div>
                </div>
                <p style={{ fontWeight: "600" }}>{item.fullname}</p>
              </div>
            </div>
          )
        })
      }
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Profile Update</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form method='post' onSubmit={DataSubmit} onChange={FormChangeHandel}>
                <div className="mb-3">
                  <input type="email" className="form-control" id="exampleInputEmail1" value={getdata.email} name='email' placeholder='mobile number,or email' />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" value={getdata.fullname} name='fullname' id="exampleInputPassword1" placeholder='Full Name' />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" value={getdata.username} name='username' id="exampleInputPassword1" placeholder='Username' />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary">Close</button>
                  <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
      <div className='storyUsers d-flex gap-5 px-5 mt-4'>
        {
          HomeJsonData?.slice(7, 12).map((item, index) => {
            return (
              <div key={index} className='all-story gap-2'>
                <img src={item.avtar} className='img-fluid' />
                <p className='story-text-name'>{item.name}</p>
              </div>
            )
          })
        }
      </div>
      <div className='profile-posts mt-3'>
        <div className='d-flex justify-content-center gap-5 align-items-center'>
          <div className='profile-data d-flex gap-2 mt-2 align-items-center' >
            <div>
              <img src={posticon} className='img-fluid' />
            </div>
            <div>Posts</div>
          </div>
          <div className='profile-data d-flex gap-2 mt-2 align-items-center' >
            <div>
              <img src={guides} className='img-fluid' />
            </div>
            <div className='text-secondary'>guides</div>
          </div>
          <div className='profile-data d-flex gap-2 mt-2 align-items-center' >
            <div>
              <img src={reels} className='img-fluid' />
            </div>
            <div className='text-secondary'>reels</div>
          </div>
          <div className='profile-data d-flex gap-2 mt-2 align-items-center' >
            <div>
              <img src={video} className='img-fluid' />
            </div>
            <div className='text-secondary'>videos</div>
          </div>
          <div className='profile-data d-flex gap-2 mt-2 align-items-center' >
            <div>
              <img src={tags} className='img-fluid' />
            </div>
            <div className='text-secondary'>tagges</div>
          </div>
        </div>
        <div className='row mt-4 mb-4 justify-content-center'>
          {
            ProfileData?.map((item, index) => {
              return (
                <div key={index} className='col-lg-4 col-sm-12 col-md-6 d-flex justify-content-center mt-4 '>
                  <img src={item.avtar} className='img-fluid' />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
