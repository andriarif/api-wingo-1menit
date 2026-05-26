export default async function handler(req, res) {

  const response = await fetch(
    "https://didihub.com/api/main/lottery/rounds?page=1&count=20&type=3",
    {
      headers: {
        Accept: "application/json, text/plain, */*",
        user_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3Nzk4NjMyOTAzMjYsInBheWxvYWQiOiJJL2NTdW5DR25mcFR3MkNoay9YeVJjOEpKV2xmRGlOd2Q0T0JTOWRYaklWODZVMCs4cmFZaVZqemlWM0Nxc1EyIn0.h-BkmTlY4H-QwuvjcHc9vgjXT1rwhHF25qm1nkMdaVY"
      }
    }
  );

  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.status(200).json(data);

}
