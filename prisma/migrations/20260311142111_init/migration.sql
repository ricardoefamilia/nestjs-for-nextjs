-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "forceLogout" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "cover_image_url" TEXT,
    "published" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_unique" ON "posts"("slug");
CREATE INDEX "posts_author_idx" ON "posts"("author_id");
CREATE INDEX "posts_created_at_idx" ON "posts"("created_at" DESC);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Seed Users
INSERT INTO "user" (
  "id",
  "name",
  "email",
  "password",
  "createdAt",
  "updatedAt"
) VALUES
(
'cefaf36c-0195-4d39-b064-765f36d70f71',
'Ricardo Amaral',
'ricardo@email.com',
'$2b$10$FTymjdNUzfomTIp71SnCSOKcobGLwsgRxJsUxJDTVxluYRGUoMzpu',
'2026-03-11T13:45:27.408Z',
'2026-03-11T13:45:27.408Z'
),
(
'655f3c79-e555-4969-b82f-3a3c886eb084',
'Danilo',
'danilo@email.com',
'$2b$10$oF41NEW1Gc9UiGk0H0EVVu9w138IMH7uqds9My5wBOv5yf6Z/nub6',
'2026-03-11T13:46:16.596Z',
'2026-03-11T13:46:16.596Z'
);


-- Seed Posts
INSERT INTO "posts" (
  "id",
  "slug",
  "title",
  "excerpt",
  "content",
  "cover_image_url",
  "published",
  "created_at",
  "updated_at",
  "author_id"
) VALUES
(
'99f8add4-7684-4c16-a316-616271db199e',
'rotina-matinal-de-pessoas-altamente-eficazes',
'Rotina matinal de pessoas altamente eficazes',
'O Next.js também é uma boa escolha para quem quer se preocupar com performance e SEO.',
'O Next.js também é uma boa escolha para quem quer se preocupar com performance e SEO.',
'/images/bryen_8.png',
true,
'2025-04-08T00:24:38.616Z',
'2025-04-08T00:33:56.907Z',
'cefaf36c-0195-4d39-b064-765f36d70f71'
),
(
'afa086e4-53e4-492d-acf2-7c2966d83fcd',
'dicas-para-manter-a-saude-mental-em-dia',
'Dicas para manter a saúde mental em dia',
'Em vez de configurar tudo manualmente, basta criar um arquivo com o nome certo e o Next.js entende que aquilo representa uma página.',
'Em vez de configurar tudo manualmente, basta criar um arquivo com o nome certo e o Next.js entende que aquilo representa uma página.',
'/images/bryen_6.png',
true,
'2025-04-07T00:24:38.616Z',
'2025-04-07T00:33:56.907Z',
'655f3c79-e555-4969-b82f-3a3c886eb084'
),
(
'1b6a5f57-8a19-4933-91f4-1af678464ded',
'como-a-escrita-pode-mudar-sua-carreira',
'Como a escrita pode mudar sua carreira',
'Muitas empresas e desenvolvedores individuais escolhem o Next.js justamente porque ele consegue unir simplicidade com recursos avançados.',
'Muitas empresas e desenvolvedores individuais escolhem o Next.js justamente porque ele consegue unir simplicidade com recursos avançados.',
'/images/bryen_9.png',
true,
'2025-04-06T00:24:38.616Z',
'2025-04-06T00:33:56.907Z',
'cefaf36c-0195-4d39-b064-765f36d70f71'
);
