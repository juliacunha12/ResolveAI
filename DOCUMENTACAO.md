# 📄 Documentação Técnica — ResolveAI

O **ResolveAI** é uma plataforma moderna projetada para conectar prestadores de serviços a clientes de forma direta, rápida e profissional. Este documento detalha a arquitetura, as tecnologias e as funcionalidades do sistema.

---

## 🛠️ Stack Tecnológica

O projeto utiliza as ferramentas mais modernas do ecossistema Web para garantir performance, escalabilidade e uma experiência de usuário premium.

### **Frontend & Framework**
- **Next.js 15 (App Router)**: Framework React para aplicações full-stack, utilizando Server Components para velocidade e Client Components para interatividade.
- **React 19**: Biblioteca base para construção da interface.
- **TypeScript**: Garantia de tipagem estática, reduzindo bugs e melhorando a manutenção.

### **Estilização & Design**
- **Tailwind CSS v4**: Utilizado para um design system baseado em utilitários, com variáveis CSS modernas e suporte nativo a Dark Mode.
- **Lucide React**: Biblioteca de ícones elegantes e consistentes.
- **Sonner**: Sistema de notificações (Toasts) para feedback imediato ao usuário.

### **Backend & Banco de Dados**
- **Supabase (PostgreSQL)**: Backend-as-a-Service que fornece:
  - **Banco de Dados**: PostgreSQL relacional.
  - **Auth**: Sistema de login por email e senha.
  - **Storage**: Armazenamento de imagens (avatares e fotos de serviços).
  - **RLS (Row Level Security)**: Segurança avançada direto no banco para proteger os dados.

---

## 📊 Arquitetura de Dados

O banco de dados está estruturado em três tabelas principais:

1.  **`profiles`**: Armazena informações dos usuários.
    - `id`, `full_name`, `avatar_url`, `bio`, `phone`, `city`, `role` (Prestador ou Cliente).
2.  **`services`**: Armazena os anúncios publicados.
    - `id`, `title`, `price`, `category`, `description`, `image_url`, `provider_id` (vinculado ao perfil).
3.  **`reviews`**: Armazena as avaliações dos clientes.
    - `id`, `service_id`, `rating` (1 a 5), `comment`, `user_id`.

---

## 🚀 Funcionalidades Principais

### **1. Descoberta de Serviços**
- **Busca Pública**: Usuários podem buscar profissionais sem precisar de login.
- **Filtros Inteligentes**: Filtragem por categoria (Limpeza, Manutenção, Aulas, etc.) e pesquisa por texto no título.
- **SEO Dinâmico**: Cada serviço possui metadados únicos, facilitando o compartilhamento em redes sociais e indexação no Google.

### **2. Painel do Profissional (Dashboard)**
- **Gestão de Perfil**: Edição de dados de contato, localização e biografia profissional.
- **Upload de Imagens**: Integração com Supabase Storage para fotos de perfil e anúncios.
- **Estatísticas**: Visualização da média de avaliações e total de recomendações recebidas.

### **3. Gestão de Anúncios (CRUD)**
- **Publicação**: Criação de novos serviços com preço, categoria e foto.
- **Edição**: Alteração de informações em tempo real.
- **Exclusão**: Remoção segura de anúncios com confirmação visual.

### **4. Interatividade & Conversão**
- **Sistema de Avaliações**: Clientes logados podem deixar notas e comentários.
- **Integração com WhatsApp**: Botão direto que abre o chat com o prestador já com uma mensagem pré-preenchida sobre o serviço.

### **5. UI/UX Professionalism**
- **Micro-animações**: Transições de Fade-in para uma navegação fluida.
- **Dark Mode Nativo**: Interface que se adapta automaticamente à preferência do sistema do usuário.
- **Feedback Elegante**: Substituição de alertas do sistema por Toasts estilizados.

---

## 💻 Como Rodar o Projeto

1.  **Instalar Dependências**: `npm install`
2.  **Configurar Banco de Dados**:
    - Execute o script consolidado em `supabase/setup.sql` no painel do Supabase.
    - Crie os Storage Buckets `avatars` e `service-images` como públicos.
3.  **Configurar Variáveis (`.env.local`)**:
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4.  **Rodar o modo Desenvolvimento**: `npm run dev`
5.  **Build de Produção**: `npm run build`

---

> [!TIP]
> O projeto foi otimizado para deploy na **Vercel**, utilizando integração contínua com Git para atualizações automáticas.
