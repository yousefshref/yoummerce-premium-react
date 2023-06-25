import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { ProductContextProvider } from '../utlits/ProductContext'
import OrderProductDetails from '../components/Order/OrderProductDetails'
import OrderDetails from '../components/Order/OrderDetails'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const Orders = () => {
  const orderContext = useContext(ProductContextProvider)

  const [selectedDate, setSelectedDate] = useState("");
  
  const handleChange = (date) => {
    if (date) {
      date.setHours(12); // set time to 12:00:00 in local timezone
      const formatted = date.toISOString().slice(0, 10);
      orderContext?.setDate(formatted);
      setSelectedDate(date);
    } else {
      setSelectedDate("");
      orderContext?.setDate("");
    }
  };

  const handleStatusChange = (event) => {
    orderContext?.setStatus(event.target.value);
    console.log(event.target.value);
  };

  // console.log(orderContext?.date);

  return (
    <div className='cart_bg'>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className='container'>
        <div className='text-end'>
          <h2 className='my-4'>ستظهر مشترياتك كلها هنا</h2>
        </div>
        <hr />
        <div className='text-end'>
          <h5>ابحث عن المشتريات</h5>
          <div className='shadow border p-2'>
            <strong className='mt-b text-muted'>التاريخ</strong>
            <div>
              <DatePicker
                selected={selectedDate}
                onChange={handleChange}
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
          <div className='shadow border p-2'>
            <strong className='mt-b text-muted'>حالة التوصيل</strong>
            <div>
              <select id="status" value={orderContext?.status || ""} onChange={handleStatusChange}>
                <option value="">Select an option</option>
                <option value="arrived">Arrived</option>
                <option value="on the way">On the way</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
        <hr />
        {
          orderContext?.orders?.map((e) => (
            <div key={e.id} className='bg-white d-flex flex-row row align-items-center shadow p-2 mb-5 mt-4'>
              <div className='orderProductDetails'>
                {
                  e?.order_items?.map((x) => (
                    <OrderProductDetails x={x} key={x.id} />
                  ))
                }
              </div>
              <OrderDetails e={e} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders