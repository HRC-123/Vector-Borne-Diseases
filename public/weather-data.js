console.log("Hii");
async function logMovies() {
  const response = await fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/amritsar/2024-04-01/2024-04-30?unitGroup=metric&key=RPCF6N23JJSRWDKTBS8PUXZ6W&contentType=json"
  );
  console.log(response);
}
logMovies();
