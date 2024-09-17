import React, { useEffect, useState } from 'react'
import Header from '../../Component/Header/Header'
import { HomeJsonData } from '../../utils/alljsonfile/homejsonData'
import Profilenewpost from '../../assets/profile-new-post.svg'
import moreoption from '../../assets/option.svg'
import newpost from '../../../src/assets/new-post.svg'
import newlike from '../../../src/assets/new-post-like.svg'
import newcomment from '../../../src/assets/new-commnet.svg'
import newshare from '../../../src/assets/new-share.svg'
import newsave from '../../../src/assets/newsave.svg'
import newemoji from '../../../src/assets/emoji.svg'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



export default function Home() {
  const redirect = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('userdata')) {
      redirect('/login')
    }
  }, [])
  const [isLiked, setIsLiked] = useState(false);
  const existingPost = JSON.parse(localStorage.getItem('newpost')) || []
  const lastInstaUser = existingPost[existingPost.length - 1]
  const DeleteHandel = (items) => {
    if (lastInstaUser) {
      const updatedInstaUser = existingPost.filter((item) => item.chaption !== items.chaption)
      localStorage.setItem('newpost', JSON.stringify(updatedInstaUser));
      toast.success('Delete Successfully !!')
    }
  }
  const handleDoubleClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div>
      <Header />
      <div className='container-fluid mt-2'>
        <div className='storyUsers d-flex gap-3'>
          {
            HomeJsonData?.slice(5).map((item, index) => {
              return (
                <div key={index} className='all-story'>
                  <div className='story-user'>
                    <img src={item.avtar} className='img-fluid' />
                  </div>
                  <p className='story-text-name'>{item.name}</p>
                </div>
              )
            })
          }
        </div>

        {
          existingPost?.map((item, index) => {
            return (
              <div key={index} className='new-post mb-4'>
                <div className='new-post-profile d-flex justify-content-between align-items-center'>
                  <div className=' d-flex align-items-center gap-2'>
                    <div>
                      <img src={Profilenewpost} className='img-fluid' />
                    </div>
                    <div className='new-profile-text'>{item.name}</div>
                  </div>
                  <div id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: "pointer" }}>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li>
                        <a class="dropdown-item" href="#">
                          <i class="bi bi-pencil"></i> Edit
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item text-danger" onClick={
                          () => DeleteHandel(item)} href="#">
                          <i class="bi bi-trash"></i> Delete
                        </a>
                      </li>
                    </ul>
                    <img src={moreoption} className='img-fluid' />
                  </div>
                </div>
                <div className='post-img mt-2'>
                  <img src={item.image} className='img-fluid' />
                </div>
                <div className='d-flex justify-content-between align-items-center mt-3 '>
                  <div className='new-post-icon'>
                    <img src="https://cdn-icons-png.flaticon.com/512/2107/2107845.png" width={24} height={22} className='img-fluid' />
                    <img src={newcomment} className='img-fluid' />
                    <img src={newshare} className='img-fluid' />
                  </div>
                  <div className=''>
                    <img src={newsave} className='img-fluid' />
                  </div>
                </div>
                <div className='comment-box-text mt-2'>
                  <h6>
                    1.069
                    Likes
                  </h6>
                  <p>terrylucas
                    Imperdiet in sit rhoncus, eleifend tellus augue lectus potenti pellentesque {item.chaption} </p>
                  <p className='text-secondary'>View all 100 comments</p>
                  <span className='text-secondary '>
                    {item.location}
                  </span>
                </div>
                <div className='comment-input d-flex justify-content-between align-items-center mt-3'>
                  <div className='comment-input-text mt-2'>
                    <img src={newemoji} className='img-fluid' />
                    <input type='text' className='' placeholder='  Add a comment...' />
                  </div>
                  <div>
                    <button className='btn-post'>Post</button>
                  </div>
                </div>
              </div>
            )
          })
        }
        <div className='new-post mb-4'>
          <div className='new-post-profile d-flex justify-content-between align-items-center'>
            <div className=' d-flex align-items-center gap-2'>
              <div>
                <img src={Profilenewpost} className='img-fluid' />
              </div>
              <div className='new-profile-text'>terrylucas</div>
            </div>
            <div id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: "pointer" }}>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <a class="dropdown-item" href="#">
                    <i class="bi bi-pencil"></i> Edit
                  </a>
                </li>
                <li>
                  <a class="dropdown-item text-danger" href="#">
                    <i class="bi bi-trash"></i> Delete
                  </a>
                </li>
              </ul>
              <img src={moreoption} className='img-fluid' />
            </div>
          </div>
          <div className='post-img mt-2'>
            <img src={newpost} className='img-fluid' />
          </div>
          <div className='d-flex justify-content-between align-items-center mt-3 '>
            <div className='new-post-icon'>
              <img src={isLiked ? 'https://cdn-icons-png.flaticon.com/512/2107/2107845.png' : newlike} onClick={handleDoubleClick} width={24} height={22} style={{cursor:"pointer"}} className='img-fluid' />
              <img src={newcomment} className='img-fluid' />
              <img src={newshare} className='img-fluid' />
            </div>
            <div className=''>
              <img src={newsave} className='img-fluid' />
            </div>
          </div>
          <div className='comment-box-text mt-2'>
            <h6>
              1.069
              Likes
            </h6>
            <p>terrylucas
              Imperdiet in sit rhoncus, eleifend tellus augue lectus potenti pellentesque  </p>
            <p className='text-secondary'>View all 100 comments</p>
            <span className='text-secondary '>
            </span>
          </div>
          <div className='comment-input d-flex justify-content-between align-items-center mt-3'>
            <div className='comment-input-text mt-2'>
              <img src={newemoji} className='img-fluid' />
              <input type='text' className='' placeholder='  Add a comment...' />
            </div>
            <div>
              <button className='btn-post'>Post</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
