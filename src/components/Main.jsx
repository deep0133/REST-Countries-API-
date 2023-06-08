/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataLoading from "./loading/DataLoading";
import oldData from "../assets/data.json";

function Main({ text, input, mode, setDetails }) {
  const [country, setCountry] = useState("");

  const [region, setRegion] = useState("");
  const [allRegion, setAllRegion] = useState([]);
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const api = "https://restcountries.com/v3.1/all";
      try {
        setLoading(true);
        let response = await fetch(api);
        response = await response.json();
        setData(response);
        // remove duplicate values:

        const uniqueRegions = await [
          ...new Set(response.map((obj) => obj.region)),
        ];
        console.log(uniqueRegions);
        setAllRegion(uniqueRegions);
      } catch (error) {
        console.log("Error : " + error);
        setData(oldData);
        const uniqueRegions = [...new Set(oldData.map((obj) => obj.region))];
        console.log(uniqueRegions);
        setAllRegion(oldData);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Filter by region:
  async function SearchByRegionAndCountryName(searchThis, byThis) {
    let api = `https://restcountries.com/v3.1/${byThis}/${searchThis}`;
    try {
      setLoading(true);
      let response = await fetch(api);
      response = await response.json();
      setData(response);
    } catch (error) {
      console.log("Error : " + error);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (country.length > 0) {
      SearchByRegionAndCountryName(country, "name");
    }
  }, [country]);

  const navigate = useNavigate();

  const handleCardClick = (name) => {
    navigate(`/detail/${name}`);
  };

  return (
    <div className={`flex px-[5%] py-5 flex-col`}>
      <div className="search-filter relative basis-full sm:flex sm:space-y-0 space-y-8 justify-between">
        <div
          className={`search basis-1/3 flex items-center px-5 space-x-2 shadow-sm rounded-md ${
            input + " " + text
          }`}>
          <label htmlFor="search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon w-5"
              viewBox="0 0 512 512">
              <path
                d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                fill="none"
                stroke={`${mode === "light" ? "#000" : "#ffffff"}`}
                strokeMiterlimit="10"
                strokeWidth="32"
              />
              <path
                fill="none"
                stroke={`${mode === "light" ? "#000" : "#ffffff"}`}
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M338.29 338.29L448 448"
              />
            </svg>
          </label>
          <input
            type="search"
            name="search"
            className={`bg-inherit text-inherit w-full p-3 text-sm outline-none`}
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            placeholder="Search for a country..."
          />
        </div>
        <div
          className={`filter shadow-sm rounded-md ${
            input + " " + text
          } relative pr-3 rounded-sm`}>
          <select
            value={region}
            onChange={async (e) => {
              setRegion(e.target.value);
              SearchByRegionAndCountryName(e.target.value, "region");
            }}
            className={`list-none ${
              input + " " + text
            } w-full outline-none space-y-2 p-3 px-5  overflow-auto z-50`}>
            <option value="Filter by Region">Filter by Region</option>
            {allRegion &&
              allRegion.length > 0 &&
              allRegion.map((region, index) => (
                <option
                  value={region}
                  className="z-50 hover:cursor-pointer"
                  key={index}>
                  {region}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="basis-full z-0 my-10 grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-5 sm:gap-10 md:gap-15 lg:gap-20">
        {loading ? (
          <div className="col-span-full text-center">
            {" "}
            <DataLoading mode={mode} />
          </div>
        ) : data && data.length > 0 ? (
          data.map((country, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setDetails(country);
                  handleCardClick(country.name.common);
                }}
                className={`card col-span-1 hover:scale-105 hover:cursor-pointer rounded-md ${input}`}>
                <img
                  src={country.flags.png}
                  className="rounded-t-md z-0 w-full h-40 object-cover"
                  alt="flag"
                />
                <div className="content p-5">
                  <h2 className="title font-bold mb-2">
                    {country.name.common}
                  </h2>
                  <div className="details font-medium">
                    <p className="">
                      Population :
                      <span className=" font-normal opacity-75">
                        {country.population}
                      </span>
                    </p>
                    <p>
                      <strong>Region</strong> :{country.region}
                    </p>
                    <p>
                      <strong>Capital</strong> : {country.capital}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          "Not Found"
        )}
      </div>
    </div>
  );
}

export default Main;
