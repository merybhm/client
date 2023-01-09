
import Navbar from '../pages/NavbarPharmacien'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function HomePharmacien() {

    const [pharmacie, setPharmacie] = useState([]);
    const [id, setId] = useState(localStorage.getItem('pharmacie_id'));

    const loadPharmacie = async () => {
        const result = await axios.get(process.env.React_App_URLf + `pharmacies/pharmacie/id=${id}`);
        setPharmacie(result.data);
    }

    useEffect(() => {
        loadPharmacie()
    }, []);

    const etat = (etat) => {
        if (etat == 0) {
            return <span className="badge bg-label-warning me-1">En attente</span>;
        } else if (etat == 1) {
            return <span className="badge bg-label-success me-1">Accepté</span>;
        }
        else if (etat == 2) {
            return <span className="badge bg-label-danger me-1">Refusé</span>;
        }
    }

    return (
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <div class="layout-page">
                    <Navbar />
                    <div class="content-wrapper">
                        <div class="container-xxl flex-grow-1 container-p-y">
                            <div class="row">
                                <div class="col-md-10 mx-auto">
                                    <div class="card">
                                        <div class="d-flex align-items-end row">
                                            <div class="col-sm-7">
                                                <div class="card-body">
                                                    <h5 class="card-title">Etat de votre pharmacie : {etat(pharmacie.etat)}</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-5 text-center text-sm-left">
                                                <div class="card-body pb-0 px-0 px-md-4">
                                                    <img
                                                        src="../assets/img/illustrations/man-with-laptop-light.png"
                                                        height="140"
                                                        alt="View Badge User"
                                                        data-app-dark-img="illustrations/man-with-laptop-dark.png"
                                                        data-app-light-img="illustrations/man-with-laptop-light.png"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
