import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
import Carousel from '../components/Carousel'

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1])
    // console.log(response[0],response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div style={{ backgroundColor: '#EEE4DD' }} >
      <div> <Navbar /> </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade img-fluid" data-bs-ride="carousel">
          <div className="carousel-inner" id="herocarousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div class="d-flex justify-content-center">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {setSearch(e.target.value)}} />
                {/* <button class="btn btn-outline-dark text-white" type="submit" style={{ backgroundColor: "#9A7966" }}>
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/800×500/?burger" className="d-block w-100" alt="burger" style={{ height: "500px", filter: "brightness(30%)" }} />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/800×500/?pastries" className="d-block w-100" alt="pasteries" style={{ height: "500px", filter: "brightness(30%)" }} />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/800×500/?cake" className="d-block w-100" alt="cake" style={{ height: "500px", filter: "brightness(30%)" }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          Object.keys(foodCat).length !== 0 ? (
            foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className="fs-3 m-3 text-black" style={{ fontFamily: "Crimson" }}>
                    {data.CategoryName}
                  </div>
                  <hr className="hr" style={{height: "2px", backgroundColor: "#9A7966", opacity:0.25}}/>
                  {
                    Object.keys(foodItem).length !== 0 ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                      .map(filterItems => {
                        return (
                          <div key={filterItems._id} className='col-12 col-md-6 col-lg-4'>
                            <Cards foodItem={filterItems}
                              options={filterItems.options[0]}
                              price = {filterItems.price}
                            ></Cards>
                          </div>
                        )
                      }) : <div>"No such Data Found"</div>
                  }
                </div>
              )
            })
          ) : (
            <div>""""""""""</div>
          )}
      </div>
      <div> <Footer /> </div>
    </div>
  )
}
