import React from 'react'
import "./Header.css";

const Header = () => {
    return (
        <div className='wrapper'>
            <div className='left_items'>
                <i className="fa-solid fa-clock-rotate-left history_icon"></i>
                <div className='input_field'>
                    <input className='searchText' placeholder='Search' />
                    <div className='hello'>
                        <i className="fa-solid fa-sliders filter_Icon"></i>
                        <i className="fa-solid fa-magnifying-glass search_Icon"></i>
                    </div>
                </div>
            </div>
            <div className='right_items'>
                <i className="fa-regular fa-circle-question help_Icon"></i>
                <i className="fa-solid fa-user-tie avatar"></i>
            </div>
        </div>
    )
}

export default Header;