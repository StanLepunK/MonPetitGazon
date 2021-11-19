import React from "react";
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

function sort_player(data_player, data_club) {
  const [sort_is, set_sort_is] = useState(false);
  const [list, set_list] = useState([]);
  const buf = [];
  let rank = -1;
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
        if (player.ultraPosition > rank && player.clubId === key_c) {
          let temp_club_name = "Dynamo de Belleville";
          console.log("compare", player.clubId, key_c);
          // if (player.clubId === key_c) {
          temp_club_name = club.name["fr-FR"];
          // }
          buf.push({
            id: player.id,
            name: player.lastName,
            pos: player.ultraPosition,
            club_id: player.clubId,
            club_name: temp_club_name,
          });
          rank = player.ultraPosition;
        }
      });
    });
    set_list(buf);
    set_sort_is(true);
  }
  return list;
}

function ButtonPlayer({ elem }) {
  const { id, set_id } = useContext(MpgContext);
  // const [id_url, set_id_url] = useState(null);
  const [is, set_is] = useToggle(false);
  // const show_detail = (event) => {
  //   event.preventDefault();
  //   console.log("ça clic, ça claque, ça déboite");
  // };
  // function set_page_detail(value) {
  //   set_id(value);
  //   // console.log("id", id);
  // }

  // useEffect(() => {
  //   set_id_url();
  // }, []);

  const set_page_detail = (value) => {
    set_id(value);
  };

  return (
    // <div style={{ cursor: "pointer" }} onClick={set_page_detail(elem.id)}>
    // <button style={{ cursor: "pointer" }} onClick={set_page_detail(elem.id)}>
    <button style={{ cursor: "pointer" }} onClick={set_is}>
      {/* {console.log("id", id)} */}
      <div>{String(is)}</div>
      <div>{elem.name}</div>
      <div>{elem.pos}</div>
      <div>{elem.club_name}</div>
      <div>{elem.id}</div>
      <div>select id {id}</div>
      {is ? set_page_detail(elem.id) : set_page_detail(id)}
      {set_is}
      {/* <div>select id url {id_url}</div> */}
      {/* <div>{is}</div> */}
      {/* <div>{set_id(elem.id)}</div> */}
    </button>
  );
}

function DisplayPlayers({ data_player, data_club }) {
  if (data_player !== undefined) {
    const buf = sort_player(data_player, data_club);

    return (
      <div>
        {buf.map((elem) => (
          // <MpgContext.Provider>
          <ButtonPlayer elem={elem} />
          // </MpgContext.Provider>
        ))}
      </div>
    );
  }
  return null;
}

export function Home() {
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

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "magenta" }}>
      {load_api()}
      {/* <View style={{ flex: 1, backgroundColor: "red" }}>
        <DisplayClubs data={data_club} />
      </View> */}
      <View style={{ flex: 1, backgroundColor: "yellow" }}>
        <DisplayPlayers data_player={data_player} data_club={data_club} />
      </View>
    </View>
  );
}
