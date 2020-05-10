# Swagger Request Generator
Frontend swagger request generator in typescript/axios .

You can use this package to generator swagger request files for your frontend app.


## Usage

1.install
```shell script
npm install -D swagger-request-gen
```
2.add a command to run this package, in your package.json
```json
{
  "scripts": {
    "generate": "gen-request [swagger-url] [request-file-dir]"
  }
}
```

The two params are:

**swagger-url** the url to request a swagger doc, like `http://localhost:8081/v2/api-docs`

**request-file-dir** the directory you wish to store the generated files, it's a relative path from the project root, you can use `./request`, which means the files would be stored inside the dir like:

`<path to project>/request/`

3.run command
```shell script
npm run generate
```

4.get your code

The 3rd step would run this package, inside, it would try visiting the swagger doc, and retrieve them, then use the doc to render `mustache` template into request files.

The output would be like:

**Request**
```typescript
import axios from "axios"

import { DataUserLogin } from "../definitions/DataUserLogin"

export function apiPostUserLogin(dataUserLogin: DataUserLogin) {
  return axios.request({
    url: `/v1/auth/login`,
    method: `post`,
    params: {},
    data: dataUserLogin,
  })
}
```

**Definition**
```typescript
export interface DataUserLogin {
  password: string;
  username: string;
}
```

## Issues

For any problems, feel free to add to the issue tab.
