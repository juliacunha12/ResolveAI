
import { createClient } from '@/lib/supabase/server'
import { Star, User, Reply } from 'lucide-react'

// Busca reviews e perfis associados
export default async function ReviewList({ serviceId }: { serviceId: string }) {
    const supabase = await createClient()

    const { data: reviews } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .eq('service_id', serviceId)
        .order('created_at', { ascending: false })

    if (!reviews || reviews.length === 0) {
        return (
            <div className="mt-8 text-center text-gray-500 py-8 bg-gray-50 rounded-xl dark:bg-zinc-900">
                Ainda não há avaliações para este serviço. Seja o primeiro!
            </div>
        )
    }

    // Calcular média
    const average = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length

    return (
        <div className="mt-12 space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Avaliações</h2>
                <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    <span className="font-bold text-yellow-700">{average.toFixed(1)}</span>
                    <span className="text-yellow-600 text-sm">({reviews.length})</span>
                </div>
            </div>

            <div className="grid gap-6">
                {reviews.map((review: any) => (
                    <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                                {review.profiles?.avatar_url ? (
                                    <img src={review.profiles.avatar_url} className="h-full w-full object-cover" />
                                ) : (
                                    <User className="h-6 w-6 text-gray-400" />
                                )}
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900 dark:text-white">
                                    {review.profiles?.full_name || 'Usuário'}
                                </div>
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                            </div>
                            <span className="ml-auto text-xs text-gray-400">
                                {new Date(review.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{review.comment}</p>

                        {/* RESPOSTA DO PRESTADOR */}
                        {review.reply && (
                            <div className="mt-4 ml-4 p-4 bg-indigo-50/50 rounded-xl border-l-4 border-indigo-500 dark:bg-indigo-900/10">
                                <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest mb-1 flex items-center gap-2">
                                    <Reply className="h-3 w-3 rotate-180" /> Resposta do Prestador
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                    {review.reply}
                                </p>
                                {review.replied_at && (
                                    <span className="text-[10px] text-gray-400 mt-2 block">
                                        Em {new Date(review.replied_at).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
