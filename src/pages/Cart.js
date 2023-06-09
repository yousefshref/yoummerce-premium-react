import React, { useContext } from 'react'
import { Header } from '../components/Header'
import Product from '../components/Cart/Product'
import { ProductContextProvider } from '../utlits/ProductContext'
import { Order } from '../components/Cart/Order'
import { AuthContextProvider } from '../utlits/AuthContext'

const Cart = () => {
  const productContext = useContext(ProductContextProvider)
  const userContext = useContext(AuthContextProvider)

  const total = productContext?.cart?.cart_items?.reduce((acc, item) => acc + item?.total, 0);
  const total_commission = productContext?.cart?.cart_items?.reduce((acc, item) => acc + item?.total_commission, 0);

  return (
    <div className='cart_bg'>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {productContext?.cart?.cart_items?.length == 0 ? <div className='w-100 text-center text-danger'><h1>لا يوجد منتجات في حقيبتك</h1></div> :productContext?.cart?.cart_items?.map((e) => <Product userContext={userContext} key={e.id} e={e} />)}
      <hr />
      {productContext?.cart?.cart_items?.length == 0 ? null : <Order userContext={userContext} total={total} total_commission={total_commission} /> }
      <br />
      <br />
      <br />
    </div>
  )
}

export default Cart