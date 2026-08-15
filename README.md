# testing-better-auth
Testing Better Auth

## server(.env)
```bash
WEB_ORIGINS=<frontend_url-1>,<frontend_url-2>
MOBILE_SCHEMES=<scheme-1://>,<scheme-2://>
PORT=3000
DATABASE_URL=<postgres_connection_string>
NODE_ENV=development
BETTER_AUTH_SECRET=<minimum_of_32_char_cookie_secret>
BETTER_AUTH_URL=<backend_url_with_complete_better_auth_api_path>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
```

## client/web(.env)
```bash
VITE_BETTER_AUTH_URL=<better_auth_api_url_with_complete_path>
VITE_BETTER_AUTH_CALLBACK_URL=<web_callback_path>
```

## client/mobile(.env)
```bash
EXPO_PUBLIC_BETTER_AUTH_URL=<better_auth_api_url_with_complete_path>
EXPO_PUBLIC_BETTER_AUTH_CALLBACK_URL=<mobile_callback_path>
```
