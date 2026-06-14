# Sistema de Autenticação e Gestão de Usuários

Este projeto é uma aplicação web completa de autenticação, desenvolvida para gerenciar o cadastro e o acesso de usuários de forma segura e intuitiva. O sistema foca em uma experiência de usuário (UX) fluida, com validações em tempo real e feedback visual imediato.

## 🚀 Tecnologias Utilizadas

* **Front-end:** HTML5, CSS3 e JavaScript (ESModules).
* **Back-end & Nuvem:** [Firebase Authentication](https://firebase.google.com/docs/auth) e [Cloud Firestore](https://firebase.google.com/docs/firestore).
* **Design:** UI responsiva e moderna com CSS puro, utilizando variáveis CSS para manutenção facilitada.

## 📋 Funcionalidades Principais

* **Autenticação Segura:** Implementação de login e cadastro integrados ao Firebase Auth.
* **Validação de Formulários:** Verificação de dados em tempo real (e-mail, senha, CPF, nome e campos obrigatórios) com mensagens de erro dinâmicas.
* **Persistência de Dados:** Armazenamento estruturado de perfis de usuário no Cloud Firestore.
* **UX/UI Aprimorada:**
    * Design moderno e responsivo.
    * Tratamento de erros que orienta o usuário em vez de apenas alertar.
    * Mensagens de sucesso com redirecionamento automático.
    * Proteção contra entradas inválidas (ex: CPF somente com números).

## 📂 Estrutura do Projeto

* `index.html`: Página principal de login.
* `cadastro.html`: Formulário de criação de nova conta.
* `home.html`: Dashboard do sistema após o login.
* `style.css`: Estilização completa e responsiva.
* `script.js`: Toda a lógica de integração com Firebase e validações do sistema.

## 🌐 Demonstração Online

Acesse o sistema em produção: 
https://sistema-login-d0f98.web.app/

---

## 🛠️ Como rodar o projeto localmente

1. Clone este repositório:
   ```bash
   git clone https://github.com/adrianebernardo/sistema-de-login.git
