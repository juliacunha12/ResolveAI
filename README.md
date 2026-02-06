# ResolveAI 🚀 — Conectando Profissionais e Clientes 

O **ResolveAI** é uma plataforma full-stack moderna e de alta performance, desenvolvida para facilitar a conexão entre prestadores de serviços e clientes. O projeto foca em uma experiência de usuário (UX) premium, design minimalista e SEO otimizado.

---

## 🌐 Demonstração
> [!IMPORTANT]
> **Link do Projeto:** [Acesse o ResolveAI aqui](https://resolve-ai-kohl.vercel.app/)

---

## ✨ Principais Funcionalidades

### Para Clientes 🔍
- **Busca Global**: Encontre serviços por palavra-chave ou categoria (Limpeza, Aulas, Manutenção, etc).
- **SEO Amigável**: Cada serviço possui URLs e metadados dedicados para fácil descoberta e compartilhamento.
- **Avaliações**: Deixe feedback e notas para os profissionais contratados.
- **Contato Direto**: Botão de integração direta com WhatsApp para agendamento rápido.

### Para Prestadores 💼
- **Dashboard Profissional**: Gerencie sua presença com estatísticas de avaliações.
- **Gestão de Anúncios**: Crie, edite e remova seus serviços com facilidade.
- **Perfil Personalizado**: Adicione bio, foto de perfil e localização.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
| :--- | :--- |
| **Frontend** | [Next.js 15 (App Router)](https://nextjs.org/) |
| **Linguagem** | [TypeScript](https://www.typescriptlang.org/) |
| **Estilização** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Banco de Dados** | [PostgreSQL (Supabase)](https://supabase.com/) |
| **Autenticação** | [Supabase Auth](https://supabase.com/auth) |
| **Storage** | [Supabase Storage](https://supabase.com/storage) |
| **UX/UI** | [Lucide Icons](https://lucide.dev/), [Sonner Toasts](https://sonner.stevenly.me/) |

---

## 📈 Diferenciais Técnicos

- **Design Premium**: Interface adaptativa (Light/Dark Mode) com foco em estética minimalista e profissional.
- **Performance**: Uso de React Server Components para carregamento instantâneo.
- **Segurança**: Políticas de RLS (Row Level Security) garantindo que apenas donos de serviços possam editá-los.
- **Micro-animações**: Transições suaves para uma navegação fluida.

---

## 🚀 Como Executar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/juliacunha12/ResolveAI.git
   cd resolveai
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o Banco de Dados (Supabase):**
   - No Dashboard do Supabase, vá em **SQL Editor**.
   - Copie e cole o conteúdo do arquivo `supabase/setup.sql` e clique em **Run**.
   - Certifique-se de criar os Buckets `avatars` e `service-images` na aba **Storage** e deixá-los como **Públicos**.

4. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env.local` na raiz e adicione suas chaves do Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=seu_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

Feito com 💜 para facilitar conexões profissionais.
