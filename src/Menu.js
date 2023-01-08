import { Fragment } from "react"
import './Menu.css';

const Menu = ({isOpen, onClose, children}) => {
    return (
        <Fragment>
            {isOpen && (
                <div className="overlay">
                    <div className="overlay_background">
                    <div className="overlay_container">
                        <div className="overlay_grid">
                            {children}
                        </div>
                    </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
};

export default Menu;