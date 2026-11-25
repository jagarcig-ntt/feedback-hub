import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resumirOpiniones } from "@/lib/resumen-ia";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

const OPINIONES = [
  { id: 1, name: "Persona Uno", email: "uno@example.com", message: "El formulario es fácil de usar." },
  { id: 2, name: "Persona Dos", email: "dos@example.com", message: "Me gustaría recibir una copia." },
];

function Admin() {
  const [opiniones, setOpiniones] = useState(OPINIONES);
  const [resumen, setResumen] = useState("");

  const resumir = async () => {
    try {
      setResumen(await resumirOpiniones(opiniones.map((o) => o.message)));
    } catch {
      setResumen("No se ha podido generar el resumen.");
    }
  };

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <h1 className="font-display text-4xl text-foreground">Administración</h1>
      <button onClick={resumir} className="mt-6 rounded-full bg-primary px-6 py-2 text-primary-foreground">
        Resumir opiniones
      </button>
      {resumen && <p className="mt-4 text-foreground">{resumen}</p>}
      <ul className="mt-8 space-y-4">
        {opiniones.map((o) => (
          <li key={o.id} className="rounded-xl bg-card p-4 text-foreground">
            <p>{o.name} · {o.email}</p>
            <p className="text-muted-foreground">{o.message}</p>
            <button
              onClick={() => setOpiniones(opiniones.filter((x) => x.id !== o.id))}
              className="mt-2 text-sm text-destructive"
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
