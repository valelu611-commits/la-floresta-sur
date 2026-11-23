const STEPS = [
  { title: "1. Busca", text: "Escribe qué necesitas o toca una categoría." },
  { title: "2. Mira el mapa", text: "Los resultados aparecen como pines con popup y enlace." },
  { title: "3. Pregunta", text: "El botón flotante responde cruzando varias categorías." },
];

export function HomeSteps() {
  return (
    <section className="grid gap-3 sm:grid-cols-3">
      {STEPS.map((step) => (
        <div key={step.title} className="glass p-5">
          <p className="font-display text-sm font-bold text-neon-amber">{step.title}</p>
          <p className="mt-2 text-sm text-slate-400">{step.text}</p>
        </div>
      ))}
    </section>
  );
}
