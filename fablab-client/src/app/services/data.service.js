import axios from "axios";

export async function getAiResponse(userInputTxt) {
  const url = "e-endpoint-d'antoine";

  return axios
    .post(url, {
      data: "l'input-de-l'utilisateur",
    })
    .then((response) => {
      console.log(response);
    });
}
