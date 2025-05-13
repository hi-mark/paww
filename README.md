# 🐾 Paww - Fetch Frontend

Every team and developer have their own coding style and preferences, so if any part of my implementation doesn’t align with yours, just let me know—I’m happy to adjust and resubmit.

---

## Deployed At

[https://paww-drab.vercel.app](https://paww-drab.vercel.app)

---

## Run It Locally

1. **Clone** the repository
2. **Install** dependencies – `npm install`
3. **Create** an `.env` next to `next.config.*` with:

   ```env
   BASE_URL=https://frontend-take-home-service.fetch.com
   AUTH_COOKIE_NAME=fetch-access-token
   ```

4. **Start** the dev server – `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) and explore.

(Node 18+ recommended.)

---

## Time Breakdown

It was roughly work of 1.5 working day for me. Below is the rough allocation of hours. With time crunch I traded polish for progess at few spots. Using a coponent library would have helped and made things faster - lessons learnt.

| Task                             | Time Spent |
| -------------------------------- | ---------- |
| Requirement analysis             | \~30 min   |
| Basic Figma wireframe            | \~1.5 hr   |
| Core feature implementation      | \~8 hrs    |
| Proxy/auth, cleanup & deployment | \~3 hrs    |

---

## If I Had Another Day…

Given more time/in prod, I would have done many things next or differently including:

- **Tests, tests** – Jest unit tests and cypress end-to-end testing.
- **Better states** – skeleton loaders, toast errors, the good stuff.
- **Component Library** – I used vanilla CSS to showcase my understanding of CSS, but component library would speed up dev, make it more consistent and improve accessiblity.
- **API wrapper** – prolly create a fetch wrapper to do generics like header etc.
- **SSR** – see what all I can render server side.
- **Persist favourites** – localStorage or a api endpoint so we don't lose favorites on refresh.
- **State Management** – if app was any bigger than prolly use app wide state managemnt like context api

---

## Let’s Chat

I’m always up for feedback. Connect with me on [LinkedIn](https://www.linkedin.com/in/munish-kohar/) and let’s talk dogs, code, or your favourite beer.

_Thanks for reading._ 🐶
