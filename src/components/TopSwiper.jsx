import React, { useState } from 'react';
import { db, storage } from '../firebase/firebase'
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

function TopSwiper() {
    
    const [title, setTitle] = useState('')
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
                    console.log('Photo uploaded!');
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
            const docRef = await addDoc(collection(db, 'topswiper'), {
                
                title,
                imagelink,
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
        <div className='p-3 overflow-hidden flex flex-col justify-center align-middle'>
        <div className='bg-white shadow-lg rounded-lg p-6 '>
            <h3 className='text-2xl font-medium mb-3'>Add Your Top Swiper</h3>

            <div className='mb-3'>
                <label className='text-gray-600'>Title</label>
                <input
                    className='border border-gray-400 p-2 rounded'
                    type='text'
                    placeholder="Enter your name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className='mb-3'>
                <label className='text-gray-600'>Choose Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>

            <div>
                {image && <img src={image} alt="Selected Image" className='w-48 h-48 object-cover mb-3 rounded' />}
            </div>

            {formError && <p className='text-red-500'>{formError}</p>}

            {uploading && <div className="loader"></div>}

            <div className='mb-3 flex flex-col w-[150px] justify-center align-middle gap-6'>
                <button className='p-2 bg-cyan-400 rounded-xl text-white mr-2' onClick={uploadImage}>Upload Image</button>
                <button className='p-2 bg-cyan-500 rounded-xl text-white' onClick={handleFormSubmit}>Submit</button>
            </div>
        </div>
    </div>
    );
}

export default TopSwiper;