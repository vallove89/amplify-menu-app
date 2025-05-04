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
    Price: a.customType({
      label: a.string(),
      price: a.float(),
    }),
    Item: a.model({
    id: a.id().required(),
    userId: a.id().required(),
    name: a.string().required(),
    description: a.string(),
    imageUrl: a.string(),
    priceOption: a.ref('Price').array(),
    category: a.enum(['STARTERS', 'ENTREES', 'SIDES', 'DESSERTS', 'DRINKS_NON_ALCOHOLIC', 'DRINKS_ALCOHOLIC']),
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
    items: a.hasMany("SubmenuItem","submenuId"),
  })
  .authorization((allow) => [
    allow.publicApiKey().to(['read']),
    allow.owner(),
  ]),
  Menu: a
  .model({
    id: a.id().required(),
    userId: a.id().required(),
    name: a.string().required(),
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
  SubmenuItem: a
  .model({
    submenuId: a.id().required(),
    itemId: a.id().required(),
    submenu: a.belongsTo("Submenu","submenuId"),
    item: a.belongsTo("Item","itemId")
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
