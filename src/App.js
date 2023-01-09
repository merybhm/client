
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Pharmacies from './Nisrine/Pharmacies';
import Map1 from './Nisrine/Map1';
import Map2 from './Nisrine/Map2';
import GardeActuel from './Nisrine/GardeActuel';
import MapProche from './Nisrine/MapProche';
import CreatePharmacie from './Pharmacien/CreatePharmacie';
import HomePharmacien from './Pharmacien/HomePharmacien';
import MentionnerGarde from './Pharmacien/MentionnerGarde';
import Login from './Pharmacien/Login';
import React, { useEffect, useState } from 'react'
import Register from './Pharmacien/Register';
import Historique1 from './Pharmacien/Historique1';


function App() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')))
  return (

    <Router>
      {user == null ?
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path='/pharmacies' element={<Pharmacies />} />
          <Route exact path="/map1/:id" element={<Map1 />} />
          <Route exact path="/map2" element={<Map2 />} />
          <Route exact path="/gardeActuel" element={<GardeActuel />} />
          <Route exact path="/mapProche" element={<MapProche />} />


        </Routes>
        :
        <Routes>
          <Route exact path="/createPharmacie" element={<CreatePharmacie />} />
          <Route exact path="/homePharmacien" element={<HomePharmacien />} />
          <Route exact path="/mentionnerGarde" element={<MentionnerGarde />} />
          <Route exact path='/historiquee' element={<Historique1 />} />
        </Routes>
      }
    </Router>


  );
}

export default App;
