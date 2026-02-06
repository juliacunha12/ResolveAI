import { createClient } from '@/lib/supabase/server'
import { Star, MessageSquare } from 'lucide-react'
import ReplyButton from './reply-button'

export default async function DashboardReviews() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Buscar serviços do usuário para pegar os reviews deles
    const { data: services } = await supabase
        .from('services')
        .select('id')
        .eq('provider_id', user.id)

    const serviceIds = services?.map(s => s.id) || []

    if (serviceIds.length === 0) return null

    const { data: reviews } = await supabase
        .from('reviews')
        .select('*, services:service_id ( title ), profiles:user_id ( full_name )')
        .in('service_id', serviceIds)
        .order('created_at', { ascending: false })

    if (!reviews || reviews.length === 0) {
        return (
            <div className="bg-white p-6 rounded-xl border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm mt-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                    Últimas Avaliações
                </h3>
                <p className="text-sm text-gray-500">Você ainda não recebeu nenhuma avaliação.</p>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm mt-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-indigo-600" />
                Feedback dos Clientes
            </h3>
            <div className="space-y-4">
                {reviews.map((review: any) => (
                    <div key={review.id} className="text-sm border-b border-gray-50 dark:border-zinc-800 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-1">
                            <span className="font-bold">{review.profiles?.full_name || 'Cliente'}</span>
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-500 text-xs mb-1">Em: {review.services?.title}</p>
                        <p className="text-gray-600 dark:text-gray-400 italic">"{review.comment}"</p>

                        {review.reply ? (
                            <div className="mt-2 pl-3 border-l-2 border-indigo-500 text-xs py-1">
                                <span className="font-semibold text-indigo-600">Sua resposta:</span> {review.reply}
                            </div>
                        ) : (
                            <ReplyButton reviewId={review.id} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
