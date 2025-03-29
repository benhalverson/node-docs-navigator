
/**
 * API utilities for Node.js documentation search and chat
 */

// Base URL for Node.js documentation API (using GitHub API as a proxy)
const NODEJS_DOCS_API = "https://api.github.com/repos/nodejs/node/contents/doc/api";

// Function to fetch Node.js documentation content
export const fetchNodeJsDocs = async (path: string = "") => {
  try {
    const response = await fetch(`${NODEJS_DOCS_API}${path ? `/${path}` : ''}`);
    if (!response.ok) throw new Error("Failed to fetch Node.js docs");
    return await response.json();
  } catch (error) {
    console.error("Error fetching Node.js docs:", error);
    throw error;
  }
};

// Search Node.js documentation using a simple API
export const searchNodeJsDocs = async (query: string) => {
  try {
    // Using GitHub search API to search within nodejs/node repo's doc/api directory
    const encodedQuery = encodeURIComponent(`${query} in:file path:doc/api extension:md repo:nodejs/node`);
    const response = await fetch(`https://api.github.com/search/code?q=${encodedQuery}`);
    
    if (!response.ok) throw new Error("Failed to search Node.js docs");
    
    const data = await response.json();
    return data.items.map((item: any) => ({
      title: item.name.replace('.md', ''),
      path: item.path.replace('doc/api/', '').replace('.md', ''),
      url: item.html_url,
      apiUrl: item.url
    }));
  } catch (error) {
    console.error("Error searching Node.js docs:", error);
    throw error;
  }
};

// Function to get content for a specific Node.js documentation file
export const getNodeJsDocContent = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch doc content");
    
    const data = await response.json();
    // GitHub API returns content as base64 encoded
    const content = atob(data.content);
    return content;
  } catch (error) {
    console.error("Error fetching doc content:", error);
    throw error;
  }
};

// Function for the AI chat to get responses about Node.js documentation
export const getAIChatResponse = async (query: string) => {
  try {
    // For simplicity, we'll search the docs and extract content to create an answer
    const searchResults = await searchNodeJsDocs(query);
    
    if (searchResults.length === 0) {
      return "I couldn't find information about that in the Node.js documentation. Could you try rephrasing your question?";
    }
    
    // Get the content of the top result
    const topResult = searchResults[0];
    const content = await getNodeJsDocContent(topResult.apiUrl);
    
    // Extract a relevant portion of the content (simplistic approach)
    const lines = content.split('\n');
    let excerpt = '';
    
    // Find a section that might contain the answer
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      if (line.includes(query.toLowerCase()) && i < lines.length - 5) {
        // Extract a few lines around the match
        excerpt = lines.slice(i, i + 5).join('\n');
        break;
      }
    }
    
    if (!excerpt) {
      // If no specific section found, take the first few lines that aren't headers
      excerpt = lines.filter(line => !line.startsWith('#') && line.trim().length > 0)
        .slice(0, 5).join('\n');
    }
    
    return `Based on the Node.js documentation (${topResult.title}):\n\n${excerpt}\n\nYou can find more details at: https://nodejs.org/docs/latest/api/${topResult.path}.html`;
  } catch (error) {
    console.error("Error getting AI chat response:", error);
    return "I'm having trouble accessing the Node.js documentation right now. Please try again later.";
  }
};
