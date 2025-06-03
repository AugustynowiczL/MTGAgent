# Magic Deck Builder with LangGraph Agents

A web app that leverages **LangChain/LangGraph agents** and large language models to generate custom Magic: The Gathering decks tailored around a commander of your choice.

---

## Overview

This project builds Magic decks by querying a set of specialized LangGraph agents—each dedicated to generating cards of a specific type such as creatures, artifacts, enchantments, instants, sorceries, and lands. Given a commander and desired number of cards per category, it generates a balanced deck with card recommendations.

- Uses structured output models for each card type.
- Separates concerns by having individual agents generate cards per category, improving reliability.
- Exposes a backend API to generate decks on demand.
- Includes a React frontend with a modern UI to input commander name and card counts, then view generated cards grouped by category.

---

## Features

- Modular LangGraph agents for different Magic card types.
- Flexible API accepting commander name and counts per card type.
- Responsive React UI with navigation for individual card categories and a full deck builder.
- Clean, user-friendly design with input validation and real-time results.
- Easily extendable to add more card types or features.

---

## Tech Stack

- **Backend:** Python, LangChain/LangGraph agents, FastAPI
- **Frontend:** React, React Router, Axios
- **Language Models:** Gemini or any compatible LLM with LangGraph

---