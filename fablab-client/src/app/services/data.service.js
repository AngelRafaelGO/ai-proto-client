import axios from "axios";

export async function getAiResponse(userInputTxt) {
  const URL = "http://localhost:5000/ai_response";
  const API_KEY = "2c1e2da8c62c8666d73d5181";

  return axios
    .post(URL, {
      apiKey: API_KEY,
      data: { message: userInputTxt },
    })
    .then((response) => {
      if (response.status === 200) {
        return JSON.parse(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getInitialAiResponse(userData) {
  const URL = "http://localhost:5000/init_ai_response";
  const API_KEY = "2c1e2da8c62c8666d73d5181";

  return axios
    .post(URL, {
      apiKey: API_KEY,
      data: { message: userData },
    })
    .then((response) => {
      if (response.status === 200) {
        return JSON.parse(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
// Api call for sending feedback regarding ai responses
/*
export async function sendUsefulnessAnswer(answer) {
    const URL     = "http://localhost:5000/answer";
    const API_KEY = "2c1e2da8c62c8666d73d5181"

    return axios
        .post(URL, {
            'apiKey': API_KEY,
            'data': { 'message': answer },
        })
        .then((response) => {
            if (response.status === 200) {
                return true;
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
*/
