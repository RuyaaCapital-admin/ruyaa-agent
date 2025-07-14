# Groq API Setup for Chat Widget

## Required Environment Variable

The chat widget requires a Groq API key to function properly.

### Setup Instructions:

1. Get your API key from [Groq Console](https://console.groq.com/)
2. Copy the API key
3. Open `.env.local` file in the project root
4. Replace `your_groq_api_key_here` with your actual API key:

```
GROQ_API_KEY=gsk_your_actual_api_key_here
```

5. Restart the development server

### If the API key is not set:

- The chat widget will show an error message
- The console will display: "GROQ_API_KEY not configured"

### Note:

- Never commit your actual API key to version control
- The `.env.local` file is already in `.gitignore`
