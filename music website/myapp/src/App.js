
import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Songs from './Components/Songs';
import Albums from './Components/Albums';
import Artists from './Components/Artists';
import Dashboard from './Components/Dashboard';
import User from './Components/User';
import AddAlbum from './AddComponents/AddAlbum';
import AddSong from './AddComponents/AddSong';
import AddArtist from './AddComponents/AddArtist';
import Adduser from './AddComponents/Adduser';
import ShowAlluser from './Components/ShowAlluser';
import ShowAllsongs from './Components/ShowAllsongs';
import ShowAllartist from './Components/ShowAllartist';
import ShowAllalbums from './Components/ShowAllalbums';
import EditUser from './EditComponents/Edituser';
import EditAlbums from './EditComponents/EditAlbums';
import  EditSongs from './EditComponents/EditSongs';
import EditArtist from './EditComponents/EditArtist';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/user" element={<User />} />
        <Route path="/addsongs" element={<AddSong />} />
        <Route path="/addalbums" element={<AddAlbum />} />
        <Route path="/addartists" element={<AddArtist/>} />
        <Route path="/adduser" element={<Adduser />} />
        <Route path="/alluser" element={<ShowAlluser />} />
        <Route path="/allsongs" element={<ShowAllsongs />} />
        <Route path="/allartist" element={<ShowAllartist />} />
        <Route path="/allalbums" element={<ShowAllalbums />} />
        <Route path="/edituser/:id" element={<EditUser />} />
        <Route path="/editsong/:id" element={<EditSongs />} />
        <Route path="/editalbum/:id" element={<EditAlbums />} />
        <Route path="/editartist/:id" element={<EditArtist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
