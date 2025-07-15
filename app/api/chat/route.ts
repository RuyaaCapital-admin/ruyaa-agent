import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { nanoid } from "nanoid";

/* ---------- helper: build compact history ---------- */
function buildHistory(
  msgs: { role: "user" | "assistant"; content: string }[],
  limit = 8
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

    /* pick a model – keep llama‑3 default */
    const modelID = "llama3-8b-8192";      // change to "deepseek-chat" if you want

    const systemPrompt = `# RuyaaCapital – Smart Agent (Production Rules)
(… keep your full prompt here …)
STRICTLY: never mix languages; max‑3 sentences; value‑focused.`;

    const { text } = await generateText({
      model: groq(modelID),
      temperature: 0.2,
      system: systemPrompt,
      prompt: buildHistory(messages),   // full context
    });

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
