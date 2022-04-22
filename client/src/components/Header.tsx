import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    render() {
        return (
            <header>
                <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-success px-4 py-2">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to='/' className='nav-link'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='upload' className='nav-link'>Upload film data</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header