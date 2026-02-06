
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Trash2, Pencil } from 'lucide-react'
import NewServiceForm from './new-service-form'
import { deleteService } from './actions'
import DeleteServiceButton from './delete-service-button'

export default async function ServicesPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: services } = await supabase
        .from('services')
        .select('*')
        .eq('provider_id', user?.id)
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Meus Serviços</h1>
                <Link
                    href="/dashboard/services/new"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                    Novo Serviço
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services?.map((service) => (
                    <div key={service.id} className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        {service.image_url && (
                            <img src={service.image_url} alt={service.title} className="h-32 w-full object-cover rounded-md mb-4" />
                        )}
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{service.title}</h3>
                        <p className="text-sm text-gray-500">{service.category} • R$ {service.price}</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <Link
                                href={`/dashboard/services/edit/${service.id}`}
                                className="text-gray-500 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-50 transition-colors"
                                title="Editar serviço"
                            >
                                <Pencil className="h-5 w-5" />
                            </Link>
                            <DeleteServiceButton serviceId={service.id} />
                        </div>
                    </div>
                ))}
                {services?.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500">
                        Você ainda não tem nenhum serviço cadastrado.
                    </div>
                )}
            </div>
        </div>
    )
}
