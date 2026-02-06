
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import EditServiceForm from '../../edit-service-form'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface EditPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditServicePage({ params }: EditPageProps) {
    const supabase = await createClient()
    const { id } = await params

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: service } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .eq('provider_id', user.id)
        .single()

    if (!service) notFound()

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <header className="flex items-center gap-4">
                <Link href="/dashboard/services" className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-zinc-800 transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Editar Serviço</h1>
                    <p className="text-sm text-gray-500">Atualize as informações do seu anúncio.</p>
                </div>
            </header>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
                <EditServiceForm service={service} />
            </div>
        </div>
    )
}
