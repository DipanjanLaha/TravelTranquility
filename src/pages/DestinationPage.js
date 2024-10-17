import React from "react"
import Header from "../components/Header"
import CsvTable from '../components/ap';

function DestinationPage() {
    return (
        <div>
            <Header></Header>
            <h1>Destination Page</h1>
            <h1>Destination Table</h1>
            <CsvTable />
        </div>
    )
}

export default DestinationPage