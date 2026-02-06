
import NewServiceForm from '../new-service-form'
import { redirect } from 'next/navigation'

export default function NewServicePage() {

    async function handleSuccess() {
        'use server'
        redirect('/dashboard/services')
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Criar Novo Serviço</h1>
            <div className="bg-white p-6 rounded-xl border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
                <NewServiceForm onSuccess={handleSuccess} />
            </div>
        </div>
    )
}
