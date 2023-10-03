import "./App.css";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

import { PiChargingStation } from "react-icons/pi";
import { SlPeople } from "react-icons/sl";
import { IoSpeedometerOutline } from "react-icons/io5";
import { PiSteeringWheelDuotone } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";

import Data from "./carsData.json";

function App() {
  const [carsData, setCarsData] = useState(Data);
  const [pageNumber, setPageNumber] = useState(0);
  const carsPerPage = 6;
  const pageVisited = pageNumber * carsPerPage;

  const [searchText, setSearchText] = useState("");

  const [pageCount, setPageCount] = useState(
    Math.ceil(carsData.length / carsPerPage)
  );

  const handleSearchChange = () => {
    let results = Data.filter((car) => {
      return car.name.toLowerCase() === searchText.toLowerCase();
    });
    setCarsData(results);
    setPageCount(Math.ceil(results.length / carsPerPage) || 1);
    setPageNumber(0)
  };
  const displayCars = carsData
    .slice(pageVisited, pageVisited + carsPerPage)
    .map((car) => {
      return (
        <div className="carCard">
          <div>
            <img src={car.imgLink}></img>
          </div>
          <div className="nameModel">
            <div>
              <h2>{car.name}</h2>
            </div>
            <div>
              <h3>{car.modelYear}</h3>
            </div>
          </div>
          <div className="carFeatures">
            <div>
              <div className="carInfo">
                <SlPeople className="icons" />
                <p>{car.searCapacity} People</p>
              </div>
              <div className="carInfo">
                <IoSpeedometerOutline className="icons" />
                <p>{car.mileage} Km / Ltr</p>
              </div>
            </div>
            <div>
              <div className="carInfo">
                <PiChargingStation className="icons" />
                <p>{car.fuelType}</p>
              </div>
              <div className="carInfo">
                <PiSteeringWheelDuotone className="icons" />
                <p>{car.driveType}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="rentDetails">
            <div className="carRent">
              <h1>
                ${car.rent}
                <strong> / Month</strong>
              </h1>
            </div>
            <div className="rentBtn">
              <AiOutlineHeart className="heartIcon" />
              <button>Rent Now</button>
            </div>
          </div>
        </div>
      );
    });

  const handlePageClick = (event) => {
    setPageNumber(event.selected);
  };
  return (
    <div className="App">
      <div className="header">
        <div className="dropDown">
          <input
            type="text"
            className="searchInput"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <BsSearch onClick={handleSearchChange} className="searchIcon" />
        </div>
        <div className="dropDown">
          <p>Relevance</p>
          <RiArrowDropDownLine />
        </div>
        <div className="dropDown">
          <p>All Brands</p>
          <RiArrowDropDownLine />
        </div>
      </div>
      <div className="cars">{displayCars}</div>
      <div className="pagination">
        <h2>
          {pageNumber * carsPerPage + 6} from {carsData.length}
        </h2>
        <ReactPaginate
          nextLabel={">"}
          previousLabel={"<"}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          containerClassName={"paginationBtns"}
          previousClassName={"prevBtn"}
          activeClassName={"activeBtn"}
        />
      </div>
    </div>
  );
}

export default App;
