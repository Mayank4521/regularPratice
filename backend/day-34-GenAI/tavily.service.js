// services/tavily.service.js
import { tavily } from "@tavily/core";
import dotenv from "dotenv";

dotenv.config();

// Initialize the Tavily client using your API key from .env
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

/**
 * Searches the web using Tavily for a given query.
 * @param {string} query - The user's question.
 * @returns {Promise<Object>} - Formatted search text and raw source links.
 */
export async function searchWeb(query) {
  try {
    const response = await tvly.search(query, {
      searchDepth: "basic", // "basic" is fast and cheap; "advanced" does deeper crawling
      maxResults: 5,        // Number of sources to bring back
    });

    // Extract and format the content and sources nicely
    const contextText = response.results
      .map((result, index) => `[Source ${index + 1}]: ${result.title}\nURL: ${result.url}\nContent: ${result.content}`)
      .join("\n\n");

    return {
      contextText, // This goes into your AI prompt
      sources: response.results.map(r => ({ title: r.title, url: r.url })) // This goes to your frontend for citation cards
    };
  } catch (error) {
    console.error("Error fetching data from Tavily:", error);
    throw new Error("Failed to fetch live web data.");
  }
}