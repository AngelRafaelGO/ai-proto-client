import axios from "axios";

export async function updateGoogleSheet(data) {
  const url = "url-de-api-ia-ici";

  return axios
    .post(url, {
      data: "le-body-que-api-attend",
    })
    .then((response) => {
      console.log(response);
    });
}
