# CodeDistill

A Chrome extension that extracts clean, executable code from messy developer text. No more manually removing line numbers, shell prompts, logs, and explanatory prose before pasting into your editor or terminal.

## The Problem

When copying code from Stack Overflow, GeeksForGeeks, documentation sites, or AI tools, you often get:

```text
Here is how to install the app:

1  pip install flask
2  pip install requests

Output:
 * Running on http://127.0.0.1:5000
```

CodeDistill removes the clutter so you get only what you can actually run.

## Features

- **Clean Copy** — rule-based cleaning that strips line numbers, shell prompts (`$`, `>>>`, `>>`), and PowerShell prompts (`PS>`) instantly, no API key needed
- **AI Clean Copy** — sends selected text to Gemini AI to intelligently extract only executable code, removing output lines, logs, and explanatory prose
- Works on any website via right-click context menu
- API key stored locally in your browser, never shared

## Installation

This extension is not yet on the Chrome Web Store. To install locally:

1. Clone this repository
   https://github.com/Vrinda0211/CodeDistill
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer Mode** (top right toggle)
4. Click **Load unpacked**
5. Select the cloned project folder

## Setup

1. Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com)
2. Click the CodeDistill icon in your Chrome toolbar
3. Paste your API key and click Save

## Usage

1. Select any text on a webpage containing code
2. Right-click → **CodeDistill**
   - **Copy Clean** - instant rule-based cleaning, works offline
   - **AI Copy Clean** - AI-powered cleaning for complex mixed content
3. Paste the cleaned code wherever you need it

## Known Limitations

- Clean Copy may strip indentation from deeply indented lines due to line number removal
- AI Clean Copy requires an active internet connection and a valid Gemini API key
- Free tier Gemini API has a daily request limit

## Tech Stack

- JavaScript
- Chrome Extension Manifest V3
- Chrome Context Menus API
- Chrome Storage API
- Gemini API (gemini-2.5-flash)

## About

Built as a portfolio project to learn Chrome extension development and AI API integration.