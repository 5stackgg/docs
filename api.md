# 5Stack API

You can generate an API token in your settings on the 5Stack panel. This token is tied to your user account.

To access the API, use a GraphQL client such as [Altair GraphQL](https://altairgraphql.dev/) or any tool that supports sending GraphQL requests.

**API Endpoint:**

```
https://api.<YOUR_DOMAIN_HERE>/v1/graphql
```

**Authentication:**  
Include your API token in the `Authorization` header of each request:

```
Authorization: Bearer <API_TOKEN>
```

Most GraphQL clients support schema introspection, allowing you to explore available queries and mutations interactively.

**Example Query:**

```graphql
query LiveMatches {
  matches(where: { status: { _eq: Live } }) {
    id
  }
}
```

For additional examples and detailed API usage, visit our [GitHub repository](https://github.com/5stackgg/web).
