'use client'

import { useState } from 'react'
import { createService } from './actions'
import { Plus, X, Loader2 } from 'lucide-react'
import AvatarUpload from '../avatar-upload'
import { toast } from 'sonner'

export default function NewServiceForm({ onSuccess }: { onSuccess: () => void }) {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    const handleSubmit = async (formData: FormData) => {
        if (loading) return // Extra safeguard
        setLoading(true)

        try {
            if (imageUrl) formData.set('imageUrl', imageUrl)
            const result = await createService(formData)

            if (result.success) {
                toast.success('Serviço criado com sucesso!')
                setImageUrl(null)
                // O onSuccess redireciona ou fecha o modal
                onSuccess()
            } else {
                toast.error(result.message)
                setLoading(false)
            }
        } catch (error) {
            console.error(error)
            toast.error('Ocorreu um erro inesperado.')
            setLoading(false)
        }
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Título do Serviço</label>
                <input
                    name="title"
                    required
                    placeholder="Ex: Limpeza Residencial"
                    className="w-full rounded-xl border border-gray-200 p-3 bg-gray-50 focus:ring-2 focus:ring-indigo-600 outline-none transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Preço (R$)</label>
                    <input
                        name="price"
                        type="number"
                        step="0.01"
                        required
                        placeholder="100.00"
                        className="w-full rounded-xl border border-gray-200 p-3 bg-gray-50 focus:ring-2 focus:ring-indigo-600 outline-none transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
                    <select
                        name="category"
                        className="w-full rounded-xl border border-gray-200 p-3 bg-gray-50 focus:ring-2 focus:ring-indigo-600 outline-none transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                    >
                        <option value="Limpeza">Limpeza</option>
                        <option value="Manutenção">Manutenção</option>
                        <option value="Aulas">Aulas</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                <textarea
                    name="description"
                    rows={3}
                    required
                    placeholder="Descreva detalhadamente o seu trabalho..."
                    className="w-full rounded-xl border border-gray-200 p-3 bg-gray-50 focus:ring-2 focus:ring-indigo-600 outline-none transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-white resize-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Foto do Serviço</label>
                <AvatarUpload url={null} onUpload={setImageUrl} />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full justify-center inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 disabled:opacity-50 transition-all"
            >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Criar Serviço'}
            </button>
        </form>
    )
}
