'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateService } from './actions'
import { Loader2, Save } from 'lucide-react'
import AvatarUpload from '../avatar-upload'
import { toast } from 'sonner'

export default function EditServiceForm({ service }: { service: any }) {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | null>(service.image_url)
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        if (loading) return
        setLoading(true)

        if (imageUrl) formData.set('imageUrl', imageUrl)
        const result = await updateService(service.id, formData)

        if (result.success) {
            toast.success('Serviço atualizado com sucesso!')
            router.push('/dashboard/services')
            router.refresh()
        } else {
            toast.error(result.message)
            setLoading(false)
        }
    }

    return (
        <form action={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Título do Serviço</label>
                    <input
                        name="title"
                        required
                        defaultValue={service.title}
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
                            defaultValue={service.price}
                            placeholder="100.00"
                            className="w-full rounded-xl border border-gray-200 p-3 bg-gray-50 focus:ring-2 focus:ring-indigo-600 outline-none transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
                        <select
                            name="category"
                            defaultValue={service.category}
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
                        rows={5}
                        required
                        defaultValue={service.description}
                        placeholder="Descreva detalhadamente o seu trabalho..."
                        className="w-full rounded-xl border border-gray-200 p-3 bg-gray-50 focus:ring-2 focus:ring-indigo-600 outline-none transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-white resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Foto do Serviço</label>
                    <AvatarUpload url={imageUrl} onUpload={setImageUrl} />
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 py-3 px-4 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition-all dark:border-zinc-700 dark:text-gray-400"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 justify-center inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 disabled:opacity-50 transition-all"
                >
                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <><Save className="h-5 w-5" /> Salvar Alterações</>}
                </button>
            </div>
        </form>
    )
}
