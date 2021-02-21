import React from 'react';
import MainButton from '../components/main-button/MainButton';

const SideNavBar = (props) => {
    return (
        <nav className="app-section">
            {
                props.isExportEnabled ?

                <MainButton 
                    disabled={false} 
                    title="Export" 
                    handleClick={props.exportCode}
                    style={{
                        height: "25px",
                        margin: "auto 1em",
                        padding: "auto"
                    }} 
                ></MainButton>

                : null
            }
        </nav>
    );
};

export default SideNavBar;
