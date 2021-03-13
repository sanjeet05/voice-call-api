# Express Node REST API Boilerplate

## Requirements

 - [Node v10.0+](https://nodejs.org/en/download/current/)
 - [Postres](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04/)

## Getting Started

Install dependencies:

```bash
npm install
```

Set environment variables:

```bash
cp .env.example .env
```

## Running migrations

```bash
NODE_ENV=development node migrations/voice_table.js create
```

## Running Locally

```bash
npm run dev
```

## Running in Production

```bash
npm run start
OR
npm run prod
```

## Logs

```bash
# show logs in production
pm2 logs
```