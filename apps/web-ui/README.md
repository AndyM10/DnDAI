This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### DnDAI

This repo contains the source code the for the website [DnDAI](https://dnd-ai-pi.vercel.app/). This is built using NextJS (version 13) and typescript. 

Other technologies include tailwindcss (DaisyUi), Zod and Supabase. For Supabase access message Andrew.

## Getting Started

First you will need to create a `.env.local` with the following config.

```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL= /* Get these values from your Supabase account */
NEXT_PUBLIC_SUPABASE_ANON_KEY= /* Get these values from your Supabase account */
SUPABASE_SERVICE_ROLE_KEY= /* Get these values from your Supabase account */
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

## API

This project currently has two api routes `/api/generate` and `/api/save` these endpoints following the new NextJS 13 route handlers. 

For more information on route handlers check out the docs [here](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

#### Generate a new image 

<details>
 <summary><code>POST</code> <code><b>/</b></code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | `{"race":"dwarf","style":"hyperrealism","role":"sorcerer","story":""}`|


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | `{"code":"200", "message": "[{url: string}]"}`                      |
> | `400`         | `Zod Error`                       | `{"code":"400", "message": "<Zod Error>"}`                          |
> | `401`         | `text/html;charset=utf-8`         | `{"code":"401", "message": "No session found"}`                     |
> | `500`         | `text/html;charset=utf-8`         | `{"code":"500", "message": "OpenAI API error: ${statusText}"}`      |
> | `500`         | `text/html;charset=utf-8`         | `{"code":"500","message": "<Error>"}`                               |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data {"race":"dwarf","style":"hyperrealism","role":"sorcerer","story":""} http://localhost:3000/api/generate
> ```

</details>

#### Save the image

<details>
 <summary><code>POST</code> <code><b>/</b></code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                                                        |
> |-----------|-----------|-------------------------|----------------------------------------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | `{"image":"string","formData":{"race":"string","style":"string","role":"string","story":"string"}}`|


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | `{"code":"200"`                                                     |
> | `400`         | `Zod Error`                       | `{"code":"400", "message": "<Zod Error>"}`                          |
> | `401`         | `text/html;charset=utf-8`         | `{"code":"401", "message": "No session found"}`                     |
> | `500`         | `text/html;charset=utf-8`         | `{"code":"500","message": "<Error>"}`                               |
> | `500`         | `Storage Error`                   | `{"code":"500","message": "<Storage Error>"}`                       |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data {"image":"https://oaidalleapiprodscus.blob.core.windows.net/private/org-pfOsO9bhaTGQaHk8MeISw51w/user-OrKuGDFGPAe7Isecyhij1reB/img-vTep7g2XE14a0v7KtZoRvM1U.png?st=2023-08-14T19%3A39%3A09Z&se=2023-08-14T21%3A39%3A09Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-14T06%3A45%3A44Z&ske=2023-08-15T06%3A45%3A44Z&sks=b&skv=2021-08-06&sig=BJUJshMSPYceqkHW1YkmB9Y8vEyUltWTFLZhhAO%2BfoI%3D","formData":{"race":"dwarf","style":"hyperrealism","role":"sorcerer","story":""}} http://localhost:3000/api/save
> ```

</details>

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment on Vercel

This project is deployed on vercel, a live preview will be built for each branch pushed to this repo. 

Message Andrew for vercel access to this project.
