'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const full_name = formData.get('fullName') as string
    const bio = formData.get('bio') as string
    const phone = formData.get('phone') as string
    const city = formData.get('city') as string
    const avatar_url = formData.get('avatarUrl') as string

    // Atualizar apenas os campos permitidos
    const { error } = await supabase
        .from('profiles')
        .update({
            full_name,
            bio,
            phone,
            city,
            avatar_url,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

    if (error) {
        return { success: false, message: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true, message: 'Perfil atualizado com sucesso!' }
}

export async function replyToReview(reviewId: string, reply: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, message: 'Não autorizado.' }
    }

    // Verificar se o usuário é o dono do serviço que recebeu a avaliação
    const { data: review } = await supabase
        .from('reviews')
        .select('*, services(provider_id)')
        .eq('id', reviewId)
        .single()

    if (!review || (review.services as any).provider_id !== user.id) {
        return { success: false, message: 'Você só pode responder avaliações dos seus próprios serviços.' }
    }

    const { error } = await supabase
        .from('reviews')
        .update({
            reply,
            replied_at: new Date().toISOString()
        })
        .eq('id', reviewId)

    if (error) return { success: false, message: error.message }

    revalidatePath('/dashboard')
    revalidatePath(`/service/${review.service_id}`)
    return { success: true, message: 'Resposta enviada!' }
}
