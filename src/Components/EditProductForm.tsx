import { useState, useContext, useEffect } from 'react'
import "./style.css";
import { TokenContext } from "../Context/TokenContext";
import { Select, MenuItem } from '@material-ui/core';

type EbayItem = {
  price: {
    value: number;
    currency: string;
  };
  image:{
    imageUrl:string;
  };
  title: string;
}


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

type Vendor= {
  id: number;
  company: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string
}

type Marketplace= {
    id: number;
    name: string;
    commission: number;
    shipping_price: number;
    image: string;
}

export default function EditProductForm({ productId } : PropTypes) {
  const [token, setToken] = useContext(TokenContext)
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
  const[error,setError] = useState({
    name: "",
    description: "",
    price: "",
    manufacturer: "",
    upc: "",
    cost: "",
    part_num: "",
    shipping_cost: "",
    packaging: "",
    vendorId: "",
    marketplaceId: ""
  })
  const [ vendors, setVendors ] = useState([])
  const [ marketplaces, setMarketplaces ] = useState([])

  useEffect(() => {
      fetch("http://localhost:3001/vendor/",{
        method: "GET",
        headers: new Headers({
            "content-Type": "application/json",
            "Authorization": token,
        }),
      }).then(vendors => vendors.json())
          .then(data => {
            console.log(data)
              setVendors(data)
          })
      fetch("http://localhost:3001/marketplace/",{
        method: "GET",
        headers: new Headers({
            "content-Type": "application/json",
            "Authorization": token,
        }),
      }).then(marketplaces => marketplaces.json())
          .then(data => {
              setMarketplaces(data)
          })
          .then(() => {
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
            })
          })
  }, [token])

    const handleSearch = (event: any) => {
      event.preventDefault();
      console.log(process.env.REACT_APP_EBAY_TOKEN)
      fetch(`https://api.ebay.com/buy/browse/v1/item_summary/search?gtin=${product.upc}&=&limit=10`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + process.env.REACT_APP_EBAY_TOKEN,
            'Content-Type':"application/json",
        }
    }).then((res) => res.json()).then((data) => {
      let prices:Array<number>=[]
      if (data?.itemSummaries) {
        for(let i=0;i<data.itemSummaries.length; i++){
        const item:EbayItem=data.itemSummaries[i]
        prices.push(item.price.value)
        if (i === 0) {
          setProduct({...product,image:String(item.image.imageUrl)})
        }
      }
      let total:number =0 
      prices.forEach(price => total+=Number(price))
      setProduct({...product,price:Number(total/prices.length)})
      }
      
    })
  

    }
    const handleChange = (event: any) => {
      event.preventDefault();
      const { name, value } = event.target;
      switch (name) {
        case "name":
            value.length < 3
                    ? setError({...error, name: "Product name must be at least 3 characters long!"}) 
                    : setError({...error, name: ""});
          break;
        case "description":
            value.length < 1
                    ? setError({...error,description:"Enter a description!"})
                    : setError({...error, description: ""});
          break;
        case "price":
                isNaN(value)
                    ? setError({...error, price: "Enter a price!"})
                    : setError({...error, price: ""});  
          break;
          case "manufacturer":
            value.length < 2
                    ? setError({...error, manufacturer: "Enter a manufacturer!"}) 
                    : setError({...error, manufacturer: ""});
          break;
          case "cost":
            isNaN(value)
                    ? setError({...error, cost: "Enter the cost!"}) 
                    : setError({...error, cost: ""});
          break;
          case "part_num":
            isNaN(value)
                    ? setError({...error, part_num: "Enter the cost!"}) 
                    : setError({...error, part_num: ""});
          break;
          case "shipping_cost":
            isNaN(value)
                    ? setError({...error, shipping_cost: "Enter the cost!"}) 
                    : setError({...error, shipping_cost: ""});
          break;
          case "packaging":
            isNaN(value)
                    ? setError({...error, packaging: "Enter the cost!"}) 
                    : setError({...error, packaging: ""});
          break;
          case "vendorId":
            isNaN(value) || value < 1
                    ? setError({...error, shipping_cost: "Select a vendor"}) 
                    : setError({...error, shipping_cost: ""});
          break;
          case "marketplaceId":
            isNaN(value) || value < 1
                    ? setError({...error, shipping_cost: "Select a marketplace"}) 
                    : setError({...error, shipping_cost: ""});
          break;
        default:
          break;
      }
      setProduct(Object.assign(product, {[name]: value} ));
      console.log(error);
    };
    const handleSubmit = (event: any) => {
      event.preventDefault();
      let validity = true;
      Object.values(error).forEach(
        (val) => val.length > 0 && (validity = false)
      );
      if (product.name === "" || product.description === "" || product.manufacturer === "") {
        validity = false
      }
      if (validity === true) {
        console.log ({name: product.name,
          description: product.description,
          price: product.price,
          manufacturer: product.manufacturer,
          upc: product.upc,
          cost: product.cost,
          part_num: product.part_num,
          shipping_cost: product.shipping_cost,
          packaging_cost: product.packaging,
          image: product.image,
          vendorId: product.vendorId,
          marketplaceId: product.marketplaceId})
        fetch(`http://localhost:3001/product/${product.id}`, {
          method: "PUT",
          body: JSON.stringify({
            name: product.name,
            description: product.description,
            price: product.price,
            manufacturer: product.manufacturer,
            upc: product.upc,
            cost: product.cost,
            part_num: product.part_num,
            shipping_cost: product.shipping_cost,
            packaging_cost: product.packaging,
            image: product.image,
            vendorId: product.vendorId,
            marketplaceId: product.marketplaceId
          }),
          headers: new Headers({
            "content-Type": "application/json",
            "Authorization": token,
          }),
        })
        window.location.href="/products/-1/-1"
        return false
      } else {
        setError({...error, name: "Product is already created!"})
        console.log("You cannot be registered!!!"); //show error later
      }
    };
    return (
      <form noValidate>
        <div className="name">
          <label htmlFor="name">Product Name</label>
          <input
            type="name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
          {error.name.length > 0 && (
            <span style={{ color: "red" }}>{error.name}</span>
          )}
        </div>
        <div className="description">
          <label htmlFor="description">Description</label>
          <input
            type="description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
          {error.description.length > 0 && (
            <span style={{ color: "red" }}>{error.description}</span>
          )}
        </div>
        <div className="manufacturer">
          <label htmlFor="manufacturer">Manufacturer</label>
          <input
            type="manufacturer"
            name="manufacturer"
            value={product.manufacturer}
            onChange={handleChange}
          />
          {error.manufacturer.length > 0 && (
            <span style={{ color: "red" }}>{error.manufacturer}</span>
          )}
        </div>
        <div className="upc">
          <label htmlFor="upc">UPC</label>
          <input
            type="upc"
            name="upc"
            value={product.upc}
            onChange={handleChange}
          />
          {error.upc.length > 0 && (
            <span style={{ color: "red" }}>{error.upc}</span>
          )}
        </div>
        <div className="price">
          <label htmlFor="price">Price</label>
          <input
            type="price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
          {error.price.length > 0 && (
            <span style={{ color: "red" }}>{error.price}</span>
          )}
        </div>
        <div className="part_num">
          <label htmlFor="part_num">Part Number</label>
          <input
            type="part_num"
            name="part_num"
            value={product.part_num}
            onChange={handleChange}
          />
          {error.part_num.length > 0 && (
            <span style={{ color: "red" }}>{error.part_num}</span>
          )}
        </div>
        <div className="cost">
          <label htmlFor="cost">Cost</label>
          <input
            type="cost"
            name="cost"
            value={product.cost}
            onChange={handleChange}
          />
          {error.cost.length > 0 && (
            <span style={{ color: "red" }}>{error.cost}</span>
          )}
        </div>
        <div className="shipping_cost">
          <label htmlFor="shipping_cost">Shipping Cost</label>
          <input
            type="shipping_cost"
            name="shipping_cost"
            value={product.shipping_cost}
            onChange={handleChange}
          />
          {error.shipping_cost.length > 0 && (
            <span style={{ color: "red" }}>{error.shipping_cost}</span>
          )}
        </div>
        <div className="packaging">
          <label htmlFor="packaging">Packaging Cost</label>
          <input
            type="packaging"
            name="packaging"
            value={product.packaging}
            onChange={handleChange}
          />
          {error.packaging.length > 0 && (
            <span style={{ color: "red" }}>{error.packaging}</span>
          )}
        </div>
        <div className="product_image">
          <label htmlFor="product_image">Image</label>
          <input
            type="text"
            name="product_image"
            value={product.image}
            onChange={(e:any)=>setProduct({...product,image:e.target.value})}
          />
        </div>
        <div className="vendor">
          <label htmlFor="vendor">Vendor</label>
          <Select
            labelId="vendor-select"
            id="vendor-select"
            value={product.vendorId}
            onChange={e => {
              setProduct({...product, vendorId: e.target.value as number});
            }}
          >
            {vendors.map((v: Vendor) => (
              <MenuItem value={v.id}>{v.company}</MenuItem>
            ))}            
        </Select>
          {error.vendorId.length > 0 && (
            <span style={{ color: "red" }}>{error.vendorId}</span>
          )}
        </div>
        <div className="marketplace">
          <label htmlFor="marketplace">Marketplace</label>
          <Select
            labelId="marketplace-select"
            id="marketplace-select"
            value={product.marketplaceId}
            onChange={e => {
              setProduct({...product, marketplaceId: e.target.value as number});
            }}
          >
            {marketplaces.map((m: Marketplace) => (
              <MenuItem value={m.id}>{m.name}</MenuItem>
            ))}            
        </Select>
          {error.marketplaceId.length > 0 && (
            <span style={{ color: "red" }}>{error.marketplaceId}</span>
            )}
        </div>

        <div className="lookup">
          <button onClick={handleSearch}>Lookup Price on your marketplace!</button>
          </div>
        <div className="submit">
          <button onClick={handleSubmit}>Edit Product!</button>
        </div>
 
      </form>
    );
    
}