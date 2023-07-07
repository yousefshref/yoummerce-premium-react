import { Rating } from '@mui/material'
import React from 'react'

const Review = ({ product }) => {
    return (
        <div className="container text-end mb-5">
            {/* clint */}
            <div className="mt-4">
                <Rating name="read-only" value={product?.rating} readOnly />
                <div className="border border-1 p-3 rounded-4">
                    <div className="d-flex flex-row justify-content-end">
                        <strong className="mt-auto mb-auto me-2">{product?.user}</strong>
                        <img alt='profile' src="/pc.jpg" style={{ width: "50px", borderRadius: "100px" }} />
                    </div>
                    <div>
                        <p>{product?.comment}</p>
                    </div>
                    <div>
                        <strong>{product?.created_at.slice(0, 10)}</strong>
                    </div>
                </div>
            </div>
            {/* clint */}

            {/* admin reply */}
            {product?.reply === null || product?.reply?.length === 0 || product?.reply === 0 ? null :
                <div className="mt-4">
                    <div className="border border-danger border-1 p-3 rounded-4" style={{ width: "90%" }}>
                        <div className="d-flex flex-row justify-content-end">
                            <strong className="mt-auto mb-auto me-2">{"تم الرد من المسؤول"}</strong>
                            {/* <img alt='profile' src="/admin_pc.jpg" style={{ width: "50px", borderRadius: "100px" }} /> */}
                        </div>
                        <div>
                            <p>{product?.reply}</p>
                        </div>
                    </div>
                </div>}
            {/* admin reply */}

        </div>
    )
}

export default Review