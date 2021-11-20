import React from "react";
import { Link } from "react-router-dom";
import { View, Button } from "react-native";
import { useState, useEffect } from "react";
import { useContext } from "react";

import { useToggle } from "../hooks/toggle";

import { MpgContext } from "../main";

function DisplayClubs({ data }) {
  if (data !== undefined && data.championshipClubs !== undefined) {
    const keys = Object.keys(data.championshipClubs);
    return (
      <div>
        {keys.map((key, elem) => (
          <div>
            <div>{key}</div>
            <div>{data.championshipClubs[key].name["fr-FR"]}</div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function get_club_name(id, list) {
  for (let i = 0; i < list.length; i++) {
    if (id === list[i]) {
      return list[i];
    }
  }
}

function sort_player(data_player, data_club, sort_by) {
  const [sort_is, set_sort_is] = useState(false);
  const [list, set_list] = useState([]);
  const buf = [];
  if (
    data_player !== undefined &&
    data_player.poolPlayers !== undefined &&
    !sort_is
  ) {
    const list_player = Object.keys(data_player.poolPlayers);
    const list_club = Object.keys(data_club.championshipClubs);
    list_player.map((key_p, elem_p) => {
      const player = data_player.poolPlayers[key_p];
      list_club.map((key_c, elem_c) => {
        const club = data_club.championshipClubs[key_c];
        if (player.clubId === key_c) {
          let temp_club_name = club.name["fr-FR"];
          buf.push({
            id: player.id,
            name: player.lastName,
            pos: player.ultraPosition,
            club_id: player.clubId,
            club_name: temp_club_name,
          });
        }
      });
    });
    set_list(buf);
    set_sort_is(true);
  }
  if (sort_by === "position") {
    list.sort((a, b) => b.pos - a.pos);
  }
  if (sort_by === "name") {
    list.sort((a, b) => {
      let str_a = a.name.toLowerCase();
      let str_b = b.name.toLowerCase();

      if (str_a < str_b) {
        return -1;
      }
      if (str_a > str_b) {
        return 1;
      }
      return 0;
    });
  }

  if (sort_by === "club") {
    list.sort((a, b) => {
      let str_a = a.club_name.toLowerCase();
      let str_b = b.club_name.toLowerCase();

      if (str_a < str_b) {
        return -1;
      }
      if (str_a > str_b) {
        return 1;
      }
      return 0;
    });
  }

  return list;
}

function ButtonPlayer({ elem }) {
  const { id, set_id } = useContext(MpgContext);
  const [is, set_is] = useToggle(false);

  const set_page_detail = (value) => {
    set_id(value);
  };
  return (
    <Link to="/detail">
      <button style={{ cursor: "pointer" }} onClick={set_page_detail(elem.id)}>
        {/* <div>{String(is)}</div> */}
        <div>{elem.name}</div>
        <div>{elem.pos}</div>
        <div>{elem.club_name}</div>
      </button>
    </Link>
  );

  // return (
  //   <button style={{ cursor: "pointer" }} onClick={set_is}>
  //     <div>{String(is)}</div>
  //     <div>{elem.name}</div>
  //     <div>{elem.pos}</div>
  //     <div>{elem.club_name}</div>
  //     {is ? set_page_detail(elem.id) : set_page_detail(id)}
  //     <Link to="/detail" />
  //   </button>
  // );
}

function DisplayPlayers({ data_player, data_club, sort_by }) {
  if (data_player !== undefined) {
    const buf = sort_player(data_player, data_club, sort_by);
    return (
      <div>
        {buf.map((elem) => (
          <ButtonPlayer elem={elem} />
        ))}
      </div>
    );
  }
  return null;
}

export function Home() {
  const [sort_by, set_sort_by] = useState("name");
  const [data_club, set_data_club] = useState({});
  const [data_player, set_data_player] = useState({});

  useEffect(() => {
    get_api();
  }, []);

  function load_clubs() {
    get_clubs().then((data) => data);
  }

  function load_players() {
    get_players().then((data) => data);
  }

  function load_api() {
    get_api().then((data) => data);
  }

  async function get_clubs() {
    const url_clubs = "https://api.mpg.football/api/data/championship-clubs";
    const response_clubs = await fetch(url_clubs);
    const data_clubs = await response_clubs.json();
    set_data_club(data_clubs);
  }

  async function get_players() {
    const url_players =
      "https://api.mpg.football/api/data/championship-players-pool/1";
    const response_players = await fetch(url_players);
    const data_players = await response_players.json();
    if (data_players !== undefined) {
      set_data_player(data_players);
    }
  }

  async function get_api() {
    get_players();
    get_clubs();
  }

  function sort_by_name() {
    set_sort_by("name");
  }

  function sort_by_club() {
    set_sort_by("club");
  }
  function sort_by_position() {
    set_sort_by("position");
  }

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "magenta" }}>
      {load_api()}
      <View style={{ flex: 1 }}>
        <button style={{ cursor: "pointer" }} onClick={sort_by_name}>
          trier par nom
        </button>
        <button style={{ cursor: "pointer" }} onClick={sort_by_club}>
          trier par club
        </button>
        <button style={{ cursor: "pointer" }} onClick={sort_by_position}>
          trier par position
        </button>
      </View>
      <View style={{ flex: 4, backgroundColor: "yellow" }}>
        <DisplayPlayers
          data_player={data_player}
          data_club={data_club}
          sort_by={sort_by}
        />
      </View>
    </View>
  );
}
