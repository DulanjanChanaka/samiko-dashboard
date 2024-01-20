import React, { useState } from 'react';
import { db, storage } from '../firebase/firebase'
import { ref,  getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import CategoryTable from './CategoryTable';

function CategoryItem() {
    
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [available, setAvailable] = useState('')
    const [uploading, setUploading] = useState(false);
    const [formError, setFormError] = useState('');
    const [image, setImage] = useState(null);
    const [imagelink, setImagelink] = useState('');

    const handleImageUpload = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setImage(imageUrl);
        }
    };

    const uploadImage = async () => {
        if (!image) {
            setFormError('Please select an image before uploading.');
            return;
        }

        setUploading(true);

        // Use a reference to Firebase Storage
        const storageRef = ref(storage, '' + Date.now()); // You can adjust the path as needed

        try {
            const response = await fetch(image);
            const blob = await response.blob();

            // Upload the blob to the storageReference
            await uploadBytesResumable(storageRef, blob).then(() => {
                getDownloadURL(storageRef).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setUploading(false);
                    alert("Photo uploaded!")
                    console.log('Photo uploaded!');
                    alert("Photo uploaded!")
                    setImagelink(downloadURL);
                    console.log(downloadURL);
                    console.log(imagelink)// Move this line inside the .then() block
                });
            });
        } catch (error) {
            console.error('Error uploading image: ', error);
            setUploading(false);
            console.log('Error uploading image', 'An error occurred while uploading the image.');
        }
    };


    const handleFormSubmit = async () => {
        if (!image) {
            setFormError('All fields and the image are required.');
            return;
        }

        setFormError('');

        try {
            const docRef = await addDoc(collection(db, 'products'), {
                
                title,
                imagelink,
                description,
                price,
                available,
                category,

            });

            console.log('Document written with ID: ', docRef.id);
            
            setTitle('');
            setImagelink('');


            // Handle form submission or other actions as needed
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <div className=' p-3 overflow-hidden px-5'>
            <div>
                <div className='  text-center font-medium mb-3'>
                <h3 >Add Your Category Item</h3>

                </div>
                
            <div className='flex flex-col mb-3'>
                    <label>Title</label>
                    <input
                    className='border-b border-solid'
                        type='text'
                        placeholder="Enter your name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>

                <div className='flex flex-col mb-3'>
                    <label>Description</label>
                    <input
                    className='border-b border-solid'
                        type='text'
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></input>
                </div>

                <div className='flex flex-col mb-3'>
                    <label>Price</label>
                    <input
                    className='border-b border-solid'
                        type='text'
                        placeholder="Enter Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></input>
                </div>

                <div className='flex flex-col mb-3'>
                <label>Availability</label>
                <select
                    value={available}
                    onChange={(e) => setAvailable(e.target.value)}
                    className='border-b border-solid'
                >
                    <option value="in_stock">In Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                </select>
            </div>


            <div className='flex flex-col mb-3'>
                <label>Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='border-b border-solid'
                > <option >---Select Category---</option>
                    <option value="bathroomfaucets">Bathroom Faucets</option>
                    <option value="mirrors">Bathroom Mirrors</option>
                    <option value="cabinets">Bathroom Cabinets and Vanities</option>
                    <option value="lighting">Bathroom Lighting</option>
                    <option value="tile">Bathroom Tiles and Flooring</option>
                    <option value="accessories">Bathroom Accessories</option>
                    <option value="hardware">Bathroom Hardware</option>
                    <option value="cleaning">Bathroom Cleaning and Maintenance Products</option>
                    <option value="heaters">Water Heaters</option>
                    <option value="towelbar">Shelving and Towel Bars</option>
                    <option value="curtains">Shower Curtains and Rods</option>
                    <option value="plumbing">Bathroom Plumbing Supplies</option>
                    <option value="ventilation">Bathroom Ventilation</option>
                </select>
            </div>

                <div >
                    <div className='flex flex-col mb-3'>
                    <label className='pb-2'>Choose Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    </div>
                 
                    <div>
                        {image && <img src={image} alt='category' style={{ width: 200, height: 200 }} />}
                    </div>
                    {formError && <p >{formError}</p>}
                    {uploading && <div className="loader"></div>}
                    <div className='flex flex-col mb-3'>
                    <button className='p-1 mt-3 border-2 rounded-lg outline-gray-600 ' onClick={uploadImage}>Upload Image</button>
                    <button className='p-2 bg-cyan-500 rounded-xl mt-5'onClick={handleFormSubmit}>Submit</button>

                    </div>
                    
                </div>
            </div>
            <div className='mt-[80px]'>
            <CategoryTable/>
            </div>
            
        </div>
    );
}



export default CategoryItem;