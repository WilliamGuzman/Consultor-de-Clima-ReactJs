import React from 'react';
import PropType from 'prop-types';

const Header = ({titulo}) => {
    return ( 
        <nav>
            <div 
                className="nav-wrapper light-blue darken-2"
            >
                <a href='#!' className="brand-logo">{titulo}</a>
            </div>
        </nav>
     );
}
Header.PropType = {
    titulo: PropType.string.isRequired
}
export default Header;