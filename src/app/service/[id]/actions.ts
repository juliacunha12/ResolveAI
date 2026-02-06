'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createReview(serviceId: string, rating: number, comment: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, message: 'Você precisa estar logado para avaliar.' }
    }

    // Verificar se o serviço é do próprio usuário (auto-avaliação)
    const { data: service } = await supabase.from('services').select('provider_id').eq('id', serviceId).single()

    if (service?.provider_id === user.id) {
        return { success: false, message: 'Você não pode avaliar seu próprio serviço.' }
    }

    const { error } = await supabase.from('reviews').insert({
        service_id: serviceId,
        user_id: user.id,
        rating,
        comment
    })

    if (error) {
        if (error.code === '23505') { // Code for Unique Violation
            return { success: false, message: 'Você já avaliou este serviço.' }
        }
        return { success: false, message: error.message }
    }

    revalidatePath(`/service/${serviceId}`)
    return { success: true, message: 'Avaliação enviada com sucesso!' }
}
