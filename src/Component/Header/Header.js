import React, { useEffect, useState } from 'react'
import { HomeJsonData } from '../../utils/alljsonfile/homejsonData'
import profileSvg from "../../assets/userprofile.svg"
import logoSvg from "../../assets/logo.svg"
import mapiconSvg from "../../assets/map-icon.svg"
import profileiconSvg from "../../assets/profile-icon.svg"
import massiconSvg from "../../assets/massage-icon.svg"
import addiconSvg from "../../assets/add-icon.svg"
import homeiconSvg from "../../assets/home-icon.svg"
import likeiconSvg from "../../assets/like-icon.svg"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



export default function Header() {
  const redirect = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('userdata')) {
      redirect('/login')
    }
  }, [])
  const [offcanvas, setoffcanvas] = useState(false) //onClick={(e) => {e.preventDefault(); setoffcanvas(true);}}
  const InstaUser = JSON.parse(localStorage.getItem('instaUser')) || []
  const lastInstaUser = InstaUser[InstaUser.length - 1]
  const DeleteHandle = (e) => {
    e.preventDefault();
    if (lastInstaUser) {
      const updatedInstaUser = InstaUser.filter((item) => item.id !== lastInstaUser.id)
      localStorage.setItem('instaUser', JSON.stringify(updatedInstaUser));
      toast.success('LogOut Successfully')
      redirect('/login')
    }
  }
 
  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid d-flex justify-content-between">
          <Link className="navbar-brand" to={"/"} > <img src={logoSvg} className='img-fluid' /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end gap-5" id="navbarSupportedContent">
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            </form>
            <ul className="navbar-nav d-flex flex-row mt-2 mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="navbar-brand" href="#"> <img src={homeiconSvg} className='img-fluid' /></a>
              </li>
              <li className="nav-item">
                <a className="navbar-brand" href="#"> <img src={massiconSvg} className='img-fluid' /></a>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand" to={'/addpost'}> <img src={addiconSvg} className='img-fluid' /></Link>
              </li>
              <li className="nav-item">
                <a className="navbar-brand" href="#"> <img src={mapiconSvg} className='img-fluid' /></a>
              </li>
              <li className="nav-item">
                <a className="navbar-brand" href="#"> <img src={likeiconSvg} className='img-fluid' /></a>
              </li>
              <li className="nav-item offcanvas-btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" >  
                <a className="navbar-brand" href="#"> <img src={[profileiconSvg]} className='img-fluid' /></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

          <div className= "offcanvas offcanvas-end offcanvasset mt-5 " tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className='d-flex justify-content-between align-items-center mt-5 px-3'>
              <div className='d-flex'>
                <div>
                  <Link to={'/profile'}>
                    <img src={profileSvg} className='img-fluid' />
                  </Link>
                </div>
                <div className='profile-text px-3 mt-1'>
                  <h6>{lastInstaUser.username}</h6>
                  <p>{lastInstaUser.fullname}</p>
                </div>
              </div>
              <div className='btn-switch'>
                <button onClick={DeleteHandle}>Switch</button>
              </div>
            </div>
            <div className="offcanvas-body">
              <div className='d-flex justify-content-between align-items-center '>
                <p className='text-secondary '>Suggestions For You</p>
                <p>See All</p>
              </div>
              {
                HomeJsonData?.slice(0, 4).map((item, index) => {
                  return (
                    <div key={index} className='d-flex justify-content-between align-items-center'>
                      <div className='d-flex'>
                        <div>
                          <img src={item.avtar} className='img-fluid' />
                        </div>
                        <div className='profile-text px-3 mt-1'>
                          <h6>{item.name}</h6>
                          <p>{item.lastname}</p>
                        </div>
                      </div>
                      <div className='btn-switch '>
                        <button>Follow</button>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
      

    </div>
  )
}
