import React from "react";
import { View } from "react-native";
import { useState, useEffect } from "react";

export function Player({ id }) {
  const [data_detail, set_data_detail] = useState({});

  function load_detail(id) {
    get_detail(id).then((data) => data);
  }

  function DisplayDetail({ data_detail }) {
    if (data_detail !== undefined) {
      console.log("data_detail", data_detail);
      return <div>détail</div>;
    }
    return null;
  }

  async function get_detail(id) {
    if (id !== undefined) {
      const url =
        "https://api.mpg.football/api/data/championship-player-stats/mpg_championship_player_" +
        id +
        "/summary";
      const response = await fetch(url);
      const data = await response.json();
      set_data_detail(data);
    }
  }

  return <View>{load_detail(id)}</View>;
}
