import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart';
import Modal from '../Modal';
import { useCart } from './ContextReducer';

export default function Navbar() {
  let data = useCart();
  const [cartView, setCartView]= useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/login');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: '#FBF8F5', fontFamily: "Crimson" }} >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            DineDash</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ? <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
              </li>
                : ""}

            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className="d-flex">

                <Link className="btn mx-1" style={{ backgroundColor: "#9A7966" }} to="/login">Login</Link>

                <Link className="btn mx-1" style={{ backgroundColor: "#9A7966" }} to="/createuser">SignUp</Link>

              </div>
              :
              <div><div className='btn mx-2' style={{ backgroundColor: "#9A7966" }} onClick={() => {setCartView(true)}}>
                My Cart{" "}
                <Badge pill bg='#FBF8F5'>{data.length}</Badge>
              </div>
              {cartView ? <Modal onClose={() => {setCartView(false)}}><Cart /></Modal>: null}
                <div className='btn mx-2' style={{ backgroundColor: "#9A7966" }} onClick={handleLogout}>
                Logout
                </div></div>

            }
          </div>
        </div>
      </nav>
    </div>
  );
}
