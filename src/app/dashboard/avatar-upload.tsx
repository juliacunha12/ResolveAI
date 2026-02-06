'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Camera, Loader2, X } from 'lucide-react'
import Image from 'next/image'

interface AvatarUploadProps {
    url: string | null
    onUpload: (url: string) => void
}

export default function AvatarUpload({ url, onUpload }: AvatarUploadProps) {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
    const [uploading, setUploading] = useState(false)
    const supabase = createClient()

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('Você deve selecionar uma imagem para upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}` // Nome único simples
            const filePath = `${fileName}`

            // Upload para o Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('avatars') // Certifique-se que este bucket existe!
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            // Pegar a URL pública
            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)

            setAvatarUrl(data.publicUrl)
            onUpload(data.publicUrl) // Avisa o pai que mudou

        } catch (error: any) {
            alert('Erro no upload: ' + error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-gray-200 dark:border-zinc-700">
                {avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt="Avatar"
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-zinc-800 text-gray-400">
                        <Camera className="h-10 w-10" />
                    </div>
                )}

                {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                    </div>
                )}
            </div>

            <div className="relative">
                <input
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <label
                    htmlFor="single"
                    className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-zinc-800 dark:text-white dark:ring-zinc-700 dark:hover:bg-zinc-700"
                >
                    {uploading ? 'Enviando...' : 'Alterar Foto'}
                </label>
            </div>
        </div>
    )
}
