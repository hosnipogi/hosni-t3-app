# Hosni Demo T3 App

- Built with [Create T3 App](https://create.t3.gg/)
- DB handled by [Prisma](https://www.prisma.io/) and currently hosted on [PlanetScale](https://planetscale.com/)
- App is hosted on [Vercel](https://vercel.com/)

## Instructions

1. Clone the repository
2. Install dependencies

```shell
$ yarn install
```

3. Copy and update the `env` file as necessary

```shell
$ cp .env.example .env
```

4. Update [prisma schema](./prisma/schema.prisma) datasource as necessary
5. Migrate or push the schema to db

```shell
$ yarn prisma db push
```

or

```shell
$ yarn prisma migrate dev
```

The command will push the schema to your preferred database, generate the **initial Category Seeds** and will generate the prisma-client instance

6. Build and start the the app

```shell
$ yarn build && yarn start
```

## Authentication

1. Authentication is handled by [Next-Auth](https://next-auth.js.org/). For demo purposes, i've only setup a [Credentials Provider](https://next-auth.js.org/providers/credentials), you can put any random Email.
