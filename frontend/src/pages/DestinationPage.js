import React from "react"
import CsvTable from '../components/ap';
import SearchBox from "../components/searchbar";

function DestinationPage() {
    return (
        <div>
            <h1>Destination Table</h1>
            <CsvTable />
            <><SearchBox></SearchBox></>
        </div>
    )
}

export default DestinationPage