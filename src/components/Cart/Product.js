import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { server } from '../../Server'
import { useNavigate } from 'react-router-dom'
import Details from './Details'

const Product = ({ e, userContext }) => {
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(e?.quantity || 0)

    const changeQuantity = async () => {
        await fetch(`${server}cart/user/${localStorage.getItem('user_id')}/product/${e.product.id}/var/${e.Var.id}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quantity: quantity
            })
        })
        .then((e) => e.json())
        .then((e) => alert('لقد غيرت الكمية بنجاح'))
    }
    
    const deleteCartItem = async () => {
        await fetch(`${server}cart/user/${localStorage.getItem('user_id')}/cartitem/${e.id}/delete/`,{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
    return (
        <div className='row bg-white mb-5 shadow p-2 mx-2'>
            <div className='col-md-4 col-sm-12'>
                <Carousel style={{ width: "100%" }} className='h-100 justify-content-center d-flex flex-column'>
                    {e?.product?.images?.map((image) => (
                        <Carousel.Item style={{width:"100%"}} key={image.id}>
                            <img
                                className="d-block w-100 img-fluid"
                                src={server + image.image}
                                alt={`Slide ${image.id}`}
                                onClick={() =>
                                    navigate(`/product/${e?.product?.name}`, {
                                        state: { product: e?.product },
                                    })
                                }
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            {/* product */}
            <div className='col-md-8 col-sm-12 text-center justify-content-center d-flex flex-column gap-4 mt-auto mb-auto h-100'>
                <div className='shadow mb-3'>
                    <div>
                        <strong>{e?.product?.name}</strong>
                    </div>
                    <div style={{fontSize:"0.79em"}}>
                        <strong className='text-black-50'>
                            {e?.product?.description?.length > 50
                                ? "..." + e?.product?.description.slice(0, 50)
                                : e?.product?.description}
                        </strong>
                    </div>
                </div>
                {/* var */}
                <div style={{fontSize:"0.79em"}} className='shadow d-flex justify-content-around flex-row mb-3'>
                    <strong className='d-flex flex-row'>EGP {e?.Var?.sell_price} - {e?.Var?.Var_name}</strong>
                    {
                        e?.Var?.stock <= 5 ? <>&nbsp;||&nbsp;
                        <strong className='d-flex flex-row'>{e?.Var?.stock} :الكمية</strong></>:null
                    }
                    {userContext?.user?.is_staff ? <>&nbsp;||&nbsp;
                    <strong className='d-flex flex-row'>EGP {e?.Var?.consumer_commission} - العمولة</strong></>:null}
                </div>
                {/* var */}

                {/* details */}
                <Details userContext={userContext} deleteCartItem={deleteCartItem} changeQuantity={changeQuantity} e={e} quantity={quantity} setQuantity={setQuantity}/>
                {/* details */}
            </div>
            {/* product */}
        </div>
    )
}

export default Product