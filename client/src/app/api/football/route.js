import { NextResponse } from "next/server";

const DATA_SOURCE_URL =
  "https://api.sportmonks.com/v3/football/fixtures/date/2024-05-15?api_token=ZvZv41TCMKM8sl7HTmJp253s6X7ZGSoXVgc4I4KeGrMRo3WmftQOWSVLIFBU&includes=scores";

export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);
  const finalResponse = await res.json();
  const filteredData = finalResponse.data[0];

  let scoreOfEachTeam = filteredData.scores
    .filter((entry) => entry.description == "CURRENT")
    .map((entry) => entry.score);
  const formattedScoreObj = scoreOfEachTeam.map((e) => e.goals).join("/");

  let filteredResults = {
    result: filteredData.result_info + " With a score of "+formattedScoreObj,
  };

  return NextResponse.json(filteredResults);
}
