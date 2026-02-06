'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createService(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Not authenticated')

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const category = formData.get('category') as string
    const image_url = formData.get('imageUrl') as string

    const { error } = await supabase.from('services').insert({
        title,
        description,
        price,
        category,
        image_url,
        provider_id: user.id
    })

    if (error) return { success: false, message: error.message }

    revalidatePath('/dashboard/services')
    revalidatePath('/')
    revalidatePath('/search')
    return { success: true, message: 'Serviço criado!' }
}

export async function updateService(serviceId: string, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Not authenticated')

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const category = formData.get('category') as string
    const image_url = formData.get('imageUrl') as string

    const { error } = await supabase
        .from('services')
        .update({
            title,
            description,
            price,
            category,
            image_url,
        })
        .eq('id', serviceId)
        .eq('provider_id', user.id)

    if (error) return { success: false, message: error.message }

    revalidatePath('/dashboard/services')
    revalidatePath(`/service/${serviceId}`)
    revalidatePath('/')
    revalidatePath('/search')
    return { success: true, message: 'Serviço atualizado!' }
}

export async function deleteService(serviceId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, message: 'Você precisa estar logado para excluir um serviço.' }
    }

    const { error, data } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId)
        .eq('provider_id', user.id)
        .select()

    if (error) {
        return { success: false, message: `Erro no banco de dados: ${error.message}` }
    }

    revalidatePath('/dashboard/services')
    return { success: true, message: 'Serviço excluído com sucesso!' }
}
