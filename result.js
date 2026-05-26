export default async function handler(req, res) {
  try {
    const response = await fetch("https://didihub.com/api/webapi/GetNoaverageEmerdList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pageSize: 1,
        pageNo: 1,
        typeId: 1,
        language: 0,
        random: "4a0522c6ecd8410496260e686be2a57c",
        signature: "4A0522C6ECD8410496260E686BE2A57C",
        timestamp: Math.floor(Date.now() / 1000)
      })
    });

    const data = await response.json();
    const result = data?.data?.list?.[0];

    res.status(200).json({
      result: result.number
    });

  } catch (e) {
    res.status(500).json({
      error: e.toString()
    });
  }
}
