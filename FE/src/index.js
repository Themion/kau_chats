import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Table from './Table';
import Login from './Login';
import Chats from './Chats'

ReactDOM.render(
    <React.StrictMode>
        <Router><Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/:id" element={<Chats />}></Route>
            <Route path="/" element={<Table />}></Route>
        </Routes></Router>
    </React.StrictMode>,
    document.querySelector("div#root")
);
