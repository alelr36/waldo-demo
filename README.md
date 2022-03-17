# Demo project for Waldo

## Summary

This project was built based on the functionality required by Waldo's challenge.
The tools used are:
- TypeScript
- React
- GraphQL
- Apollo Client

## Instructions

1. Clone the repo `git clone https://github.com/alelr36/waldo-demo.git`
2. `cd` into repo dir `cd waldo-demo`
3. Install dependencies `npm install`
4. Run the project `npm start`
5. Wait until the local url is available `http://localhost:3000/`

## Out of Scope

1. Styles: Veri basic styles are included. They were just added in order to provide a better usage, pointing the selected pizza, adding some margins / paddings and ordering blocks through inline / inline-block. A more detailed analysis should be done over the HTML structure and then decide what to do with styles. CSS-in-JS is a good option.
2. Typescript: A command is present in package.json, this command looks into the schema (downloaded into the project), and generates types automatically based on the queries that are detected. These types are included under __generated__ folders. Also, a few `//@ts-igonre` statements were added in the code in order to respect time limit.
3. Tests: Unit tests are a common practice, with lots of tools and solutions already present in the community. No test was added under this challenge, in favor of time. Jest + Jasmine could be a good strategy.
