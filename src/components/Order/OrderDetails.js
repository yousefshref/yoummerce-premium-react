import React from 'react'

const OrderDetails = ({e}) => {
    return (
        <div className='col-12 col-md-6 mt-3 w-100 text-end mb-5'>
            <div className='d-flex flex-column'>
                <strong className='mb-0'>التوصيل</strong>
                <small className='text-muted'>{e?.name}</small>
                <small className='text-muted'>{e?.shipping_address}</small>
                <small className='text-muted'>{e?.shipping_address2}</small>
                <small className='text-muted'>{e?.shipping_to_text} <strong>التوصيل ب {e?.shipping_price}</strong></small>
                <hr />
                <strong className='mb-0'>الهاتف</strong>
                <small className='text-muted'>{e?.phone}</small>
                <small className='text-muted'>{e?.phone2}</small>
                <hr />
                <strong className='mb-0'>حالة التوصيل</strong>
                <small className='text-muted'>{e?.order_status}</small>
                <hr />
                <strong>السعر النهائي</strong>
                <strong>{e?.total_order_price}</strong>
            </div>
        </div>
    )
}

export default OrderDetails