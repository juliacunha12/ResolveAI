import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowLeft, MapPin, Phone, User, CheckCircle, Star } from 'lucide-react'
import ReviewForm from './review-form'
import ReviewList from './review-list'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { id } = await params
    const supabase = await createClient()
    const { data: service } = await supabase.from('services').select('title, description').eq('id', id).single()

    return {
        title: service?.title || 'Serviço',
        description: service?.description?.substring(0, 160) || 'Detalhes do serviço no ResolveAI',
    }
}

interface ServicePageProps {
    params: {
        id: string
    }
}

export default async function ServiceDetailsPage({ params }: ServicePageProps) {
    const supabase = await createClient()
    const { id } = await params

    // Auth check for form visibility
    const { data: { user } } = await supabase.auth.getUser()

    // Buscamos o serviço E os dados do prestador (join)
    const { data: service } = await supabase
        .from('services')
        .select('*, profiles(*), service_ratings(average_rating, review_count)')
        .eq('id', id)
        .single()

    if (!service) {
        return (
            <div className="flex h-screen flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Serviço não encontrado</h1>
                <Link href="/search" className="text-indigo-600 hover:underline">Voltar para busca</Link>
            </div>
        )
    }

    // Link do WhatsApp
    const whatsappLink = `https://wa.me/55${service.profiles.phone?.replace(/\D/g, '')}?text=Olá, vi seu serviço "${service.title}" no ResolveAI e gostaria de mais informações.`

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 animate-fade-in">
            <div className="max-w-5xl mx-auto">
                <Link href="/search" className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para busca
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Coluna Principal: Detalhes do Serviço */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800">
                            {service.image_url ? (
                                <img src={service.image_url} alt={service.title} className="w-full h-96 object-cover" />
                            ) : (
                                <div className="w-full h-64 bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-400">
                                    Sem Foto
                                </div>
                            )}

                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium dark:bg-indigo-900/30 dark:text-indigo-300">
                                        {service.category}
                                    </span>
                                    <span className="text-gray-500 text-sm">Publicado em {new Date(service.created_at).toLocaleDateString()}</span>
                                </div>

                                <div className="flex items-center justify-between mb-2">
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{service.title}</h1>
                                    <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl dark:bg-yellow-900/20">
                                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        <span className="font-bold text-yellow-700 dark:text-yellow-500">
                                            {service.service_ratings?.[0]?.average_rating || '0.0'}
                                        </span>
                                        <span className="text-yellow-600 text-sm dark:text-yellow-400/70">
                                            ({service.service_ratings?.[0]?.review_count || 0} avaliações)
                                        </span>
                                    </div>
                                </div>

                                <div className="prose max-w-none text-gray-600 dark:text-gray-300">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Descrição</h3>
                                    <p className="whitespace-pre-line leading-relaxed text-base">{service.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* SEÇÃO DE AVALIAÇÕES */}
                        <ReviewList serviceId={id} />

                        {user ? (
                            <ReviewForm serviceId={id} />
                        ) : (
                            <div className="bg-gray-100 p-6 rounded-xl text-center dark:bg-zinc-900">
                                <p className="text-gray-600 mb-2 dark:text-gray-400">Quer avaliar este serviço?</p>
                                <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
                                    Faça login para deixar sua opinião
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Coluna Lateral: Cartão do Prestador */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800 sticky top-6">
                            <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100 dark:border-zinc-800">
                                <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden mb-4 border-4 border-white shadow-sm dark:border-zinc-800">
                                    {service.profiles.avatar_url ? (
                                        <img src={service.profiles.avatar_url} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center bg-indigo-100 text-indigo-600">
                                            <User className="h-10 w-10" />
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{service.profiles.full_name}</h2>
                                <div className="flex items-center text-gray-500 text-sm mt-1 gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {service.profiles.city || 'Local não informado'}
                                </div>
                            </div>

                            <div className="py-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Valor Estimado</span>
                                    <span className="text-2xl font-bold text-indigo-600">R$ {service.price}</span>
                                </div>

                                {service.profiles.bio && (
                                    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 italic dark:bg-zinc-800 dark:text-gray-400">
                                        "{service.profiles.bio}"
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                {service.profiles.phone ? (
                                    <a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-500 transition-all shadow-lg shadow-green-600/20"
                                    >
                                        <Phone className="h-5 w-5" />
                                        Contatar via WhatsApp
                                    </a>
                                ) : (
                                    <button disabled className="w-full bg-gray-200 text-gray-500 py-3 rounded-xl font-medium cursor-not-allowed dark:bg-zinc-800">
                                        Telefone Indisponível
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
