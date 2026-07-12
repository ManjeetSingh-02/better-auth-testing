# better-auth-testing
Testing better auth

## server(.env)
```bash
ORIGINS=http://<domain>:<port>,<scheme>://
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
NODE_ENV=development
BETTER_AUTH_SECRET=minimum_of_32_char_cookie_secret
BETTER_AUTH_URL=http://<domain>:<port>/api/v1/auth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## client/web(.env)
```bash
VITE_BETTER_AUTH_URL=http://<domain>:<port>/api/v1/auth
```

## client/mobile(.env)
```bash
EXPO_PUBLIC_BETTER_AUTH_URL=http://<domain>:<port>/api/v1/auth
```