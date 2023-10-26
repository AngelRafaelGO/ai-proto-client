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
      if (response.status === 200) {
        return "the-ai-response-txt";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
