'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // Pegamos os valores dos inputs pelo "name" definido no HTML
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        // Em um app real, retornaríamos o erro para mostrar na tela.
        // Por enquanto, vamos redirecionar para uma página de erro ou logar.
        return { success: false, message: error.message }
    }

    // Se deu certo, revalidamos o cache e redirecionamos
    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Dados extras para o nosso perfil
    const fullName = formData.get('fullName') as string
    const role = formData.get('role') as string // 'client' ou 'provider'

    const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
            // Aqui passamos metadados que serão salvos no usuário
            data: {
                full_name: fullName,
                role: role,
            },
        },
    })

    if (error) {
        return { success: false, message: error.message }
    }

    revalidatePath('/', 'layout')

    // Se exigirmos confirmação de email, avisamos o usuário
    // redirect('/verify-email') 
    redirect('/')
}
