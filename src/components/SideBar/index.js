import React, { useState, useEffect, useRef, Fragment } from "react";
import { IoIosMenu } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

import "./style.scss";
import { IconContext } from "react-icons/lib";

const SideBar = ({setQuery, search}) => {
  const sidebar = useRef();
  const [open, setOpen] = useState(false);

  // Close on click off
  useEffect(() => {
    const handleClickOff = (e) => {
      if (sidebar.current) {
        if (sidebar.current.contains(e.target)) {
          //  exit if inside click
          return;
        }
        // outside click
        setOpen(false);
      }
    };
    // add when mounted
    document.addEventListener("mousedown", handleClickOff);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOff);
    };
  }, []);

  return (
    <Fragment>
      {/* Open Menu Button */}
      <div className={`toggle-btn__container ${open && "hidden"}`}>
        <IconContext.Provider value={{ color: "#fff", size: "5rem" }}>
          <button
            className="toggle-btn"
            onClick={() => {
              setOpen(true);
            }}>
            <IoIosMenu />
          </button>
        </IconContext.Provider>
      </div>
      <section
        className={`side-bar ${!open && "side-bar--closed"}`}
        ref={sidebar}>
        <div
          className={`side-bar__content ${
            !open && "side-bar__content--closed"
          }`}>
          {/* Close Menu Button */}
          <div
            className={`toggle-btn__container  toggle-btn__container--close ${
              !open && "hidden"
            }`}>
            <IconContext.Provider value={{ color: "white", size: "2.5rem" }}>
              <button
                className="toggle-btn"
                onClick={() => {
                  setOpen(false);
                }}>
                <FaTimes />
              </button>
            </IconContext.Provider>
          </div>{" "}
          <div className="search">
            <input
              className="search__input"
              type="text"
              placeholder="Cambridge, UK"
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={search}
            />
            <div className="search__icon-container">
              <IconContext.Provider value={{ color: "black", size: "3rem" }}>
                <button className="search__btn" onClick={() => {}}>
                  <BiSearch />
                </button>
              </IconContext.Provider>
            </div>
          </div>
          <div className="weather-details">
            <h3 className="paragraph weather-details__heading">
              Weather Details
            </h3>
            <div className="weather-details__detail">
              <div className="weather-details__detail--title">Cloud</div>
              <div className="weather-details__detail--value">86%</div>
            </div>
            <div className="weather-details__detail">
              <div className="weather-details__detail--title">Humidity</div>
              <div className="weather-details__detail--value">62%</div>
            </div>
            <div className="weather-details__detail">
              <div className="weather-details__detail--title">Wind</div>
              <div className="weather-details__detail--value">8km/h</div>
            </div>
          </div>
          <div className="weather-details">
            <h3 className="paragraph weather-details__heading">Next Days</h3>
            <div className="weather-details__detail">
              <div className="weather-details__detail--title">Cloud</div>
              <div className="weather-details__detail--value">86%</div>
            </div>
            <div className="weather-details__detail">
              <div className="weather-details__detail--title">Humidity</div>
              <div className="weather-details__detail--value">62%</div>
            </div>
            <div className="weather-details__detail">
              <div className="weather-details__detail--title">Wind</div>
              <div className="weather-details__detail--value">8km/h</div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default SideBar;
