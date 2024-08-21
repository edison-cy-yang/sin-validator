This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

```
npm install
```

To run the development server:

```
npm run dev
```

To run production build:

```
npm run build
```

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Assumptions

- Users can enter spaces in the SIN - spaces are ignored
- We want to tell users why the SIN is invalid, incorrect number of characters, SIN contains non-numbers, or SIN didn't pass Luhn algorithm (no error detail for this one)

### Approach

This was my first Next.js project. I picked the latest version 14 and app routes with api routing. Experimented with Tailwind and Daisy UI as well.\
`isValid` boolean and `error` message are provided in the validateSIN method, which is stored in utils folder.\
Typescript alias is used for components and utils folders.\
The validator function first checks if the input has 9 characters and are numbers, then Luhn algorithm is implemented to check for SIN validity\
Some component states were added to help with user experience.
