import React from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="  bg-gray-200 p-5" > {/* Adjust the width and background color as needed */}
            <div className="p-4">
                <ul className='flex flex-row gap-10 float-right'>
                    <li className="mb-2">
                        <Link to="/" activeClassName="active">
                            <p>Home</p>
                        </Link>
                    </li>
                    {/* <li className="mb-2">
                        <Link to="/topswiper" activeClassName="active">
                            <p>Top Swiper</p>
                        </Link>
                    </li> */}
                    <li className="mb-2">
                        <Link to="/topitem" activeClassName="active">
                            <p>Top Item</p>
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/category" activeClassName="active">
                            <p>Category Item</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;