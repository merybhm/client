import React from 'react'

function NavbarPharmacien() {

    const logout = () => {
        localStorage.removeItem("user");
        window.location.replace('/')
    }
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
                            <a className="nav-link" href="/homePharmacien">Acceuil</a>
                        </li>
                        <li className="nav-item me-2">
                            <a className="nav-link" href="/mentionnerGarde">Mentioner une garde</a>
                        </li>
                        <li className="nav-item me-2">
                            <a className="nav-link" href="/historiquee">Historique de garde</a>
                        </li>

                    </ul>


                </div>
                <div className="nav-item navbar-dropdown dropdown-user dropdown" style={{ float: "right" }}>
                    <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown">
                        Log out
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                            <div className="dropdown-divider"></div>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={(e) => { logout() }}>
                                <i className="bx bx-power-off me-2"></i>
                                <span className="align-middle">Log Out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default NavbarPharmacien