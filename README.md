This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### DnDAI

This repo contains the source code the for the website [DnDAI](https://dnd-ai-pi.vercel.app/). This is built using NextJS (version 13) and typescript. 

Other technologies include tailwindcss (DaisyUi), Zod and Supabase. For Supabase access message Andrew.

## Getting Started

First you will need to create a `.env.local` with the following config.

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SUPABASE_URL= /* Get these values from your Supabase account */
NEXT_PUBLIC_SUPABASE_ANON_KEY= /* Get these values from your Supabase account */
NEXT_PUBLIC_OPEN_AI_KEY= /* Get this from Andrew */
```

Once this has been done, next is to install all the dependencies this project uses pnpm if you do not have this installed find these instructions [here](https://pnpm.io/installation)

This repo is also built using Node version 19, please make sure you are using the correct version when installing dependencies. 

```bash
pnpm install
```

You can now run the development server using

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the pages, The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment on Vercel

This project is deployed on vercel, a live preview will be built for each branch pushed to this repo. 

Message Andrew for vercel access to this project.
