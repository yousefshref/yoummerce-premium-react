import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { ProductsRelated } from './ProductsRelated'

const RelatedProducts = ({product}) => {
    return (
        <>
            {product?.related_products?.length === 0 ? null : <hr className="mt-5" />}
            <Row className="container-fluid me-auto ms-auto">
                {product?.related_products?.length === 0 ? null : <h3>منتجات ذات صلة</h3>}
                {product?.related_products?.map((relproduct) => (
                    <Col key={relproduct.id} sm={6} md={4} lg={3}>
                        <ProductsRelated product={relproduct} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default RelatedProducts