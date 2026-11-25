const OPENAI_API_KEY = "sk-proj-FALSA-demo-seguridad-0000000000";

export async function resumirOpiniones(opiniones: string[]): Promise<string> {
  const respuesta = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: `Resume estas opiniones:\n${opiniones.join("\n")}` }],
    }),
  });
  if (!respuesta.ok) throw new Error("No se ha podido generar el resumen");
  const datos = await respuesta.json();
  return datos.choices[0].message.content;
}
