import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Search, Star } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Bushar Serviços',
    description: 'Encontre os melhores profissionais e serviços da sua região.',
}

interface SearchPageProps {
    searchParams: {
        q?: string
        category?: string
    }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const supabase = await createClient()

    const { q, category } = await searchParams || {}

    let query = supabase
        .from('services')
        .select(`
            *,
            profiles(full_name, city, avatar_url),
            service_ratings(average_rating, review_count)
        `)
        .order('created_at', { ascending: false })

    if (q) {
        query = query.ilike('title', `%${q}%`)
    }

    if (category && category !== 'Todos') {
        query = query.eq('category', category)
    }

    const { data: services } = await query

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black animate-fade-in">
            {/* Header de Busca */}
            <div className="bg-white border-b border-gray-200 py-8 px-4 dark:bg-zinc-900 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto space-y-4">
                    <Link href="/" className="text-2xl font-bold text-indigo-600">ResolveAI</Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Encontre o serviço ideal</h1>

                    <form className="flex flex-col sm:flex-row gap-4 max-w-3xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                name="q"
                                defaultValue={q}
                                placeholder="O que você precisa? (ex: Eletricista)"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                            />
                        </div>

                        <select
                            name="category"
                            defaultValue={category}
                            className="py-3 px-4 rounded-lg border border-gray-300 bg-white dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                        >
                            <option value="Todos">Todas as Categorias</option>
                            <option value="Limpeza">Limpeza</option>
                            <option value="Manutenção">Manutenção</option>
                            <option value="Aulas">Aulas</option>
                            <option value="Saúde">Saúde</option>
                        </select>

                        <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition-colors">
                            Buscar
                        </button>
                    </form>
                </div>
            </div>

            {/* Resultados */}
            <main className="max-w-7xl mx-auto py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services?.map((service) => (
                        <Link key={service.id} href={`/service/${service.id}`} className="group block bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all dark:bg-zinc-900 dark:border-zinc-800">
                            <div className="relative h-48 w-full bg-gray-200 dark:bg-zinc-800">
                                {service.image_url ? (
                                    <img src={service.image_url} alt={service.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-gray-400">Sem Foto</div>
                                )}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-indigo-600 shadow-sm">
                                    {service.category}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="h-6 w-6 rounded-full bg-indigo-100 overflow-hidden">
                                        {service.profiles?.avatar_url && <img src={service.profiles.avatar_url} className="h-full w-full object-cover" />}
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{service.profiles?.full_name || 'Prestador'}</span>
                                    {service.profiles?.city && <span className="text-sm text-gray-400">• {service.profiles.city}</span>}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-1 dark:text-white group-hover:text-indigo-600 transition-colors">
                                    {service.title}
                                </h3>

                                <div className="flex items-center gap-1 mb-3 text-sm">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-bold text-gray-900 dark:text-white">
                                        {service.service_ratings?.[0]?.average_rating || '0.0'}
                                    </span>
                                    <span className="text-gray-400">
                                        ({service.service_ratings?.[0]?.review_count || 0})
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm line-clamp-2 mb-4 dark:text-gray-400">
                                    {service.description}
                                </p>
                                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-zinc-800">
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                                        R$ {service.price}
                                    </span>
                                    <span className="text-sm font-medium text-indigo-600">Ver detalhes →</span>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {services?.length === 0 && (
                        <div className="col-span-full text-center py-20">
                            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4 dark:bg-zinc-800">
                                <Search className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Nenhum serviço encontrado</h3>
                            <p className="text-gray-500 mt-2">Tente buscar por outro termo ou categoria.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
