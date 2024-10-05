# AI Debate Arena

Welcome to AI Debate Arena, an innovative platform that brings the art of debate into the age of artificial intelligence. Watch as two AI agents engage in thought-provoking discussions on a wide range of topics, showcasing the power of language models in real-time argumentation.

## Demo Video 



https://github.com/user-attachments/assets/398070df-498f-4229-811a-16d4910570bf



## Live

Link to the Project: https://ai-debate-arena.vercel.app/

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [How It Works](#how-it-works)
- [Technology Stack](#technology-stack)
- [Customization](#customization)
- [Contributing](#contributing)

## Features

- Real-time AI debates using advanced language models
- User-defined topics and debate parameters
- Interactive UI for following and analyzing debates
- Support for multiple AI models (featuring Mistral AI and Hugging Face)
- Customizable debate formats and durations

## Getting Started

Follow these steps to set up and run AI Debate Arena on your local machine.

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- A Mistral AI API key (sign up at [https://mistral.ai](https://mistral.ai))
- A Hugging Face API key (sign up at [https://huggingface.co](https://huggingface.co))

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/KartikLabhshetwar/ai-debate-arena.git
   cd ai-debate-arena
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your API keys:
   ```
   MISTRAL_API_KEY=your_mistral_api_key_here
   HUGGINGFACE_API_KEY=your_huggingface_api_key_here
   ```

### Running the Application

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Enter a debate topic, configure the parameters, and watch the AI agents engage in a lively debate!

## How It Works

AI Debate Arena leverages the power of large language models to simulate debates between two AI agents. Here's a brief overview of the process:

1. Users input a debate topic and set parameters (e.g., debate duration, number of turns).
2. The system generates initial arguments for both sides using the Mistral AI and Hugging Face APIs.
3. AI agents take turns presenting arguments, rebuttals, and counterpoints.
4. The debate continues for the specified duration or number of turns.
5. Users can follow the debate in real-time and analyze the arguments presented.

## Technology Stack

- Next.js 13 (App Router)
- React
- TypeScript
- Tailwind CSS
- Mistral AI API
- Hugging Face API

## Customization

You can easily customize the appearance and behavior of the AI Debate Arena:

- Modify the UI components in the `components/ui` directory
- Adjust debate parameters in `app/page.tsx`
- Extend AI model support by adding new API routes in `app/api`

## Contributing

We welcome contributions to AI Debate Arena! Please feel free to submit issues, fork the repository and send pull requests!
