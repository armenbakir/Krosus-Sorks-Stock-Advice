import { dates } from "@/utils/dates";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { tickers } = await request.json();
  const openAiApiKey = process.env.OPENAI_API_KEY;
  const stockApiKey = process.env.STOCK_API_KEY;

  if (!openAiApiKey || !stockApiKey) {
    return NextResponse.json({ error: "Missing API keys" }, { status: 500 });
  }

  if (!Array.isArray(tickers) || tickers.length === 0) {
    return NextResponse.json({ error: "Invalid tickers" }, { status: 400 });
  }

  const stockData = await Promise.all(
    tickers.map(async (ticker) => {
      const response = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${stockApiKey}`
      );
      return response.data;
    })
  );

  const aiResponse = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a trading expert. Given data on share prices over the past 3 days, write a report of no more than 100 words. Use metafors. Always end the report with a recommendation, buy or sell.",
        },
        { role: "user", content: JSON.stringify(stockData) },
      ],
      max_tokens: 200,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiApiKey}`,
      },
    }
  );

  const aiTextResponse = aiResponse.data.choices[0].message.content.trim();

  return new NextResponse(JSON.stringify({ report: aiTextResponse }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
