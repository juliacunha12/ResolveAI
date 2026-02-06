'use client'

import { useState } from 'react'
import { Reply, Send, X } from 'lucide-react'
import { replyToReview } from './actions'

export default function ReplyButton({ reviewId }: { reviewId: string }) {
    const [isReplying, setIsReplying] = useState(false)
    const [reply, setReply] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSend() {
        if (!reply.trim()) return
        setLoading(true)
        const res = await replyToReview(reviewId, reply)
        setLoading(false)
        if (res.success) {
            setIsReplying(false)
        } else {
            alert(res.message)
        }
    }

    if (!isReplying) {
        return (
            <button
                onClick={() => setIsReplying(true)}
                className="mt-2 text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1"
            >
                <Reply className="h-3 w-3" /> Responder
            </button>
        )
    }

    return (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg dark:bg-zinc-800 border border-indigo-100 dark:border-indigo-900/30">
            <textarea
                autoFocus
                placeholder="Sua resposta para o cliente..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="w-full bg-transparent text-xs outline-none min-h-[60px] resize-none dark:text-gray-300"
            />
            <div className="flex justify-end gap-2 mt-2">
                <button
                    onClick={() => setIsReplying(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <X className="h-4 w-4" />
                </button>
                <button
                    onClick={handleSend}
                    disabled={loading || !reply.trim()}
                    className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded text-[10px] font-bold hover:bg-indigo-500 disabled:opacity-50"
                >
                    {loading ? '...' : <><Send className="h-3 w-3" /> Enviar</>}
                </button>
            </div>
        </div>
    )
}
