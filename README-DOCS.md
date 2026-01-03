# Argon Documentation Website

A modern, clean documentation website for the Argon inference server framework.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the documentation site.

### Build

Build the production version:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── user-guide/        # User guide pages
│   ├── developer-guide/   # Developer guide pages
│   ├── api-reference/     # API reference
│   ├── cli-reference/     # CLI reference
│   ├── benchmarking/      # Benchmarking guide
│   └── community/         # Community page
├── components/            # React components
│   ├── Header.tsx         # Site header
│   ├── Navigation.tsx     # Navigation bar
│   └── Footer.tsx         # Site footer
└── public/                # Static assets
```

## Features

- Clean, modern design inspired by vLLM documentation
- Responsive layout
- Multiple documentation sections
- Search functionality (header)
- GitHub integration
- Community links
- API and CLI references

## Customization

All content is currently placeholder/dummy content. Replace with your actual documentation:

1. Update page content in `app/` directory
2. Modify components in `components/` directory
3. Update colors and styling in `tailwind.config.ts`
4. Change metadata in `app/layout.tsx`

## License

Same as the main Argon project.

