import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../pages/NavbarUser'

export default function Pharmacies() {

    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        loadPharmacies();
        loadVilles();
    }, []);

    const [x, setX] = useState({
        x: 0
    })

    const loadPharmacies = async () => {
        const result = await axios.get(process.env.React_App_URLf + "pharmacies/allAccepte");
        setPharmacies(result.data);
    }

    const [villes, setVilles] = useState([]);
    const [zones, setZones] = useState([]);

    const loadVilles = async () => {
        const result = await axios.get(process.env.React_App_URLf + "villes/all");
        setVilles(result.data);
    }

    const loadAllPharmacieByVille = async (id) => {
        const result = await axios.get(process.env.React_App_URLf + `pharmacies/pharmacie/ville=${id}`);
        setPharmacies(result.data);
    }

    const loadAllZoneByVille = async (id) => {
        const result = await axios.get(process.env.React_App_URLf + `zones/zone/ville=${id}`);
        setZones(result.data);
    }

    const loadAllPharmacieByZone = async (id) => {
        const result = await axios.get(process.env.React_App_URLf + `pharmacies/pharmacie/zone=${id}`);
        setPharmacies(result.data);
    }


    const check1 = (x) => {
        if (x == 0) {
            return loadPharmacies();
        } else {
            return loadAllPharmacieByVille(x);
        }
    }

    const check2 = (z) => {
        if (z == 0) {
            return loadAllPharmacieByVille(x);
        } else {
            return loadAllPharmacieByZone(z);
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
                                <div class="col-md-8 mx-auto">
                                    <div class="card">
                                        <h5 class="card-header">Liste des pharmacies</h5>
                                        <div class="table-responsive text-nowrap">
                                            <div class="input-group w-25 mx-auto">
                                                <select class="form-select placement-dropdown mx-1" name='ville' onChange={(e) => { check1(e.target.value); loadAllZoneByVille(e.target.value); setX(e.target.value) }} >
                                                    <option value={0} selected>Afficher tous</option>
                                                    {
                                                        villes.map((ville, index) => (
                                                            <option value={ville.id}>{ville.nom}</option>
                                                        ))
                                                    }
                                                </select>
                                                <select class="form-select placement-dropdown mx-1" name='zone' onChange={(e) => { check2(e.target.value) }}>
                                                    <option value={0} selected>Afficher tous</option>
                                                    {
                                                        zones.map((zone, index) => (
                                                            <option value={zone.id}>{zone.nom}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <table class="table table-dark mt-2">
                                                <thead>
                                                    <tr>
                                                        <th>Pharmacie</th>
                                                        <th>Ville</th>
                                                        <th>Zone</th>
                                                        <th>Adresse</th>
                                                        <th>Localisation</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table-border-bottom-0">
                                                    {
                                                        pharmacies.map((p, index) => (
                                                            <tr>
                                                                <td>{p.nom}</td>
                                                                <td>{p.zone.ville.nom}</td>
                                                                <td>{p.zone.nom}</td>
                                                                <td>{p.adresse}</td>
                                                                <td>
                                                                    <Link to={`/map1/${p.id}`} class="btn btn-outline-primary mx-2" >Map</Link>
                                                                </td>
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
