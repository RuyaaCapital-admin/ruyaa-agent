import { generateText } from "ai";
import { openrouter } from "@ai-sdk/openrouter";   // ← new
import { groq } from "@ai-sdk/groq";
import { nanoid } from "nanoid";

/* ---------- helper: compact history ---------- */
function buildHistory(
  msgs: { role: "user" | "assistant"; content: string }[],
  limit = 8,
) {
  return msgs
    .slice(-limit)
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");
}

/* ---------- POST /api/chat ---------- */
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    /* ---------- system prompt ---------- */
    const systemPrompt = `
# RuyaaCapital – Smart Assistant (v2 · Jul 2025)
<same prompt text you already use …>
`.trim();

    /* ---------- models ---------- */
    const primary = openrouter("deepseek/deepseek-r1:free"); // $0 model
    const fallback = groq("llama3-8b-8192");                 // free backup

    /* ---------- try primary, else fallback ---------- */
    let text: string;
    try {
      ({ text } = await generateText({
        model: primary,
        temperature: 0.2,
        system: systemPrompt,
        prompt: buildHistory(messages),
      }));
    } catch {
      ({ text } = await generateText({
        model: fallback,
        temperature: 0.2,
        system: systemPrompt,
        prompt: buildHistory(messages),
      }));
    }

    return Response.json({
      id: nanoid(),
      role: "assistant",
      text,
    });
  } catch (err) {
    console.error("chat api error:", err);
    return Response.json({ error: "failed" }, { status: 500 });
  }
}
