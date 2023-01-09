import L from "leaflet"
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap, MapContainer } from "react-leaflet";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from "../pages/NavbarUser";
import useGeoLocation from "./useGeolocation";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

function GetIcon(_iconSize) {
    return L.icon({
        iconUrl: require("../static/Icons/marker.png"),
        iconSize: [_iconSize]
    })
}

function GetIcon1(_iconSize) {
    return L.icon({
        iconUrl: require("../static/Icons/pharmacy.png"),
        iconSize: [_iconSize]
    })
}

function MapProche() {


    const location = useGeoLocation();
    const [pharmacie, setPharmacie] = useState([]);

    const PharmacieProche = async (lat, lng) => {
        const result = await axios.get(process.env.React_App_URLf + `pharmacies/pharmacie/proche/lat=${lat}/log=${lng}`);
        setPharmacie(result.data);

    };



    return (
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">

                <div class="layout-page">
                    <Navbar />
                    <nav className="layout-navbar container-xxl navbar navbar-expand-xl  align-items-center bg-navbar-theme"
                        id="layout-navbar">
                        <div class="input-group w-25 mx-auto">
                            <button class="btn btn-outline-primary" onClick={(e) => { PharmacieProche(location.coordinates.lat, location.coordinates.lng) }}>Pharmacie le plus proche</button>
                        </div>
                    </nav>
                    <div class="content-wrapper">
                        <LeafletMap className="map"
                            center={[35.743611, -5.885627]}
                            zoom={6}
                            style={{ height: 750, with: 100 }}>

                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {location.loaded && !location.error && (
                                <Marker
                                    icon={GetIcon(40)}
                                    position={[
                                        location.coordinates.lat,
                                        location.coordinates.lng,
                                    ]}
                                >
                                    <Popup>
                                        Ma position actuelle
                                    </Popup>
                                </Marker>
                            )}
                            {
                                pharmacie.map((p, index) => (

                                    <Marker position={[p.lat, p.log]} icon={GetIcon1(40)}>
                                        <Popup>
                                            {p.nom}
                                        </Popup>
                                    </Marker>

                                ))
                            }
                        </LeafletMap>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MapProche;