import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { describe } from "node:test";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
  Dish: a.model({
    id: a.id().required(),
    userId: a.id().required(),
    name: a.string().required(),
    description: a.string(),
    price: a.float(),
    imageUrl: a.string(),
    submenus: a.hasMany("SubmenuDish","dishId")
  })
  .authorization((allow) => [
    allow.publicApiKey().to(['read']),
    allow.owner(),
  ]),
  Drink: a
  .model({
    id: a.id().required(),
    userId: a.id().required(),
    name: a.string().required(),
    description: a.string(),
    alcohol: a.boolean().default(false),
    price: a.float(),
    imageUrl: a.string(),
    submenus: a.hasMany("SubmenuDrink","drinkId")
  })
  .authorization((allow) => [
    allow.publicApiKey().to(['read']),
    allow.owner(),
  ]),
  Side: a
  .model({
    id: a.id().required(),
    userId: a.id().required(),
    name: a.string().required(),
    description: a.string(),
    price: a.float(),
    imageUrl: a.string(),
    submenus: a.hasMany("SubmenuSide","sideId")
  })
  .authorization((allow) => [
    allow.publicApiKey().to(['read']),
    allow.owner(),
  ]),
  Submenu: a
  .model({
    id: a.id().required(),
    userId: a.id().required(),
    title: a.string().required(),
    description: a.string(),
    imageUrl: a.string(),
    menus: a.hasMany("MenuSubmenu","submenuId"),
    dishs: a.hasMany("SubmenuDish","submenuId"),
    sides: a.hasMany("SubmenuSide","submenuId"),
    drinks: a.hasMany("SubmenuDrink","submenuId")
  })
  .authorization((allow) => [
    allow.publicApiKey().to(['read']),
    allow.owner(),
  ]),
  Menu: a
  .model({
    id: a.id().required(),
    userId: a.id().required(),
    title: a.string().required(),
    description: a.string(),
    imageUrl: a.string(),
    submenus: a.hasMany("MenuSubmenu", "menuId")
  })
  .authorization((allow) => [
    allow.publicApiKey().to(['read']),
    allow.owner(),
  ]),
  MenuSubmenu: a
  .model({
    menuId: a.id().required(),
    submenuId: a.id().required(),
    menu: a.belongsTo("Menu","menuId"),
    submenu: a.belongsTo("Submenu","submenuId")
  })
  .authorization((allow) => [
    allow.publicApiKey().to(['read']),
    allow.owner(),
  ]),
  SubmenuDish: a
  .model({
    submenuId: a.id().required(),
    dishId: a.id().required(),
    submenu: a.belongsTo("Submenu","submenuId"),
    dish: a.belongsTo("Dish","dishId")
  })
  .authorization((allow) => [
    allow.publicApiKey().to(['read']),
    allow.owner(),
  ]),
  SubmenuSide: a
  .model({
    submenuId: a.id().required(),
    sideId: a.id().required(),
    submenu: a.belongsTo("Submenu","submenuId"),
    side: a.belongsTo("Side","sideId")
  })
  .authorization((allow) => [
    allow.publicApiKey().to(['read']),
    allow.owner(),
  ]),
  SubmenuDrink: a
  .model({
    submenuId: a.id().required(),
    drinkId: a.id().required(),
    submenu: a.belongsTo("Submenu","submenuId"),
    drink: a.belongsTo("Drink","drinkId")
  })  
  .authorization((allow) => [
    allow.publicApiKey().to(['read']),
    allow.owner(),
  ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
