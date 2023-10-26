import axios from "axios";

export async function getAiResponse(userInputTxt) {
  const url = "http://localhost:5000/message";

  return axios
    .post(url, {
      apiKey: "la-key",
      data: { message: userInputTxt },
    })
    .then((response) => {
      console.log(response);
      // if status code 200, return ia response
    });
}
