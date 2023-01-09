import React from 'react'

function NavbarUser() {
    return (


        <nav
            className="layout-navbar navbar navbar-expand-xl navbar-atached align-items-center bg-navbar-theme bg-dark p-4"
            id="layout-navbar"
        >
            <a className="navbar-brand" href="/"><b className="display-6">Localisation des pharmacies</b></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-nav-right d-flex align-items-center ms-5" id="navbar-collapse">

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active me-2">
                            <a className="nav-link" href="/pharmacies">Liste des pharmacies</a>
                        </li>
                        <li className="nav-item me-2">
                            <a className="nav-link" href="/map2">Carte</a>
                        </li>
                        <li className="nav-item me-2">
                            <a className="nav-link" href="/gardeActuel">Pharmacies en cours de garde</a>
                        </li>
                        <li className="nav-item me-2">
                            <a className="nav-link" href="/mapProche">Pharmacie la plus proche</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="nav-item navbar-dropdown dropdown-user dropdown" style={{ float: "right" }}>
                <a href="/">
                    <button className="dropdown-item">
                        <i className="bx bx-power-off me-2"></i>
                        <span className="align-middle">Login</span>
                    </button>
                </a>
            </div>
        </nav>

    )
}

export default NavbarUser