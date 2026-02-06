
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Search, Shield, Star, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black selection:bg-indigo-500 selection:text-white animate-fade-in">

      {/* Navbar / Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 text-2xl font-bold tracking-tighter text-indigo-600">
              ResolveAI
            </Link>
          </div>
          <div className="flex flex-1 justify-end gap-x-6">
            {user ? (
              <Link href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-indigo-600 transition-colors">
                Meu Painel <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-indigo-600 transition-colors">
                  Entrar
                </Link>
                <Link href="/login" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-transform hover:scale-105 active:scale-95">
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-1">

        {/* HERO SECTION */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
          {/* Background Gradients */}
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
          </div>

          <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56 text-center">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-400 dark:ring-white/10 dark:hover:ring-white/20 transition-all">
                A revolução dos serviços chegou. <Link href="/search" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true" />Ver serviços disponíveis <span aria-hidden="true">&rarr;</span></Link>
              </div>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-500">
              Serviços de qualidade,<br /> na velocidade da IA.
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Conectamos você aos melhores profissionais da sua região.
              De reparos domésticos a aulas particulares, resolva tudo em um clique.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/search"
                className="group relative flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:shadow-indigo-600/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:-translate-y-1"
              >
                <Search className="h-5 w-5" />
                Encontrar Profissional
              </Link>
              <Link href="/login" className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-indigo-600 transition-colors">
                Sou Prestador <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="bg-white dark:bg-black py-24 sm:py-32 border-t border-gray-100 dark:border-zinc-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Por que escolher o ResolveAI?</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Tudo o que você precisa para resolver seus problemas
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">

                <div className="relative pl-16 group">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 group-hover:bg-indigo-500 transition-colors">
                      <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    Verificado e Seguro
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                    Todos os prestadores passam por uma verificação básica. Segurança para quem contrata e para quem trabalha.
                  </dd>
                </div>

                <div className="relative pl-16 group">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 group-hover:bg-indigo-500 transition-colors">
                      <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    Contato Rápido
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                    Sem intermediários chatos. Fale direto no WhatsApp do profissional e combine o serviço na hora.
                  </dd>
                </div>

                <div className="relative pl-16 group">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 group-hover:bg-indigo-500 transition-colors">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    Melhores Avaliados
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                    Encontre os profissionais mais recomendados pela comunidade e garanta um serviço de excelência.
                  </dd>
                </div>

                <div className="relative pl-16 group">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 group-hover:bg-indigo-500 transition-colors">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    Fácil de Usar
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                    Nossa interface foi pensada para você achar o que precisa em segundos, sem complicações.
                  </dd>
                </div>

              </dl>
            </div>
          </div>
        </div>

        {/* SOCIAL PROOF / MOCK TESTIMONIALS */}
        <div className="relative isolate bg-white dark:bg-black py-24 sm:py-32 border-t border-gray-100 dark:border-zinc-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Depoimentos</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Quem usa a ResolveAI aprova
              </p>
            </div>
            <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    body: "Encontrei um eletricista em 10 minutos. O serviço foi impecável e o preço super justo. Recomendo demais!",
                    author: "Ana Silva",
                    role: "Cliente em SP"
                  },
                  {
                    body: "Como prestador, minha agenda lotou depois que entrei na plataforma. A interface é muito fácil de usar.",
                    author: "Carlos Eduardo",
                    role: "Marido de Aluguel"
                  },
                  {
                    body: "A facilidade de falar direto no WhatsApp faz toda a diferença. Nada de burocracia ou taxas escondidas.",
                    author: "Mariana Costa",
                    role: "Cliente em RJ"
                  }
                ].map((testimonial, idx) => (
                  <div key={idx} className="rounded-2xl bg-gray-50 dark:bg-zinc-900 p-8 text-sm leading-6 border border-gray-100 dark:border-zinc-800 hover:shadow-lg transition-shadow">
                    <blockquote className="text-gray-900 dark:text-gray-300">
                      <p>"{testimonial.body}"</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                        {testimonial.author[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</div>
                        <div className="text-gray-600 dark:text-gray-500">{testimonial.role}</div>
                      </div>
                    </figcaption>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <span className="text-gray-400">Instagram</span>
            <span className="text-gray-400">Twitter</span>
            <span className="text-gray-400">LinkedIn</span>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-sm leading-5 text-gray-500">
              ResolveAI — Sua plataforma de especialistas.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
