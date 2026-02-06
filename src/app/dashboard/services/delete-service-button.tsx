'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'
import { deleteService } from './actions'
import { toast } from 'sonner'

export default function DeleteServiceButton({ serviceId }: { serviceId: string }) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDelete() {
        if (!confirm('Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.')) {
            return
        }

        setIsDeleting(true)

        try {
            const result = await deleteService(serviceId)

            if (!result.success) {
                toast.error(result.message)
            } else {
                toast.success('Serviço excluído com sucesso!')
                // Usamos reload para garantir que a lista seja atualizada do zero e o estado do botão resetado
                window.location.reload()
                return // O reload vai desmontar o componente, não precisamos de setIsDeleting(false) aqui
            }
        } catch (error) {
            console.error('❌ [BUTTON] Erro não tratado na chamada da Action:', error)
            toast.error('Erro inesperado ao excluir serviço.')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
            title="Excluir serviço"
        >
            {isDeleting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                <Trash2 className="h-5 w-5" />
            )}
        </button>
    )
}
