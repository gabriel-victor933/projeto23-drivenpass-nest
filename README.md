## Driven Pass:

* Navegar na internet pode ser uma atividade muito divertida, mas ao mesmo tempo, muito perigosa. Inúmeros estudos e levantamentos (nacionais e internacionais) mostram que o número de golpes virtuais não param de crescer. O que levanta a questão: como nos proteger?

* Existem várias formas diferentes. Tudo começa com o uso de senhas diferentes e seguras. Para uma senha ser segura, ela deve conter vários caracteres e números misturados, sem contar que o quanto mais longa ela for, melhor.

* Só que como vamos memorizar senhas gigantes e sem significado semântico? É para resolver essa dor que os gerenciadores de senhas surgiram! Com eles, criamos apenas uma senha “mestra” e todas as outras senhas ficam gravadas em segredo! Logo, quando precisamos dela, basta lembrar da senha “mestra” (que obviamente também precisa ser segura)!

## Resumo das Funcionalidades

#### Cadastro de Usuário:

- Permite que os usuários se cadastrem na plataforma.
- Os usuários recebem credenciais de acesso únicas após o cadastro.
#### Armazenamento de Senhas:

- Capacidade de armazenar diferentes tipos de senhas, incluindo credenciais de sites, notas seguras, informações de cartões e senhas de Wi-Fi.

#### Visualização por Tipo:

- Os usuários podem visualizar todas as suas senhas categorizadas por tipo (sites, notas, cartões, Wi-Fi).
- Facilita a organização e acesso rápido às informações desejadas.
#### Visualização Individual de Senha:

- Os usuários têm a opção de visualizar detalhes de uma senha específica.
- Fornece uma visão detalhada das informações armazenadas para cada senha.
#### Gerenciamento de Senhas:

- Os usuários podem adicionar novas senhas ou remover senhas existentes conforme necessário.
- Flexibilidade para adaptar o gerenciamento de senhas de acordo com as preferências do usuário.
#### JWT para Autenticação:

- Utiliza JSON Web Tokens (JWT) para autenticação de usuários.
- Oferece uma forma segura de armazenar informações de sessão do usuário.
#### Criptografia de Dados Sensíveis:

- Todos os dados sensíveis, como senhas e informações de conta, são criptografados antes de serem armazenados.
- Reforça a segurança e protege as informações confidenciais dos usuários.
#### Exclusão de Conta:

- Permite que os usuários excluam suas contas, removendo todas as informações associadas.
- Garante um processo seguro e eficiente para encerrar a participação na plataforma.

#### Teste de Integração:

- Testes simulam operações reais, assegurando a integridade do fluxo de dados e a consistência das funcionalidades.
- Contribui para a confiabilidade e estabilidade do sistema, minimizando erros e falhas durante o uso.

## Tecnologias 
[![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)]()
[![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)]()
[![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)]()
[![](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)]()
[![](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)]()
[![](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)]()
[![](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)]()

## Como Rodar
1. Clone esse repositório;
2. Crie uma arquivo `.env` e insera as seguintes variavéis;
```
DATABASE_URL = "postgres://user:password@host:port/db_name?schema=public"
PORT = 3000
```
3. Instale as dependências:
```
npm i
```
3. Execute as migrações no banco de dados usando:
```
npm run migrate:dev
```
3. Execute o projeto em desenvolvimento usando:
```
npm run start

