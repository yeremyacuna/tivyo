const foundationItems = [
  'React + TypeScript application shell',
  'Vite development and production build pipeline',
  'Tailwind CSS styling foundation',
  'Installable PWA manifest and service worker',
] as const

export function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16 sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
          Tivyo · Foundation
        </p>

        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Know what matters next.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          The first Tivyo client is now structured as a cross-platform Progressive Web App. This
          screen is intentionally minimal while the product UI system is still being defined.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {foundationItems.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm leading-6 text-slate-200">{item}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-slate-500">Day 1 · Foundation &amp; Core</p>
      </section>
    </main>
  )
}
