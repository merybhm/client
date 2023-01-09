import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Navbar from '../pages/NavbarPharmacien'

export default function CreatePharmacie() {
    let navigate = useNavigate()
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));


    const [nom, setNom] = React.useState('');
    const [zone_id, setZoneId] = React.useState('');
    const [user_id, setUserId] = React.useState('');
    const [adresse, setAdresse] = React.useState('');
    const [lat, setLat] = React.useState('');
    const [log, setLog] = React.useState('');
    const [tel, setTel] = React.useState('');

    const onSubmit = async (e, id) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('zone_id', zone_id);
        formData.append('user', user_id);
        formData.append('adresse', adresse);
        formData.append('lat', lat);
        formData.append('telephone', tel);
        formData.append('log', log);
        axios({
            method: "post",
            url: process.env.React_App_URLf + `pharmacies/add/${user.user_id}/${nom}/${zone_id}/${adresse}/${lat}/${log}/${tel}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (res) {
                //handle success
                popSuccess()
                console.log(res.data)

                localStorage.setItem("pharmacie_id", JSON.stringify(res.data.id));
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

    };

    const [zones, setZones] = useState([]);

    const { id } = useParams()

    useEffect(() => {
        loadVilles();
    }, []);


    const [villes, setVilles] = useState([]);

    const loadVilles = async () => {
        const result = await axios.get(process.env.React_App_URLf + "villes/all");
        setVilles(result.data);
    }
    const loadAllZoneByVille = async (id) => {
        const result = await axios.get(process.env.React_App_URLf + `zones/zone/ville=${id}`);
        setZones(result.data);
    }

    const popSuccess = () => {
        Swal.fire({
            title: 'Added!!',
            text: "The client has been added successfully",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
            }
        })
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
                                    <div class="card mb-4">
                                        <div class="card-header d-flex align-items-center justify-content-between">
                                            <h5 class="mb-0">Ajouter une nouvelle pharmacie</h5>
                                        </div>
                                        <div class="card-body">
                                            <form onSubmit={(e) => onSubmit(e)}>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Nom de la pharmacie</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='nom' class="form-control" id="basic-default-name" value={nom} onChange={(e) => { setNom(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Adresse</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='adresse' class="form-control" id="basic-default-name" value={adresse} onChange={(e) => { setAdresse(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-email">Ville</label>
                                                    <div class="col-sm-10">
                                                        <select class="form-select placement-dropdown mx-1" name='ville' onChange={(e) => { loadAllZoneByVille(e.target.value); }} >
                                                            <option></option>
                                                            {
                                                                villes.map((ville, index) => (
                                                                    <option value={ville.id}>{ville.nom}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-email">Zone</label>
                                                    <div class="col-sm-10">
                                                        <select class="form-select placement-dropdown mx-1" name='zone' onChange={(e) => { setZoneId(e.target.value) }}>
                                                            <option></option>
                                                            {
                                                                zones.map((zone, index) => (
                                                                    <option value={zone.id}>{zone.nom}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Lattitude</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='lat' class="form-control" id="basic-default-name" value={lat} onChange={(e) => { setLat(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Longitude</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='log' class="form-control" id="basic-default-name" value={log} onChange={(e) => { setLog(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Téléphone</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='tel' class="form-control" id="basic-default-name" value={tel} onChange={(e) => { setTel(e.target.value); }} />
                                                    </div>
                                                </div>

                                                <div class="row justify-content-end">
                                                    <div class="col-sm-10">
                                                        <button type="submit" class="btn btn-primary" ><i class='bx bx-save'></i> Save</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div>
                </div>
            </div>
        </div>
    )
}
