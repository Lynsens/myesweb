import { Fragment } from "react"
import './Menu.css';

const Menu = ({isOpen, onClose, children}) => {
    return (
        <Fragment>
            {isOpen && (
                <div class="overlay">
                    <div class="overlay_background">
                    <div class="overlay_container">
                        <div class="overlay_grid">
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