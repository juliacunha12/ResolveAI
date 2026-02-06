'use client'

import { useState } from 'react'
import { login, signup } from './actions'
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)

    // Função auxiliar para lidar com o envio e mostrar loading
    const handleSubmit = async (formData: FormData) => {
        setLoading(true)
        // Chamamos a Server Action apropriada
        const action = isLogin ? login : signup
        const result = await action(formData)

        // Se a action retornar algo (erro), paramos o loading
        if (result?.success === false) {
            toast.error(result.message)
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="text-center">
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {isLogin
                        ? 'Entre para gerenciar seus serviços'
                        : 'Comece a usar o ResolveAI hoje mesmo'}
                </p>
            </div>

            <form action={handleSubmit} className="mt-8 space-y-6">
                <div className="-space-y-px rounded-md shadow-sm">
                    {/* Nome (Apenas Cadastro) */}
                    {!isLogin && (
                        <div className="relative mb-4">
                            <label htmlFor="fullName" className="sr-only">Nome Completo</label>
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required={!isLogin}
                                className="block w-full rounded-lg border-0 bg-gray-50 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:ring-zinc-700 dark:text-white dark:placeholder-gray-500"
                                placeholder="Nome Completo"
                            />
                        </div>
                    )}

                    {/* Email */}
                    <div className="relative mb-4">
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-lg border-0 bg-gray-50 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:ring-zinc-700 dark:text-white dark:placeholder-gray-500"
                            placeholder="Email"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative mb-4">
                        <label htmlFor="password" className="sr-only">Senha</label>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            minLength={6}
                            className="block w-full rounded-lg border-0 bg-gray-50 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:ring-zinc-700 dark:text-white dark:placeholder-gray-500"
                            placeholder="Senha"
                        />
                    </div>

                    {/* Role Selection (Apenas Cadastro) */}
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                Como você quer usar a plataforma?
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="radio"
                                        id="client"
                                        name="role"
                                        value="client"
                                        defaultChecked
                                        className="peer hidden"
                                    />
                                    <label
                                        htmlFor="client"
                                        className="block cursor-pointer rounded-lg border border-gray-200 bg-white p-4 text-center text-sm font-medium text-gray-500 hover:bg-gray-50 peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:peer-checked:border-indigo-500 dark:peer-checked:bg-indigo-900/20 dark:peer-checked:text-indigo-400"
                                    >
                                        Buscar Serviços
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="provider"
                                        name="role"
                                        value="provider"
                                        className="peer hidden"
                                    />
                                    <label
                                        htmlFor="provider"
                                        className="block cursor-pointer rounded-lg border border-gray-200 bg-white p-4 text-center text-sm font-medium text-gray-500 hover:bg-gray-50 peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:peer-checked:border-indigo-500 dark:peer-checked:bg-indigo-900/20 dark:peer-checked:text-indigo-400"
                                    >
                                        Oferecer Serviços
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                            <>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    {/* Icon placeholder if needed */}
                                </span>
                                {isLogin ? 'Entrar' : 'Criar Conta'} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </div>

                {!isLogin && (
                    <div className="rounded-lg bg-amber-50 p-4 border border-amber-200 dark:bg-amber-900/10 dark:border-amber-900/30">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <Mail className="h-5 w-5 text-amber-600 dark:text-amber-500" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-amber-800 dark:text-amber-400">Verifique seu email</h3>
                                <div className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                                    <p>
                                        Enviaremos um link de confirmação. 👋
                                        <strong> Importante:</strong> Caso não encontre, verifique sua pasta de <strong>Spam</strong> ou <strong>Lixo Eletrônico</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>

            <div className="text-center text-sm">
                <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                    {isLogin
                        ? 'Ainda não tem conta? Crie agora'
                        : 'Já tem uma conta? Faça login'}
                </button>
            </div>
        </div>
    )
}
