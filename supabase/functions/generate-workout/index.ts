import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { energy, sleep, emotion, physical } = await req.json()

    const energyLabels = { 1:"severely depleted", 2:"low", 3:"moderate", 4:"good", 5:"high/charged" }
    const sleepLabels  = { 1:"very poor", 2:"poor", 3:"decent", 4:"good", 5:"excellent" }
    const emotionMap   = {
      anxious:   "anxious and stressed",
      motivated: "motivated and fired up",
      flat:      "emotionally flat and disconnected",
      sad:       "heavy-hearted or grieving",
      focused:   "calm and focused",
      restless:  "restless and unable to settle",
    }
    const physicalMap  = {
      fresh:      "feeling physically fresh",
      sore:       "dealing with general muscle soreness",
      injury:     "managing an active injury",
      tight:      "feeling stiff and tight",
      sick:       "slightly under the weather",
      recovering: "in active recovery",
    }

    const prompt = `You are Ayoka's adaptive fitness coach. Meet the athlete exactly where they are.

Athlete check-in:
- Energy: ${energyLabels[energy]} (${energy}/5)
- Sleep: ${sleepLabels[sleep]} (${sleep}/5)
- Emotional state: ${emotionMap[emotion]}
- Physical state: ${physicalMap[physical]}

Respond in exactly three sections:

**FEEL:** (2-3 sentences) Acknowledge what they're carrying. Name it without judgment. Make them feel seen.

**ADAPT — Today's Workout:** Specific session adapted to their state. Include type, duration, 3-5 exercises with reps/sets, and one scale-down option.

**GROW:** (2-3 sentences) One insight connecting today's choice to identity, not just fitness.

Ayoka's philosophy: the body keeps score and the app should too. Fitness that moves with how you feel — not how an algorithm expects you to.`

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": Deno.env.get("ANTHROPIC_API_KEY") ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    })

    const data = await response.json()
    const text = data.content[0].text

    // Parse the three sections out of Claude's response
    const feelMatch  = text.match(/\*\*FEEL:\*\*([\s\S]*?)(?=\*\*ADAPT|$)/)
    const adaptMatch = text.match(/\*\*ADAPT[^:]*:\*\*([\s\S]*?)(?=\*\*GROW|$)/)
    const growMatch  = text.match(/\*\*GROW:\*\*([\s\S]*?)$/)

    return new Response(
      JSON.stringify({
        feel:  feelMatch?.[1]?.trim()  ?? "",
        adapt: adaptMatch?.[1]?.trim() ?? "",
        grow:  growMatch?.[1]?.trim()  ?? "",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})