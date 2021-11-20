import React from "react";

export function DisplayClubs({ data }) {
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
