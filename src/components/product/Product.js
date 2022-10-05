import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { selectProducts, STORE_PRODUCTS } from "../../redux/slice/productSlice";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/productFilter";
import ProductList from "./productList/productList"; 

const Product = () => {
    const {data, IsLoading} = useFetchCollection("products")
    const products = useSelector(selectProducts)
    //console.log(products)
  
    //Initially used before I used custom Hook
    // const [products, setProducts] = useState([])
    // const [IsLoading, setIsLoading] = useState([false])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            STORE_PRODUCTS({
                products: data,
            })
        );
    }, [dispatch])


    return (
        <section>
            <div className={`container ${styles.product}`}>
                <aside className={`${styles.filter}`}>
                    <ProductFilter />
                </aside>
                <div className={`${styles.content}`}>
                    <ProductList products={products} />
                </div>
            </div>
            
        </section>
    )
}

export default Product