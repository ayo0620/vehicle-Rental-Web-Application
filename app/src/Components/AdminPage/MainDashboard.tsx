import React from "react";
import '../../Styles/AdminPage/MainDashboard.css';
import Cards from "./Cards/Cards";
import Table from "./Table/Table";


const MainDashboard: React.FC = () => { 

    return (
        <div className="MainDash">
            <h1>Dashboard</h1>
            <Cards/>
            <Table/>
        </div>
    )
}

export default MainDashboard;