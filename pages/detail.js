import React from "react";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { useContext } from "react";

import { MpgContext } from "../main";

export function Detail() {
  const { id } = useContext(MpgContext);
  const [data, set_data] = useState({});

  function load_detail(id) {
    get_detail(id).then((data) => data);
  }

  function DisplayDetail({ data }) {
    if (data !== undefined && data.statsSeasons !== undefined) {
      const seasons = Object.keys(data.statsSeasons);
      return (
        <div>
          <div>{data.id}</div>
          <div>{data.type}</div>
          {/* <div>{data.statsSeasons}</div> */}
          <div>
            {seasons.map((key, elem) => (
              <div>{data.statsSeasons[key]}</div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  }

  async function get_detail(id) {
    if (id !== undefined) {
      const url =
        "https://api.mpg.football/api/data/championship-player-stats/" +
        id +
        "/summary";
      const response = await fetch(url);
      const data = await response.json();
      set_data(data);
    }
  }

  return (
    <View>
      {load_detail(id)}
      {/* <div>{console.log(id)}</div> */}
      <DisplayDetail data={data} />
    </View>
  );
}
