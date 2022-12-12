# The Peaks - Front-End Development Test

## Getting started:

1.) Clone this repository

2.) go into the project folder and install all necessary dependencies:
`cd thepeaks && yarn install`

3.) Create a developer key at: https://open-platform.theguardian.com/access/

4.) Create a ".env.local" file at root of the project and set the following env variables:

```
API_URL=https://content.guardianapis.com/
API_KEY=<YOUR API KEY>
NEXT_PUBLIC_CLIENT_EXPOSED_API=/api/v1
```

5.) Run the dev server:
`yarn dev`
