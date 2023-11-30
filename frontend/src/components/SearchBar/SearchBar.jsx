import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import "./SearchBar.css";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const [playersList] = useState([
    /// comes from backend
    {
      name: "Lionel Messi",
      shirt: 10,
      position: "FW",
      age: 34,
      team: "Inter Miami",
      nationality: "Argentine",
    },
    {
      name: "Cristiano Ronaldo",
      shirt: 7,
      position: "FW",
      age: 37,
      team: "Al Nassr",
      nationality: "Portugal",
    },
    {
      name: "Erling Haaland",
      shirt: 10,
      position: "FW",
      age: 23,
      team: "Man city",
      nationality: "Norway",
    },
  ]);

  const handleClose = () => {
    setSearch("");
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

  return (
    <section className="search_section">
      <div className="search_input_div">
        <input
          type="text"
          className="search_input"
          placeholder="Search..."
          autoComplete="off"
          onChange={handleChange}
          value={search}
        />
        <div className="search_icon">
          {search === "" ? <SearchIcon /> : <ClearIcon onClick={handleClose} />}
        </div>
        <div className="search_result">
          {searchData.map((player, index) => {
            return (
              <a
                href={player.name}
                key={index}
                target="_blank"
                className="search_suggestion_line"
              >
                {player.name}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
