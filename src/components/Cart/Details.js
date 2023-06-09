import React from 'react'

const Details = ({ e, changeQuantity, setQuantity, quantity, deleteCartItem, userContext }) => {
    return (
        <div className='d-flex flex-column flex-md-row w-100 justify-content-between px-1 row mt-auto mb-auto bg-white'>
            <form className='col-12 mb-3 w-100 justify-content-between d-flex' onSubmit={changeQuantity}>
                <input
                    placeholder='الكمية'
                    value={quantity}
                    onChange={(x) => setQuantity(x.target.value)}
                    className='w-100 form-control'
                />
                <button style={{fontSize:"0.79em"}} className='btn btn-primary'>تغيير</button>
            </form>
            <div style={{fontSize:"0.79em"}} className='col-md-3 mb-3 mb-md-0'>
                <strong className='text-success'>{e?.total} EGP</strong>
                <strong> :السعر</strong>
            </div>
            {userContext?.user?.is_staff ? <div style={{fontSize:"0.79em"}} className='col-md-3 mb-3 mb-md-0'>
                <strong className='text-success'>{e?.total_commission} EGP</strong>
                <strong> :العمولة</strong>
            </div>:null}
            <strong style={{fontSize:"1em"}} className='text-danger col-1 align-self-center' onClick={deleteCartItem}>X</strong>
        </div>
    )
}

export default Details