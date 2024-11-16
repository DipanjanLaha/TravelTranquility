import React from "react"
import Header from "../components/Header"
import CsvTable from '../components/ap';
import SearchBox from "../components/searchbar";

function DestinationPage() {
    return (
        <div>
            <Header></Header>
            <h1>Destination Table</h1>
            <CsvTable />
            <><SearchBox></SearchBox></>
        </div>
    )
}

export default DestinationPage