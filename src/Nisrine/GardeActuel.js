import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from '../pages/NavbarUser'

export default function ListPharmacieGarde() {

    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        loadPharmacies();
        loadGardes();
    }, []);

    const [gardes, setGardes] = useState([]);

    const loadGardes = async () => {
        const result = await axios.get(process.env.React_App_URLf + "gardes/all");
        setGardes(result.data);
    }

    const loadPharmacies = async () => {
        const result = await axios.get(process.env.React_App_URLf + "pharmaciesDeGarde/allEnGarde");
        setPharmacies(result.data);
    }

    const loadAllPharmacieByTypeGarde = async (id) => {
        const result = await axios.get(process.env.React_App_URLf + `pharmaciesDeGarde/EnGarde/type=${id}`);
        setPharmacies(result.data);
    }

    const check1 = (x) => {
        if (x == 0) {
            return loadPharmacies();
        } else {
            return loadAllPharmacieByTypeGarde(x);
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
                                        <h5 class="card-header">Pharmacie en cours de garde</h5>
                                        <div class="table-responsive text-nowrap">
                                            <div class="input-group w-25 mx-auto">
                                                <select class="form-select placement-dropdown mx-1" name='ville' onChange={(e) => { check1(e.target.value); }} >
                                                    <option value={0} selected>Afficher tous</option>
                                                    {
                                                        gardes.map((garde, index) => (
                                                            <option value={garde.idGarde}>{garde.type}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <table class="table table-dark mt-2">
                                                <thead>
                                                    <tr>
                                                        <th>Nom</th>
                                                        <th>Ville</th>
                                                        <th>Zone</th>
                                                        <th>Adresse</th>
                                                        <th>Type de garde</th>
                                                        <th>Date de début</th>
                                                        <th>Date de fin</th>
                                                        <th>Localisation</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table-border-bottom-0">
                                                    {
                                                        pharmacies.map((pharmacie, index) => (
                                                            <tr>
                                                                <td>
                                                                    <strong>{pharmacie.pharmacie.nom}</strong>
                                                                </td>
                                                                <td>{pharmacie.pharmacie.zone.ville.nom}</td>
                                                                <td>{pharmacie.pharmacie.zone.nom}</td>
                                                                <td>{pharmacie.pharmacie.adresse}</td>
                                                                <td>{pharmacie.garde.type}</td>
                                                                <td>{pharmacie.pharmacieDeGardePK.dateDebut}</td>
                                                                <td>{pharmacie.dateFin}</td>
                                                                <td><Link to={`/map1/${pharmacie.pharmacie.id}`} class="btn btn-outline-primary" >Map</Link></td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
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
