# Twitter OAuth Backend

A serverless backend for Twitter OAuth authentication, designed to be deployed on Vercel.

## Features

- Twitter OAuth 1.0a authentication
- Serverless deployment on Vercel
- Health check endpoint
- Secure token handling

## Environment Variables

Create a `.env` file with the following variables:

```env
TWITTER_CONSUMER_KEY=your_twitter_api_key
TWITTER_CONSUMER_SECRET=your_twitter_api_secret
CALLBACK_URL=your_vercel_deployment_url/auth/twitter/callback
```

## Deployment on Vercel

### Prerequisites

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Make sure you have a Vercel account

### Deployment Steps

1. **Login to Vercel**:
```bash
vercel login
```

2. **Deploy the project**:
```bash
vercel
```

3. **Set environment variables** in Vercel dashboard:
   - Go to your project settings
   - Navigate to Environment Variables
   - Add the required environment variables

4. **Update callback URL**:
   - After deployment, update your `CALLBACK_URL` environment variable with your Vercel deployment URL
   - Format: `https://your-project.vercel.app/auth/twitter/callback`

### API Endpoints

- `GET /` - Health check
- `GET /auth/twitter` - Initiate Twitter OAuth
- `GET /auth/twitter/callback` - OAuth callback
- `GET /health` - Health check (alternative)

## Local Development

1. **Install dependencies**:
```bash
pnpm install
```

2. **Start the server**:
```bash
pnpm start
```

3. **Access the server** at `http://localhost:3001`

## Project Structure

```
├── api/
│   └── index.js          # Vercel serverless function entry point
├── server.js             # Local development server
├── twitterOAuth.js       # Twitter OAuth routes
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies and scripts
└── .env                  # Environment variables (not committed)
```

## Notes

- The backend is designed to work with serverless functions on Vercel
- OAuth tokens are stored in memory (not suitable for production with multiple instances)
- For production use, consider using a database to store OAuth tokens 