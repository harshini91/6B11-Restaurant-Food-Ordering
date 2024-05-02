import React, { useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { useCartDispatch, useCart } from './ContextReducer';

export default function Cards(props) {
    let navigate = useNavigate();
    let dispatch = useCartDispatch();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
   
    
    const handleAddToCart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        console.log(food);
        if (food.length !== 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id:props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
        }
        else if (food.size !== size) {
            await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: props.finalPrice, qty: qty, size: size })
            return
        }
        return

        // await console.log(data);
    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value);
    },[])
    return (
        <div>
            <div className="card mt-3 rounded" style={{ "width": "18rem", "maxHeight": "360px", fontFamily: "Crimson", backgroundColor: "#FBF8F5" }}>
                <img className="card-img-top" src={props.foodItem.img} alt="Card image cap" style={{ height: "150px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title text-black">{props.foodItem.name}</h5>
                    <div className="container">
                        <select className='m-2 h-100 rounded text-#FBF8F5' style={{ backgroundColor: '#9A7966', fontFamily: "Montserrat" }} onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>

                        <select className='m-2 h-100 rounded text-#FBF8F5' ref={priceRef} style={{ backgroundColor: '#9A7966', fontFamily: "Montserrat" }} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>

                        <div className='d-inline h-100 fs-5 text-black'>
                            {finalPrice}/-
                        </div>
                    </div>
                    <hr className="hr" style={{ height: "2px", backgroundColor: "#9A7966", opacity: 0.25 }}>
                    </hr>
                    <button className={'btn justify-center ms-2'} style={{ backgroundColor: '#9A7966', fontFamily: "Montserrat" }} onClick={handleAddToCart()}>Add to Cart</button>
                </div>
            </div>
        </div>

    )
}
