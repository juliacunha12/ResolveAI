'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { createReview } from './actions'
import { toast } from 'sonner'

export default function ReviewForm({ serviceId }: { serviceId: string }) {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (rating === 0) {
            return toast.error('Selecione uma nota de 1 a 5 estrelas.')
        }

        setLoading(true)
        const res = await createReview(serviceId, rating, comment)
        setLoading(false)

        if (res.success) {
            toast.success(res.message)
            setRating(0)
            setComment('')
        } else {
            toast.error(res.message)
        }
    }

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm mt-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Avalie este serviço</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="focus:outline-none transition-transform hover:scale-110"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <Star
                                className={`h-8 w-8 ${star <= (hover || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                        </button>
                    ))}
                </div>

                <textarea
                    placeholder="Conte como foi sua experiência..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full rounded-md border p-3 min-h-[100px] dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-500 disabled:opacity-50 transition-colors"
                >
                    {loading ? 'Enviando...' : 'Enviar Avaliação'}
                </button>
            </form>
        </div>
    )
}
