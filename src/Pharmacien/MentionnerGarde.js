import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../pages/NavbarPharmacien';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function MentionnerGarde() {



    const [id, setId] = useState(localStorage.getItem('pharmacie_id'));

    const [gardePharmacie, setGardePharmacie] = useState({
        dateFin: "2022-12-14",
        pharmacie: {
            id: id
        },
        garde: {
            idGarde: 2
        },
        pharmacieDeGardePK: {
            pharmaciePK: id,
            gardePK: 2,
            dateDebut: "2022-12-13"
        }
    })
    useEffect(() => {
        loadGardes();
    }, []);

    const loadGardes = async () => {
        const result = await axios.get(process.env.React_App_URLf + "gardes/all");
        setGardes(result.data);
    }

    const { dateFin, pharmacie, garde, pharmacieDeGardePK } = gardePharmacie

    const onSubmit = async (e) => {
        await axios.post(process.env.React_App_URLf + `pharmaciesDeGarde/add/${debut}/${fin}`, gardePharmacie)
    };

    const [gardes, setGardes] = useState([]);
    const [debut, setDebut] = React.useState('');
    const [fin, setFin] = React.useState('');




    const popSuccess = () => {
        Swal.fire({
            title: 'Added!!',
            text: "The client has been added successfully",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                document.location = '/addGarde'
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
                                            <h5 class="mb-0">Gestion des gardes</h5>
                                        </div>
                                        <div class="card-body">
                                            <form onSubmit={(e) => onSubmit(e)}>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Type de garde</label>
                                                    <div class="col-sm-10">
                                                        <select class="form-select placement-dropdown" name='garde' onChange={(e) => { gardePharmacie.garde.idGarde = e.target.value; gardePharmacie.pharmacieDeGardePK.gardePK = e.target.value }}>
                                                            <option></option>
                                                            {
                                                                gardes.map((garde, index) => (
                                                                    <option value={garde.idGarde} >{garde.type}</option>
                                                                ))}

                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Date de début</label>
                                                    <div class="col-sm-10">
                                                        <input type={"date"} name='prenom' class="form-control" id="basic-default-name" onChange={(e) => { gardePharmacie.pharmacieDeGardePK.dateDebut = e.target.value; setDebut(e.target.value) }} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Date de fin</label>
                                                    <div class="col-sm-10">
                                                        <input type={"date"} name='prenom' class="form-control" id="basic-default-name" onChange={(e) => { gardePharmacie.dateFin = e.target.value; setFin(e.target.value) }} />
                                                    </div>
                                                </div>

                                                <div class="row justify-content-end">
                                                    <div class="col-sm-10">
                                                        <button type="submit" class="btn btn-primary"><i class='bx bx-save'></i> Save</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </div >
    )
}
