
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-black">
            {/* Navbar Simplificada do Dashboard */}
            <nav className="border-b border-gray-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <Link href="/" className="text-xl font-bold text-indigo-600">
                        ResolveAI <span className="text-gray-500 font-normal text-sm">| Minha Conta</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/services" className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white">
                            Gerenciar Serviços
                        </Link>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Olá, {profile?.full_name}</span>
                        <form action="/auth/signout" method="post">
                            <button className="text-sm font-medium text-red-600 hover:text-red-500">
                                Sair
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            {/* Conteúdo Principal */}
            <main className="mx-auto w-full max-w-7xl p-6">
                {children}
            </main>
        </div>
    )
}
