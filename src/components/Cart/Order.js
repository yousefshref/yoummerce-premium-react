import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Order = ({ total, total_commission, userContext }) => {
  const nvigate = useNavigate()
  return (
    <div className='container m-auto text-center shadow border d-flex justify-content-center flex-row p-2 bg-white row'>
      &nbsp;
      &nbsp;
      {userContext?.user?.is_staff ? <><div className='mt-auto mb-auto'>
        <strong>{total_commission}</strong>
        <strong> :اجمالي العمولة</strong>
      </div>
        <div className='mt-auto mb-auto'>&nbsp; ---- &nbsp;</div></> : null}
      <div className='mt-auto mb-auto'>
        <strong>{total}</strong>
        <strong> :اجمالي السعر</strong>
      </div>
      &nbsp;
      <button className='btn btn-outline-danger' onClick={() => nvigate('/checkout')}>اشتري الأن</button>
    </div>
  )
}