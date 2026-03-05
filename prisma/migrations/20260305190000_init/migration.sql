-- Create users table
CREATE TABLE "user" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL
);

-- Unique index for email
CREATE UNIQUE INDEX "users_email_key" ON "user"("email");


-- Create posts table
CREATE TABLE "posts" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "author" TEXT NOT NULL,
  "excerpt" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "cover_image_url" TEXT NOT NULL,
  "published" BOOLEAN NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Unique index for slug
CREATE UNIQUE INDEX "posts_slug_unique" ON "posts"("slug");

INSERT INTO "posts" (
  "id",
  "slug",
  "title",
  "author",
  "excerpt",
  "content",
  "cover_image_url",
  "published",
  "created_at",
  "updated_at"
) VALUES
(
'99f8add4-7684-4c16-a316-616271db199e',
'rotina-matinal-de-pessoas-altamente-eficazes',
'Rotina matinal de pessoas altamente eficazes',
'Isabela Nunes',
'O Next.js também é uma boa escolha para quem quer se preocupar com performance e SEO.',
'O Next.js também é uma boa escolha para quem quer se preocupar com performance e SEO.',
'/images/bryen_8.png',
true,
'2025-04-08T00:24:38.616Z',
'2025-04-08T00:33:56.907Z'
),
(
'afa086e4-53e4-492d-acf2-7c2966d83fcd',
'dicas-para-manter-a-saude-mental-em-dia',
'Dicas para manter a saúde mental em dia',
'Marina Duarte',
'Em vez de configurar tudo manualmente, basta criar um arquivo com o nome certo e o Next.js entende que aquilo representa uma página.',
'Em vez de configurar tudo manualmente, basta criar um arquivo com o nome certo e o Next.js entende que aquilo representa uma página.',
'/images/bryen_6.png',
true,
'2025-04-07T00:24:38.616Z',
'2025-04-07T00:33:56.907Z'
),
(
'1b6a5f57-8a19-4933-91f4-1af678464ded',
'como-a-escrita-pode-mudar-sua-carreira',
'Como a escrita pode mudar sua carreira',
'Pedro Martins',
'Muitas empresas e desenvolvedores individuais escolhem o Next.js justamente porque ele consegue unir simplicidade com recursos avançados.',
'Muitas empresas e desenvolvedores individuais escolhem o Next.js justamente porque ele consegue unir simplicidade com recursos avançados.',
'/images/bryen_9.png',
true,
'2025-04-06T00:24:38.616Z',
'2025-04-06T00:33:56.907Z'
);
