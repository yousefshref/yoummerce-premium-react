import React, { useContext, useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { AuthContextProvider } from '../../utlits/AuthContext'

const OrderProductDetails = ({ x }) => {

    const userContext = useContext(AuthContextProvider)

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 767);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
        <div style={{fontSize: isSmallScreen ? "13px" : "15px"}} className='bg-white w-100 p-3 mb-5 mt-5 shadow d-flex flex-column flex-md-row'>
            <div className='mb-3 me-4' style={{maxWidth: isSmallScreen ? "100%" : "150px"}}>
                <Carousel className='h-100 d-flex justify-content-center'>
                    {x?.product_all?.images?.map((image) => (
                        <Carousel.Item key={image.id}>
                            <img
                                className="d-block w-100"
                                src={image.image}
                                alt={`Slide ${image.id}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            <div className='d-flex flex-column flex-grow-1'>
                <strong className='mb-0'>{x?.product_all?.name}</strong>
                <small className='text-muted'>{x?.Var_all?.Var_name}</small>
                <hr />
                <strong>{x?.Var_all?.sell_price} EGP :سعر المنتج</strong>
                <div className='d-flex flex-column flex-md-row justify-content-between align-items-center mt-3'>
                    <div className='d-flex align-items-center mb-3 mb-md-0'>
                        <strong className='mb-0'>الكمية: {x?.quantity}</strong>
                    </div>
                    <div className='d-flex align-items-center text-md-end'>
                        <small className='text-muted'>{x?.total_products_price} EGP :السعر كامل</small>
                        {userContext?.user?.is_staff && <small className='text-muted ms-3'>{x?.total_commession} EGP :العمولة كاملة</small>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderProductDetails