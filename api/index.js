export default async function handler(req, res) {
    // 1. Izin CORS agar web AI bisa menyedot data
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // 2. Tembak API 55five dengan PENYAMARAN TERBARU & FRESH
        const response = await fetch("https://api.55fiveapi.com/api/webapi/GetNoaverageEmerdList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "application/json, text/plain, */*",
                // TOKEN BEARER FRESH MILIKMU:
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIxNzc3NzUyNDgxIiwibmJmIjoiMTc3Nzc1MjQ4MSIsImV4cCI6IjE3Nzc3NTQyODEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiI1LzMvMjAyNiAzOjM4OjAxIEFNIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWNjZXNzX1Rva2VuIiwiVXNlcklkIjoiMTA5Njg2MyIsIlVzZXJOYW1lIjoiNjI4OTU0MTQzNzAxNjIiLCJVc2VyUGhvdG8iOiI5IiwiTmlja05hbWUiOiJBbmRyaXBlZGlhIiwiQW1vdW50IjoiMTQ2Ljg1IiwiSW50ZWdyYWwiOiIwIiwiTG9naW5NYXJrIjoiSDUiLCJMb2dpblRpbWUiOiI1LzMvMjAyNiAzOjA4OjAxIEFNIiwiTG9naW5JUEFkZHJlc3MiOiIxMDMuMTY2LjkyLjE5NyIsIkRiTnVtYmVyIjoiMCIsIklzdmFsaWRhdG9yIjoiMCIsIktleUNvZGUiOiIzMDg3IiwiVG9rZW5UeXBlIjoiQWNjZXNzX1Rva2VuIiwiUGhvbmVUeXBlIjoiMSIsIlVzZXJUeXBlIjoiMCIsIlVzZXJOYW1lMiI6ImFuZHJpcGVkaWE5MEBnbWFpbC5jb20iLCJpc3MiOiJqd3RJc3N1ZXIiLCJhdWQiOiJsb3R0ZXJ5VGlja2V0In0.ADZWlo30KI_b4kbFSRxfAh_35gECMyaaTXIY58OW8xw",
                "Ar-Origin": "https://www.lopmiva.com",
                "Referer": "https://www.lopmiva.com/#/home/AllLotteryGames/WinGo?id=1",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36"
            },
            body: JSON.stringify({
                "pageSize": 10,
                "pageNo": 1,
                "typeId": 1, // KITA PAKSA JADI 1 UNTUK 1 MENIT
                "language": 1,
                // KUNCI FRESH DARI cURL BARUSAN:
                "random": "71138bc1b9b64a39af27518815cb149f",
                "signature": "3743C77DD4BA2170097864DF5D9390C7",
                "timestamp": 1777752482
            })
        });

        const textResponse = await response.text();

        try {
            const result = JSON.parse(textResponse);
            
            // 3. Merubah format menjadi sederhana agar dibaca oleh AI
            if (result && result.data && result.data.list && result.data.list.length > 0) {
                const latest = result.data.list[0];
                return res.status(200).json({
                    periode: latest.issueNumber,
                    hasil: latest.number
                });
            } else {
                return res.status(500).json({ error: "Gagal mendapatkan data, mungkin Signature tidak cocok dengan typeId: 1", raw: result });
            }

        } catch (err) {
            return res.status(500).json({ 
                error: "DIBLOKIR: Token/Signature sudah Expired atau tidak cocok.", 
                htmlTangkapan: textResponse.substring(0, 150) + "..."
            });
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
