# World Building App

A React application for creating and managing fictional worlds using AI-assisted content generation.

## Features

- Create detailed world descriptions with AI assistance
- Manage world characteristics and structures
- Expand world lore with advanced AI generation
- Beautiful UI with theme-based styling

## Prerequisites

- Node.js 16.x or higher
- npm or yarn
- OpenAI API key

## Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```bash
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:3000`

## Deployment to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Connect your repository to Vercel:
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Select the repository

3. Configure environment variables:
   - In your project settings, go to "Environment Variables"
   - Add `VITE_OPENAI_API_KEY` with your OpenAI API key
   - Make sure to add it to all environments (Production, Preview, and Development)

4. Deploy:
   - Vercel will automatically build and deploy your application
   - Any future pushes to your main branch will trigger automatic deployments

## Environment Variables

- `VITE_OPENAI_API_KEY`: Your OpenAI API key (required for AI text generation)

## Tech Stack

- React
- TypeScript
- Vite
- Chakra UI
- OpenAI API
- Axios

## Project Structure

```
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/         # Page components
│   ├── config/        # Configuration files
│   ├── data/          # Static data and types
│   └── types/         # TypeScript type definitions
├── public/           # Static assets
└── api/             # API endpoints
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 