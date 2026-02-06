
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ProfileForm from './profile-form'
import DashboardReviews from './dashboard-reviews'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    const { data: servicesWithRatings } = await supabase
        .from('services')
        .select('*, service_ratings(average_rating, review_count)')
        .eq('provider_id', user.id)

    const totalReviews = servicesWithRatings?.reduce((acc, s) => acc + (s.service_ratings?.[0]?.review_count || 0), 0) || 0
    const weightedSum = servicesWithRatings?.reduce((acc, s) => {
        const rating = Number(s.service_ratings?.[0]?.average_rating) || 0
        const count = Number(s.service_ratings?.[0]?.review_count) || 0
        return acc + (rating * count)
    }, 0) || 0

    const overallAverage = totalReviews > 0 ? (weightedSum / totalReviews).toFixed(1) : '0.0'

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                    Meu Painel
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Gerencie seu perfil e visualize estatísticas.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <ProfileForm initialData={profile} />
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Status da Conta</h3>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                {profile.full_name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <p className="font-medium text-sm">{profile.full_name}</p>
                                <p className="text-sm text-gray-500 capitalize">{profile.role === 'provider' ? 'Prestador de Serviço' : 'Cliente'}</p>
                            </div>
                        </div>

                        {profile.role === 'provider' && (
                            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 dark:border-zinc-800">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-indigo-600">{overallAverage}</p>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Média Geral</p>
                                </div>
                                <div className="text-center border-l border-gray-100 dark:border-zinc-800">
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalReviews}</p>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Avaliações</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <DashboardReviews />
                </div>
            </div>
        </div>
    )
}
