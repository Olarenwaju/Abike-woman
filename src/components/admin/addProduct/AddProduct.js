import { useState } from 'react'
import {  ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, addDoc, Timestamp, doc, setDoc } from "firebase/firestore"; 
import { db, storage } from '../../../firebase/config';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../loader/Loader';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../redux/slice/productSlice';



const categories = [
  {id: 1, name: "Pallazo"},
  {id: 2, name: "Jump Suits"},
  {id: 3, name: "Gown"},
  {id: 4, name: "Trousers"},
];

const initialState = {
    name: "",
    imageUrl: "",
    price: 0,
    category: "",
    brand: "",
    desc: ""
};

const AddProduct = () => {
  const { id } = useParams();
  console.log(id); 
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id )
  console.log(productEdit)

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, {...initialState}, productEdit)
    return newState;
  });

  const [uploadProgress, setuploadProgress]  = useState(0);
  const [IsLoading, setIsLoading]  = useState(false);

  const navigate = useNavigate();
  

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setProduct({...product, [name]: value});
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    //console.log(file);
  
    const storageRef = ref(storage, `abikewoman/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
      
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setuploadProgress(progress)
      
    }, 
    (error) => {
      // Handle unsuccessful uploads
      toast.error(error.message)
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setProduct({...product, imageUrl: downloadURL});
        toast.success("Image uploaded successfully.")
      });
    }
  );


  };

  const addProduct = (e) => {
    e.preventDefault()
    //console.log(product)
    setIsLoading(true)

    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate()
      });
      console.log(docRef);
      setIsLoading(false)
      setuploadProgress(0)
      setProduct({...initialState});

      toast.success("Product uploaded successfuly");
      navigate("/admin/all-products");
    } catch(error) {
      setIsLoading(false)
      toast.error(error.message);
    }


  };

  const editProduct = (e) => {
    e.preventDefault();
    //consle.log(product)
    setIsLoading(true);

    if (product.imageUrl !== productEdit.imageUrl) {
      const storageRef = ref(storage, productEdit.imageUrl);
      deleteObject(storageRef); 
    }

    try {
      // Add a new document in collection ""
       setDoc(doc(db, "products", id), {
        name: product.name,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate()
      });

      setIsLoading(false);
      toast.success("Product Edited Successfuly")
      navigate("/admin/all-products")
    } catch(error) {
      setIsLoading(false);
      toast.error(error.message)
    }
  };

  return (
    <>
    {IsLoading && <Loader />}
    <div className='pt-20'>
      <h2 className='font-semibold text-3xl text-center'>{detectForm(id, "Add New Product", "Edit Product")}</h2>
      
      <div className="border-b-2 w-full max-w-lg p-4">
        <form onSubmit={detectForm(id, addProduct, editProduct)}>
          <label className="block font-medium text-base pb-2">Product Name:</label>
          <input
            className="block p-2 text-lg w-full border-2 border-slate-300 rounded-md mb-5" 
            type="text" 
            placeholder="Product name"
            required 
            name="name" 
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />

          <label className="block font-medium text-base pb-1">Product Image:</label>
          <div className="border-2 border-slate-300 p-2 rounded-md mb-5">
            {uploadProgress === 0 ? null : (
              <div className="bg-slate-500 border-2 rounded-md">
                <div className="bg-gray-900 rounded-lg text-white text-md px-1" 
                  style={{width: `${uploadProgress}%`}}>
                  {uploadProgress < 100 ? 
                    `Uploading ${uploadProgress}%` : `Upload Complete ${uploadProgress}%`}
                </div>
              </div>
            )}
            
            <input
              className="block p-2 text-lg w-full border-2 border-slate-300 rounded-md mb-5"
              type="file"
              placeholder="Product Image"
              accept="image/*"
              name="image"
              onChange={(e) => handleImageChange(e)} 
            />

            {product.imageUrl === "" ? null : (
              <input 
              className="block p-2 text-lg w-full border-2 border-slate-300 rounded-md mb-5"
                type="text" 
                //required 
                placeholder='Image URL'
                name="imageUrl" 
                value={product.imageUrl}
                disabled 
              />
            )}
            
          </div>

          <label className="block font-medium text-base pb-2">Product Price</label>
          <input 
            className="block p-2 text-lg w-full border-2 border-slate-300 rounded-md mb-5"
            type="number" 
            placeholder="Product price"
            required 
            name="price" 
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />

          <label className="block font-medium text-base pb-2">Product Category</label>
          <select
            className="block p-2 text-lg w-full border-2 border-slate-300 rounded-md mb-5"
            required 
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disabled>
              -- choose product category --
            </option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              )
            })}
          </select>

          <label className="block font-medium text-base pb-2">Product Brand:</label>
          <input 
            className="block p-2 text-lg w-full border-2 border-slate-300 rounded-md mb-5"
            type="text" 
            placeholder="Product Brand"
            required 
            name="brand" 
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />

          <label className="block font-medium text-base pb-2">Product Description</label>
          <textarea 
            className="block p-2 text-lg w-full border-2 border-slate-300 rounded-md mb-5"
            name="desc"
            value={product.desc}
            required
            onChange={(e) => handleInputChange(e)}
            cols="30"
            rows="10">

          </textarea>

          <button className='btn-full px-3 py-3'>
            {detectForm(id, "Save Product", "Edit Product")}
          </button>

        </form>

      </div>
    </div>
    </>
  );
};

export default AddProduct;