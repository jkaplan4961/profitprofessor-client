import React, { useState, useEffect, useContext } from 'react'
import { TokenContext } from '../Context/TokenContext'

interface PropTypes {
    productId: string;
}

type Product= {
    id: number;
    name: string;
    description: string;
    price: number;
    manufacturer: string;
    upc: string;
    cost: number;
    part_num: string;
    shipping_cost: number;
    packaging:number;
    image: string;
    userId: number;
    marketplaceId: number;
    vendorId: number;
}

export default function ProductDetails({ productId } : PropTypes) {
    const [token, setToken ] = useContext(TokenContext)
    const initialState : Product = {
        id: Number(productId),
        name: "",
        description: "",
        price: 0,
        manufacturer: "",
        upc: "",
        cost: 0,
        part_num: "",
        shipping_cost: 0,
        packaging:0,
        image: "",
        userId: -1,
        marketplaceId: -1,
        vendorId: -1
    }
    const [product, setProduct] = useState(initialState)
    const [commission, setCommission] = useState(0)

    useEffect(() => {
        fetch(`http://localhost:3001/product/${productId}`, {
            method: "GET",
            headers: {
                "Authorization": token,
                'Content-Type':"application/json",
            }
        })
            .then(data => data.json())
            .then(product => {
                setProduct(product)
                return product.marketplaceId
            })
            .then(id => {
               fetch(`http://localhost:3001/marketplace/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                    'Content-Type':"application/json",
                }
               })
                .then(data => data.json())
                .then(marketplace => {
                    setCommission(marketplace.commission)
                })
            })
    }, [token])

    return (
        <div>
            <table>
                <tr>
                    <td>Product Name</td>
                    <td>{product.name}</td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>{product.description}</td>
                </tr>
                <tr>
                    <td>Manufacturer</td>
                    <td>{product.manufacturer}</td>
                </tr>
                <tr>
                    <td>UPC</td>
                    <td>{product.upc}</td>
                </tr>
                <tr>
                    <td>Part Number</td>
                    <td>{product.part_num}</td>
                </tr>
                <tr>
                    <td>Price</td>
                    <td>${Number(product.price).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Cost</td>
                    <td>${Number(product.cost).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Shipping Cost</td>
                    <td>${Number(product.shipping_cost).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Packaging Cost</td>
                    <td>${Number(product.packaging).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Marketplace</td>
                    <td>{product.marketplaceId}</td>
                </tr>
                <tr>
                    <td>Vendor</td>
                    <td>{product.vendorId}</td>
                </tr>
                <tr>
                    <td>Image</td>
                    <td>{product.image}</td>
                </tr>
                <tr>
                    <td>Profit</td>
                    <td>${Number((product.price * (1 - (commission / 100.00))) - product.cost - product.shipping_cost - product.packaging).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Profit Margin</td>
                    <td>{Number(Number((product.price * (1 - (commission / 100.00))) - product.cost - product.shipping_cost - product.packaging)/Number(product.price) * 100).toFixed(2)}%</td>
                </tr>
            </table>
        </div>
    )
}
