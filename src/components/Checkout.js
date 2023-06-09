import React, { useContext, useEffect, useState } from 'react'
import { Header } from './Header'
import { ProductContextProvider } from '../utlits/ProductContext'
import { server } from '../Server'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
    const [name, setName] = useState('')
    const [shippingAdd, setShippingAdd] = useState('')
    const [shippingAdd2, setShippingAdd2] = useState('')
    const [phone, setPhone] = useState('')
    const [phone2, setPhone2] = useState('')
    const [shippingTo, setShippingTo] = useState()
    const [orderItems, setOrderItems] = useState([])

    const productContext = useContext(ProductContextProvider)
    const selectedState = productContext.states.find((state) => state.id == shippingTo);

    const navigate = useNavigate()

    const Checkout = () => {
        if (name.length === 0 || shippingAdd.lastIndexOf === 0 || phone.length > 11 || phone.length < 11 || !selectedState) {
            alert('حدث خطأ تأكد من البيانات المدخلة')
        } else {
            if(orderItems){
                fetch(`${server}orders/create/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user: localStorage.getItem("user_id"),
                        name: name,
                        shipping_address: shippingAdd,
                        shipping_address2: shippingAdd2,
                        phone: phone,
                        phone2: phone2,
                        shipping_to: shippingTo,
                        total_order_price: productContext?.cart?.cart_items?.reduce((acc, item) => acc + (item.Var.sell_price * item.quantity), 0) + selectedState?.shipping_price,
                        order_items: orderItems
                    })
                })
                    .then((e) => e.json())
                    // .then((e) => console.log(e))
                    .then((e) => {
                        if (e?.id) {
                            fetch(`${server}carts/${localStorage.getItem('user_id')}/`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
    
                            alert('تم الشراء بنجاح, سيصلك مندوبنا في اقرب وقت')
                            navigate('/')
                        }
                    })
                    .catch((e) => {
                        alert('انت تختار كمية اكبر من المتاحة من منتج ما, بالرجاء التأكد من المنتجات وتعديل الكمية')
                        navigate('/cart')
                        console.log(e)
                    })
            }
        }
    }

    useEffect(() => {
        const items = productContext?.cart?.cart_items?.map(item => ({
            product: item.product.id,
            Var: item.Var.id,
            quantity: item.quantity
        }));
        setOrderItems(items);
    }, [productContext.cart.cart_items])
    return (
        <>
            <Header />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='container border shadow text-end'>
                <form onSubmit={Checkout}>
                    <div className='d-flex flex-column mb-2'>
                        <strong>الأسم</strong>
                        <input
                            placeholder='أدخل اسمك'
                            type='text'
                            onChange={(e) => setName(e.target.value)}
                            className='text-end'
                        />
                    </div>
                    <div className='d-flex flex-column mb-2'>
                        <strong>العنوان</strong>
                        <input
                            placeholder='ادخل عنوانك الأول'
                            type='text'
                            onChange={(e) => setShippingAdd(e.target.value)}
                            className='text-end'
                        />
                    </div>
                    <div className='d-flex flex-column mb-2'>
                        <strong>"العنوان الثاني "<span className='text-danger'>أختياري</span></strong>
                        <input
                            placeholder='أدخل عنوانك الثاني أختياري'
                            type='text'
                            onChange={(e) => setShippingAdd2(e.target.value)}
                            className='text-end'
                        />
                    </div>
                    <div className='d-flex flex-column mb-2'>
                        <strong>الهاتف</strong>
                        <input
                            placeholder='أدخل رقم هاتفك'
                            type='text'
                            onChange={(e) => setPhone(e.target.value)}
                            className='text-end'
                        />
                    </div>
                    <div className='d-flex flex-column mb-2'>
                        <strong>"الهاتف الثاني "<span className='text-danger'>أختياري</span></strong>
                        <input
                            placeholder='أدخل رقم هاتفك الثاني أختياري'
                            type='text'
                            onChange={(e) => setPhone2(e.target.value)}
                            className='text-end'
                        />
                    </div>
                    <div className='d-flex flex-column mb-2'>
                        <strong htmlFor="state-select">:أختر محافظتك</strong>
                        <select
                            id="state-select text-end"
                            onChange={(e) => setShippingTo(e.target.value)}
                        >
                            <option value="">Select a state</option>
                            {productContext.states.map((state) => (
                                <option key={state.id} value={state.id}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {
                        selectedState ?
                            <>
                                <div className='d-flex flex-row-reverse'>
                                    <label>سعر الشحن</label>
                                    <strong>{selectedState?.shipping_price}</strong>
                                </div>
                                <div className='d-flex flex-row-reverse'>
                                    <label>الأجمالي بعد الشحن</label>
                                    <strong>{productContext?.cart?.cart_items?.reduce((acc, item) => acc + (item.Var.sell_price * item.quantity), 0) + selectedState?.shipping_price}</strong>
                                </div>
                            </>
                            : null
                    }
                    <button className='btn btn-success mt-2 mb-4'>اشتري الأن</button>
                </form>
            </div>
        </>
    )
}

export default Checkout