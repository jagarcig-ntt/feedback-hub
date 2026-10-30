import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FeedbackHub Lovable — Déjanos tu opinión" },
      { name: "description", content: "Comparte tu feedback con nosotros: nombre, email y mensaje en un minuto." },
      { property: "og:title", content: "FeedbackHub Lovable — Déjanos tu opinión" },
      { property: "og:description", content: "Comparte tu feedback con nosotros en un minuto." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validate(d: { name: string; email: string; message: string }): Errors {
  const e: Errors = {};
  if (!d.name.trim()) e.name = "Escribe tu nombre";
  else if (d.name.length > 100) e.name = "Máximo 100 caracteres";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = "Email no válido";
  else if (d.email.length > 255) e.email = "Máximo 255 caracteres";
  if (!d.message.trim()) e.message = "Cuéntanos algo";
  else if (d.message.length > 1000) e.message = "Máximo 1000 caracteres";
  return e;
}

function Index() {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  const field = "w-full rounded-xl border-2 border-border bg-card px-4 py-3 text-foreground outline-none transition focus:border-primary";

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
        <section>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">FeedbackHub Lovable</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-foreground md:text-6xl">
            Tu opinión nos <span className="italic text-primary">hace mejores.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Ideas, críticas o un simple saludo. Lo leemos todo.
          </p>
        </section>

        <section className="rounded-3xl bg-card p-8 shadow-[var(--shadow-card)]">
          {sent ? (
            <div className="py-12 text-center">
              <h2 className="font-display text-3xl text-foreground">¡Gracias, {data.name.trim()}!</h2>
              <p className="mt-3 text-muted-foreground">Hemos recibido tu feedback.</p>
              <button
                onClick={() => { setData({ name: "", email: "", message: "" }); setSent(false); }}
                className="mt-8 rounded-full border-2 border-primary px-6 py-2 font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                Enviar otro
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              {(["name", "email"] as const).map((k) => (
                <div key={k}>
                  <label htmlFor={k} className="mb-2 block text-sm font-medium text-foreground">
                    {k === "name" ? "Nombre" : "Email"}
                  </label>
                  <input
                    id={k}
                    type={k === "email" ? "email" : "text"}
                    maxLength={k === "name" ? 100 : 255}
                    value={data[k]}
                    onChange={(e) => setData({ ...data, [k]: e.target.value })}
                    className={field}
                  />
                  {errors[k] && <p className="mt-1 text-sm text-destructive">{errors[k]}</p>}
                </div>
              ))}
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">Mensaje</label>
                <textarea
                  id="message"
                  rows={5}
                  maxLength={1000}
                  value={data.message}
                  onChange={(e) => setData({ ...data, message: e.target.value })}
                  className={`${field} resize-none`}
                />
                <div className="mt-1 flex justify-between text-sm">
                  <span className="text-destructive">{errors.message}</span>
                  <span className="text-muted-foreground">{data.message.length}/1000</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary py-3.5 font-medium text-primary-foreground transition hover:opacity-90"
              >
                Enviar feedback
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
