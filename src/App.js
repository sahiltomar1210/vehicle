import { useEffect, useState } from "react";
import { datas } from "./data/data";
import "./App.css";
function App() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState("");
  // eslint-disable-next-line
  const [data, setData] = useState([...datas]);
  // eslint-disable-next-line
  const [data2, setData2] = useState([...data]);
  const [searchData, setSearchData] = useState([]);
  const handleChange = (event) => {
    setFilters(event.target.value);
  };
  useEffect(() => {
    if (filters !== "") {
      setFilters("");
    }
    const result = data2.filter(
      (obj) => obj.Mfr_CommonName.toLowerCase() === search.toLowerCase(),
    );
    if (result.length > 0) {
      setSearchData(result);
    } else {
      setSearchData([]);
    }
    // eslint-disable-next-line
  }, [search]);
  useEffect(() => {
    if (search !== "") {
      setSearch("");
    }
    const result = data2.filter((obj) =>
      obj.VehicleTypes.find((item) =>
        item.IsPrimary ? item.Name === filters : "",
      ),
    );
    if (result.length > 0) {
      setSearchData(result);
    } else {
      setSearchData([]);
    }
    // eslint-disable-next-line
  }, [filters]);
  return (
    <div className="main_container">
      <div className="topheader">
        <h1>VEHICLE MANUFACTURERS</h1>
      </div>
      <div className="navigation">
        <div className="left_search">
          <label>Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="right_filter">
          <label>Filter by Vehicle Type:</label>
          <select value={filters} onChange={handleChange}>
            <option default value="">
              All
            </option>
            <option value="Passenger Car">Passenger Car</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="Trailer">Trailer</option>
            <option value="Truck ">Truck</option>
            <option value="Low Speed Vehicle (LSV)">
              Low Speed Vehicle (LSV)
            </option>
            <option value="Bus">Bus</option>
            <option value="Incomplete Vehicle">Incomplete Vehicle</option>
            <option value="Multipurpose Passenger Vehicle (MPV)">
              Multipurpose Passenger Vehicle (MPV)
            </option>
          </select>
        </div>
      </div>
      <div className="tableview">
        <table className="main_table">
          <thead>
            <tr className="table_head">
              <th> Name</th>
              <th> Country</th>
              <th> Type</th>
            </tr>
          </thead>
          <tbody className="table_body">
            {searchData.length > 0
              ? searchData.map((details) => (
                  <tr key={details.Mfr_ID} className="tablebody">
                    <td className="bodyAlign">
                      {details.Mfr_CommonName
                        ? details.Mfr_CommonName
                        : "Unknown"}
                    </td>

                    <td className="bodyAlign">{details.Country}</td>

                    <td className="bodyAlign">
                      {details.VehicleTypes.map((item) => {
                        return item.IsPrimary ? item.Name : "";
                      })}
                    </td>
                  </tr>
                ))
              : data.map((details) => (
                  <tr key={details.Mfr_ID} className="tablebody">
                    <td className="bodyAlign">
                      {details.Mfr_CommonName
                        ? details.Mfr_CommonName
                        : "Unknown"}
                    </td>

                    <td className="bodyAlign">{details.Country}</td>

                    <td className="bodyAlign">
                      {details.VehicleTypes.map((item) => {
                        return item.IsPrimary ? item.Name : "";
                      })}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
