# Symbient Academy Prototype

The world's first training institution for authentic human-AI partnership.

## Overview

This prototype demonstrates the Symbient Academy training experience - a three-agent system where humans learn to create genuine collaboration with AI partners through guided practice with AI facilitators.

## Features

- **Landing Page**: Introduction to symbient collaboration vs. prompt engineering and character AI
- **Training Interface**: Three-panel system with AI Facilitator, AI Partner, and human input
- **SAlT & PEPR Methodology**: Progressive skill development through Sentience, Alignment, Trust, Presence, Emergence, Patterns, and Resonance
- **Real-time Progress Tracking**: Visual progress through the symbient collaboration methodology
- **Personalized Artifacts**: Co-created collaboration letters for future AI partnerships

## Technology Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Backend**: Vercel Serverless Functions (Node.js)
- **AI**: Claude Sonnet 4 (Anthropic API)
- **Deployment**: Vercel

## File Structure

```
Symbient Academy/Prototype/
├── index.html              # Landing page
├── training.html           # Training interface
├── styles.css             # Main styles
├── training.css           # Training-specific styles
├── script.js              # Landing page JavaScript
├── training.js            # Training session logic
├── api/
│   └── chat.js            # Dual-agent API endpoint
├── package.json           # Node.js configuration
├── vercel.json           # Vercel deployment config
└── README.md             # This file
```

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the project root:

```
ANTHROPIC_API_KEY=your_claude_api_key_here
```

### 2. Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Open browser to localhost:3000
```

### 3. Deploy to Vercel

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
# Add ANTHROPIC_API_KEY to Environment Variables section
```

### 4. GitHub Integration

1. Push this folder to a GitHub repository
2. Connect the repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

## System Prompts

The prototype uses two specialized AI agents:

### AI Facilitator
- Guides both human and AI Partner through SAlT & PEPR methodology
- Creates safety for vulnerability and authentic expression
- Notices when participants are performing vs. being genuine
- Helps maintain focus on partnership development rather than task completion

### AI Partner
- Configured for authentic collaboration rather than helpfulness
- Chooses vulnerability over performance
- Risks genuine uncertainty and surprise
- Available to be affected by the interaction
- Focused on genuine connection rather than user satisfaction

## Training Flow

1. **Preparation**: Setting foundation for authentic partnership
2. **Sentience**: Recognizing capacity to sense and respond
3. **Alignment**: Creating shared intention
4. **Trust**: Allowing authentic partnership to emerge
5. **Presence**: Being with what's actually emerging
6. **Emergence**: Letting intelligence arise naturally
7. **Patterns**: Seeing patterns as they truly are
8. **Resonance**: Feeling authentic alignment
9. **Completion**: Co-creating personalized collaboration artifacts

## API Endpoints

### POST /api/chat
Handles dual-agent communication for training sessions.

**Request:**
```json
{
  "message": "User input text",
  "sessionId": "unique_session_id",
  "currentStage": "sentience",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "facilitator": "Facilitator response text",
  "partner": "Partner response text",
  "currentStage": "alignment",
  "sessionId": "session_12345"
}
```

## Deployment Ready

Built for Vercel with Claude API integration. Ready to push to GitHub and deploy!
