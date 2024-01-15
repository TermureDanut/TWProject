import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import "./DisabledSearchBar.css";

const SearchBar = ({ onDataUpdate }) => {
    const [search, setSearch] = useState("");
    const [selectedItem, setSelectedItem] = useState(-1);
    const [data, setData] = useState(null);
    const [playersList, setPlayersList] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [searchActive, setSearchActive] = useState(false); // New state variable

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch("http://localhost:8080/players/all");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setPlayersList(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchPlayers();
    }, []);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleClose = () => {
        setSearch("");
        setSearchData([]);
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowUp" && selectedItem > 0) {
            setSelectedItem((prev) => prev - 1);
        } else if (e.key === "ArrowDown" && selectedItem < searchData.length - 1) {
            setSelectedItem((prev) => prev + 1);
        } else if (e.key === "Enter" && selectedItem >= 0 && selectedItem < searchData.length){
            handlePlayerSelect(searchData[selectedItem]);
            setSearch("");
            setSearchData([]);
        }
    };

    useEffect(() => {
        if (search !== "") {
            const filterPlayers = playersList.filter((player) => {
                return player.name.toLowerCase().includes(search.toLowerCase());
            });

            setSearchData(filterPlayers);
        } else {
            setSearchData([]);
        }
    }, [search]);

    const handlePlayerSelect = (player) => {
        setData(player);
        onDataUpdate(player);
    };

    const handleButtonClick = (player) => {
        handlePlayerSelect(player);
        setSearch("");
        setSearchData([]);
    };

    const toggleSearch = () => {
        setSearchActive(!searchActive);
        setSearch(""); // Clear search input when toggling
    };

    return (
        <section className="search_section">
            <div className="search_input_div_dis">

                {searchActive && ( // Conditionally render search bar
                    <input
                        type="text"
                        className="search_input"
                        placeholder="Enter player name"
                        autoComplete="off"
                        onChange={handleChange}
                        value={search}
                        onKeyDown={handleKeyDown}
                    />
                )}
            </div>
            {searchActive && ( // Conditionally render search results
                <div className="search_result">
                    {searchData.map((player, index) => (
                        <button
                            className={
                                selectedItem === index
                                    ? "search_suggestion_line active"
                                    : "search_suggestion_line"
                            }
                            key={index}
                            onClick={() => handleButtonClick(player)}
                        >
                            {player.name}
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
};

export default SearchBar;
