import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import "./SearchBar.css";

const SearchBar = ({ onDataUpdate }) => {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(-1);
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const [playersList, setPlayersList] = useState([]);

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

  const handleClose = () => {
    setSearch("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" && selectedItem > 0) {
      setSelectedItem((prev) => prev - 1);
    } else if (e.key == "ArrowDown" && selectedItem < searchData.length - 1) {
      setSelectedItem((prev) => prev + 1);
    } else if (e.key === "Enter" && selectedItem >= 0) {
      handlePlayerSelect(searchData[selectedItem]);
      setSearch("");
      setSearchData([]);
    }
  };
  const [searchData, setSearchData] = useState([]);
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
    const newData = player;
    setData(newData);
    onDataUpdate(newData);
  };

  const handleButtonClick = () => {
    handlePlayerSelect(searchData[selectedItem]);
    setSearch("");
    setSearchData([]);
  };

  return (
    <section className="search_section">
      <div className="search_input_div">
        <input
          type="text"
          className="search_input"
          placeholder="Enter player name"
          autoComplete="off"
          onChange={handleChange}
          value={search}
          onKeyDown={handleKeyDown}
        />
        <div className="search_icon">
          {search === "" ? <SearchIcon /> : <ClearIcon onClick={handleClose} />}
        </div>
        <div className="search_result">
          {searchData.map((player, index) => (
            <button
              className={
                selectedItem === index
                  ? "search_suggestion_line active"
                  : "search_suggestion_line"
              }
              key={index}
              onClick={handleButtonClick}
            >
              {player.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
