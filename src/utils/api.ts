
/**
 * API utilities for Node.js documentation search and chat
 */

// Base URL for Node.js API documentation
const NODEJS_DOCS_BASE_URL = "https://nodejs.org/docs/latest/api";

// Sample documentation topics used for search simulation
const NODEJS_DOC_TOPICS = [
  { name: "fs", description: "File System module for interacting with files" },
  { name: "http", description: "HTTP server and client module" },
  { name: "buffer", description: "For handling binary data" },
  { name: "path", description: "Path manipulation utilities" },
  { name: "events", description: "Event-driven architecture implementation" },
  { name: "process", description: "Process information and control" },
  { name: "stream", description: "Streaming data handling" },
  { name: "crypto", description: "Cryptographic functionality" },
  { name: "url", description: "URL parsing and formatting" },
  { name: "querystring", description: "Parse and format URL query strings" },
  { name: "util", description: "Utility functions for Node.js" },
  { name: "assert", description: "Assertion testing" },
  { name: "os", description: "Operating system-related utilities" },
  { name: "child_process", description: "Spawn subprocesses" },
  { name: "cluster", description: "Multi-process support" },
  { name: "console", description: "Console debugging utilities" },
  { name: "dns", description: "DNS resolution functions" },
  { name: "net", description: "TCP networking" },
  { name: "readline", description: "Interface for reading line by line" },
  { name: "zlib", description: "Compression functionality" },
  { name: "timers", description: "Timing functions like setTimeout" },
  { name: "tls", description: "Transport Layer Security" },
  { name: "dgram", description: "UDP datagram sockets" },
  { name: "worker_threads", description: "Multithreaded JavaScript" },
  { name: "async_hooks", description: "Track asynchronous resources" }
];

// Sample documentation content for different modules
const MODULE_CONTENT = {
  fs: `
# File System (fs)

The \`fs\` module enables interacting with the file system in a way modeled on standard POSIX functions.

## fs.readFile(path[, options], callback)

Asynchronously reads the entire contents of a file.

\`\`\`js
const fs = require('fs');
fs.readFile('/path/to/file', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
\`\`\`

## fs.writeFile(file, data[, options], callback)

Asynchronously writes data to a file, replacing the file if it already exists.

\`\`\`js
const fs = require('fs');
fs.writeFile('/path/to/file', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
\`\`\`
  `,
  http: `
# HTTP

The HTTP interfaces in Node.js are designed to support many features of the protocol which have been traditionally difficult to use.

## http.createServer([options][, requestListener])

Returns a new instance of \`http.Server\`.

\`\`\`js
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\\n');
});
server.listen(3000);
\`\`\`

## http.get(options[, callback])

Makes a GET request. This is a convenience method similar to \`http.request()\`.

\`\`\`js
const http = require('http');
http.get('http://nodejs.org/dist/index.json', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(JSON.parse(data));
  });
});
\`\`\`
  `,
  fetch: `
# fetch

The Fetch API provides an interface for fetching resources.

## Global fetch

\`fetch()\` is a global function that provides a simple interface for fetching resources.

\`\`\`js
async function fetchData() {
  try {
    const response = await fetch('https://example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
\`\`\`

## Headers, Request, and Response

The Fetch API includes the \`Headers\`, \`Request\`, and \`Response\` objects.

\`\`\`js
const request = new Request('https://example.com/api', {
  method: 'POST',
  headers: new Headers({
    'Content-Type': 'application/json'
  }),
  body: JSON.stringify({ key: 'value' })
});

fetch(request)
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

The \`fetch()\` function is supported in Node.js since v17.5.0 and is available as a global.
  `,
  buffer: `
# Buffer

Prior to the introduction of \`TypedArray\`, the JavaScript language had no mechanism for reading or manipulating streams of binary data. The \`Buffer\` class was introduced as part of the Node.js API to enable interaction with octet streams in TCP streams, file system operations, and other contexts.

## Creating a Buffer

\`\`\`js
// Create a buffer of length 10 filled with zeros
const buf1 = Buffer.alloc(10);

// Create a buffer with content
const buf2 = Buffer.from('Hello Node.js');

// Create a buffer from an array of integers
const buf3 = Buffer.from([1, 2, 3, 4, 5]);
\`\`\`

## Buffer and Character Encodings

\`\`\`js
const buf = Buffer.from('hello world', 'utf8');

console.log(buf.toString('hex'));
// Prints: 68656c6c6f20776f726c64

console.log(buf.toString('base64'));
// Prints: aGVsbG8gd29ybGQ=
\`\`\`
  `
};

// Function to search Node.js documentation topics
export const searchNodeJsDocs = async (query: string) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Basic search algorithm (case-insensitive matching)
    const lowerQuery = query.toLowerCase();
    
    // Check if we have a specific module content match
    let exactMatch = Object.keys(MODULE_CONTENT).find(key => key.toLowerCase() === lowerQuery);
    
    // Filter topics based on the search query
    let results = NODEJS_DOC_TOPICS.filter(topic => 
      topic.name.toLowerCase().includes(lowerQuery) || 
      topic.description.toLowerCase().includes(lowerQuery)
    ).map(topic => ({
      title: topic.name,
      path: topic.name,
      url: `${NODEJS_DOCS_BASE_URL}/${topic.name}.html`,
      apiUrl: `${topic.name}` // This is now just an identifier for our mock data
    }));
    
    // If we have an exact match and it wasn't already in the results, add it first
    if (exactMatch && !results.some(r => r.title === exactMatch)) {
      results.unshift({
        title: exactMatch,
        path: exactMatch,
        url: `${NODEJS_DOCS_BASE_URL}/${exactMatch}.html`,
        apiUrl: exactMatch
      });
    }
    
    // Add additional results based on common Node.js functionality
    if (lowerQuery.includes('read') || lowerQuery.includes('file')) {
      if (!results.some(r => r.title === 'fs')) {
        results.push({
          title: 'fs',
          path: 'fs',
          url: `${NODEJS_DOCS_BASE_URL}/fs.html`,
          apiUrl: 'fs'
        });
      }
    }
    
    console.log("Search results for:", query, results);
    return results;
  } catch (error) {
    console.error("Error searching Node.js docs:", error);
    throw error;
  }
};

// Function to get content for a specific Node.js documentation file
export const getNodeJsDocContent = async (identifier: string) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return mock content based on module identifier
    if (MODULE_CONTENT[identifier as keyof typeof MODULE_CONTENT]) {
      return MODULE_CONTENT[identifier as keyof typeof MODULE_CONTENT];
    }
    
    // Default fallback content
    return `
# ${identifier}

This is a sample documentation for the ${identifier} module in Node.js.

## Common Usage

\`\`\`js
const ${identifier} = require('${identifier}');
// Example usage of ${identifier}
\`\`\`

For more information, visit the [official Node.js documentation](https://nodejs.org/docs/latest/api/${identifier}.html).
    `;
  } catch (error) {
    console.error("Error fetching doc content:", error);
    throw error;
  }
};

// Function for the AI chat to get responses about Node.js documentation
export const getAIChatResponse = async (query: string) => {
  try {
    console.log("Getting AI response for:", query);
    // Search for relevant documentation
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
    
    return `Based on the Node.js documentation (${topResult.title}):\n\n${excerpt}\n\nYou can find more details at: ${topResult.url}`;
  } catch (error) {
    console.error("Error getting AI chat response:", error);
    return "I'm having trouble accessing the Node.js documentation right now. Please try again later.";
  }
};
