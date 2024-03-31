## Getting Started

You need docker for db, or provide a valid postgresql connection url from neon.tech, supabase or private db.

### For Development Mode

First, install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### For Production Mode

First you need to install ngrok or cloudflare tunnels for uploadthing because uploadthing uses callbacks and it needs a accessible url from internet. And ngrok provides this url.
change UPLOADTHING_URL with your ngrok url, it's a example url and will not work in your system.
then use the following commands

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun run start
```
