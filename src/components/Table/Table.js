import { useState, useEffect } from 'react'
import { table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export default function Table() {
    const [countries, setCountries] = useState([]);
    
    const [filterCountry, setFilterCountry] = useState("");

    const getData = async () => {
        const res = await axios.get('https://restcountries.com/v2/all');
        setCountries(res.data);

        console.log(res.data);
    }




    const filtered = countries.filter((item) => {
        return item.capital
        ?.toString()
        .toLowerCase()
        .includes(filterCountry.toLocaleLowerCase())
    })

  

    useEffect(() => {

        getData();
    }, [])


    return (
        <div>
            <input
                className='mt-5 mb-5 w-25'
                placeholder='Filter Country'
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
            />

            {
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Capital</th>
                            <th scope="col">Flag</th>
                            <th scope="col">Region</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filtered.map((country, index) =>

                                <tr key={index}>
                                    <td> {country.name} </td>
                                    <td> {country.capital} </td>
                                    <td> {country.region} </td>
                                    <td> <img style={{ width: "200px" }} src={country.flags.svg} /> </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>

            }
        </div>
    )
}
