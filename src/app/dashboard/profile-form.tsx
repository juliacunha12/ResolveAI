'use client'

import { useState } from 'react'
import { updateProfile } from './actions'
import { Save, Loader2 } from 'lucide-react'
import AvatarUpload from './avatar-upload'
import { toast } from 'sonner'

interface ProfileFormProps {
    initialData: {
        full_name: string | null
        avatar_url: string | null
        bio: string | null
        phone: string | null
        city: string | null
        role: string
    }
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
    const [loading, setLoading] = useState(false)

    // Estado local para a URL do avatar (para enviar no form)
    const [avatarUrl, setAvatarUrl] = useState(initialData.avatar_url)

    const handleSubmit = async (formData: FormData) => {
        setLoading(true)

        // Anexar a URL do avatar manualmente ao FormData,
        // já que o input file do AvatarUpload não faz parte direta deste form HTML nativo de forma simples
        if (avatarUrl) {
            formData.set('avatarUrl', avatarUrl)
        }

        const result = await updateProfile(formData)

        if (result.success) {
            toast.success('Perfil salvo com sucesso!')
        } else {
            toast.error(result.message || 'Erro ao salvar.')
        }

        setLoading(false)
    }

    return (
        <form action={handleSubmit} className="space-y-6 bg-white p-6 shadow-sm rounded-xl border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800">

            {/* Cabeçalho */}
            <div className="border-b border-gray-100 pb-4 mb-6 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Seus Dados</h3>
                <p className="text-sm text-gray-500">Mantenha suas informações atualizadas para que te encontrem.</p>
            </div>

            <div className="mb-6 flex justify-center">
                <AvatarUpload
                    url={initialData.avatar_url}
                    onUpload={(url) => setAvatarUrl(url)}
                />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Nome */}
                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nome Completo
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        defaultValue={initialData.full_name || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-white py-2 px-3 border"
                    />
                </div>

                {/* Telefone */}
                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        WhatsApp / Telefone
                    </label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="(00) 00000-0000"
                        defaultValue={initialData.phone || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-white py-2 px-3 border"
                    />
                </div>

                {/* Cidade */}
                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Cidade de Atuação
                    </label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Ex: São Paulo - SP"
                        defaultValue={initialData.city || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-white py-2 px-3 border"
                    />
                </div>
            </div>

            {/* Bio (Apenas Prestadores) */}
            {initialData.role === 'provider' && (
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Sobre Você (Bio)
                    </label>
                    <div className="mt-1">
                        <textarea
                            id="bio"
                            name="bio"
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-white py-2 px-3 border"
                            placeholder="Descreva sua experiência e especialidades..."
                            defaultValue={initialData.bio || ''}
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        Uma boa descrição aumenta suas chances de ser contratado.
                    </p>
                </div>
            )}

            {/* Botão Salvar */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                        <>
                            <Save className="mr-2 h-5 w-5" />
                            Salvar Alterações
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}
