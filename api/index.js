export default async function handler(req, res) {
  // 1. IZIN CORS AGAR HTML BISA MENARIK DATA
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // 2. TEMBAK API 55FIVE 1 MENIT DENGAN KUNCI SAKTI TERBARU
    const resultResp = await fetch("https://api.55fiveapi.com/api/webapi/GetNoaverageEmerdList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json, text/plain, */*",
        // TOKEN BARU MILIKMU:
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIxNzc3Nzc1MTAwIiwibmJmIjoiMTc3Nzc3NTEwMCIsImV4cCI6IjE3Nzc3NzY5MDAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiI1LzMvMjAyNiA5OjU1OjAwIEFNIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWNjZXNzX1Rva2VuIiwiVXNlcklkIjoiMTA5Njg2MyIsIlVzZXJOYW1lIjoiNjI4OTU0MTQzNzAxNjIiLCJVc2VyUGhvdG8iOiI5IiwiTmlja05hbWUiOiJBbmRyaXBlZGlhIiwiQW1vdW50IjoiMTQ2Ljg1IiwiSW50ZWdyYWwiOiIwIiwiTG9naW5NYXJrIjoiSDUiLCJMb2dpblRpbWUiOiI1LzMvMjAyNiA5OjI1OjAwIEFNIiwiTG9naW5JUEFkZHJlc3MiOiIxMDMuMTY2LjkyLjE5NyIsIkRiTnVtYmVyIjoiMCIsIklzdmFsaWRhdG9yIjoiMCIsIktleUNvZGUiOiIzMDg4IiwiVG9rZW5UeXBlIjoiQWNjZXNzX1Rva2VuIiwiUGhvbmVUeXBlIjoiMSIsIlVzZXJUeXBlIjoiMCIsIlVzZXJOYW1lMiI6ImFuZHJpcGVkaWE5MEBnbWFpbC5jb20iLCJpc3MiOiJqd3RJc3N1ZXIiLCJhdWQiOiJsb3R0ZXJ5VGlja2V0In0.BHTCjnWNNas5x81tNwof6132z2rUd51Xp6umusz0UAc",
        "Ar-Origin": "https://www.lopmiva.com",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36"
      },
      body: JSON.stringify({
        "pageSize": 10,
        "pageNo": 1,
        "typeId": 1, // KODE 1 MENIT
        "language": 1,
        // PAYLOAD BARU MILIKMU:
        "random": "d0e420d7631e432785cbae051b91fe81",
        "signature": "8AD73DD465CFDC2DB36DBE6E54408A2F",
        "timestamp": 1777775584
      })
    });

    const resultJson = await resultResp.json();
    const list = resultJson?.data?.list;

    if (!list || list.length < 1) {
      return res.status(500).json({ error: "Data diblokir atau Token/Signature sudah basi (Expired)" });
    }

    // 3. FORMAT ULANG DATA UNTUK MESIN AI
    const latest = list[0];
    const hasil = parseInt(latest.number);

    // KALKULASI PERIODE BERJALAN (+1)
    const currentIssue = String(BigInt(latest.issueNumber) + 1n);

    return res.status(200).json({
      periode: currentIssue,
      resultIssue: latest.issueNumber,
      hasil: hasil,
      number: latest.number,
      status: hasil <= 4 ? "SMALL" : "BIG"
    });

  } catch (err) {
    return res.status(500).json({
      error: "Server Error Vercel",
      detail: err.message
    });
  }
}
