import { useEffect, useState } from "react";
import styles from "./ViewProducts.module.scss";
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config';
import { query, orderBy, onSnapshot, collection, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import {Link} from "react-router-dom";
import Loader from "../../loader/Loader";
import Notiflix from "notiflix";
import { useDispatch } from "react-redux";
import { STORE_PRODUCTS } from "../../../redux/slice/productSlice";

const ViewProducts = () => {
  const [products, setProducts] = useState([])
  const [IsLoading, setIsLoading] = useState([false])

  const displatch = useDispatch()

  useEffect(() => {
    getProducts()
  },[]);

  const getProducts = () => {
    setIsLoading(true);

    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));

      
      onSnapshot(q, (snapshot) => {
        //console.log(snapshot.docs);
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        //console.log(allProducts);
        setProducts(allProducts);
        setIsLoading(false);
        displatch(
          STORE_PRODUCTS({
            products: allProducts
          })
        )

      }); 

    } catch(error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  };

  const confirmDelete = (id, imageUrl) => {
    Notiflix.Confirm.show(
      'Delete Product!!',
      'You are about to delete this product',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageUrl)
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: '320px',
        borderRadius: '6px',
        titleColor: "orangered",
        okButtonBackground: "orangered",
        CssAnimationStyle: "zoom",
      },
    );
  };

  const deleteProduct = async(id, imageUrl) => {
    try{
      await deleteDoc(doc(db, "products", id));

      // Create a reference to the file to delete
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef)
      toast.success("Product deleted successfully")

    } catch(error) {
      toast.error(error.message)
    }
  };

  return (
    <>
    {IsLoading && <Loader />}
    <div className={`${styles.table} pt-20`}>
      <h1 className='font-semibold text-3xl text-center'>All Products</h1>

      {products.length === 0 ? (
        <p>No Product found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>s/n</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {products.map((product, index) => {
            const {id, name, price, imageUrl, category} = product;
            return (
              
                <tr key={id}>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    <img src={imageUrl} alt={name} style={{width: "50px"}} />
                  </td>
                  <td>
                    {name}
                  </td>
                  <td>
                    {category}
                  </td>
                  <td>
                    {`#${price}`}
                  </td>
                  <td className={styles.icons}>
                    <Link to={`/admin/add-product/${id}`}>
                      <FaEdit size={20} color="green"/>
                    </Link>

                    &nbsp;
                    <FaTrashAlt size={18} color="red"
                    onClick={() => confirmDelete(id, imageUrl)}/>
                  </td>
                </tr>
              
            )
          })}
          </tbody>
        </table>
      )}
    </div>
      
    </>
  );
};

export default ViewProducts;