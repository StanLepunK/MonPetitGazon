import React from "react";
import { View } from "react-native";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";

import { MpgContext } from "../main";

export type Props = { id: string | undefined };

function DisplayDetail({ data }) {
  if (data !== undefined && data.statsSeasons !== undefined) {
    const seasons = Object.keys(data.statsSeasons);
    return (
      <div>
        <div>{data.id}</div>
        <div>{data.type}</div>
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

export function Detail() {
  const { id } = useContext(MpgContext);
  const [data, set_data] = useState({});

  function load_detail(id: string | undefined) {
    get_detail(id).then((data) => data);
  }

  async function get_detail(id: string | undefined) {
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
      <Link to="/">home</Link>
      {load_detail(id)}
      {/* <div>{console.log(id)}</div> */}
      <DisplayDetail data={data} />
    </View>
  );
}
