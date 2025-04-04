
/**
 * API utilities for Node.js documentation search and chat
 */

// Real Node.js documentation URLs
const NODEJS_DOCS_BASE_URL = "https://nodejs.org/api";
const NODEJS_GITHUB_DOCS_URL = "https://raw.githubusercontent.com/nodejs/node/master/doc/api";

// Node.js documentation topics with reliable data
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
  { name: "async_hooks", description: "Track asynchronous resources" },
  { name: "fetch", description: "Fetch API for making HTTP requests" }
];

// Real code examples for different types of prompts
const CODE_EXAMPLES = {
  "fetch_jsonplaceholder": `
// Using fetch API to get data from JSONPlaceholder
const fetchData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log('Posts retrieved:', data.length);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call the function
fetchData().then(posts => {
  console.log('First post title:', posts[0].title);
});
`,
  "fetch_post": `
// Posting data with fetch API
const postData = async () => {
  const newPost = {
    title: 'My New Post',
    body: 'This is the content of my new post',
    userId: 1
  };

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const result = await response.json();
    console.log('Created post:', result);
    return result;
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

// Call the function
postData();
`,
  "http_server": `
// Creating an HTTP server
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  
  const responseData = {
    message: 'Hello from Node.js HTTP Server',
    path: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  };
  
  res.end(JSON.stringify(responseData));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}/\`);
});
`,
  "fs_read_write": `
// File system operations - reading and writing files
const fs = require('fs');

// Write to a file asynchronously
fs.writeFile('example.txt', 'Hello Node.js!', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  
  console.log('File has been written successfully');
  
  // Read the file we just wrote
  fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    
    console.log('File content:', data);
  });
});
`,
  "express_server": `
// Creating a simple Express server
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node.js Express API' });
});

// Create a simple API endpoint
app.get('/api/info', (req, res) => {
  res.json({
    nodeVersion: process.version,
    platform: process.platform,
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(\`Express server running at http://localhost:\${PORT}\`);
});
`,
  "async_await": `
// Using async/await with Node.js
const fs = require('fs').promises;

// Function to read a file and process its contents
async function processFile(filePath) {
  try {
    // Read the file
    const data = await fs.readFile(filePath, 'utf8');
    
    // Process the data
    const lines = data.split('\\n');
    console.log(\`File contains \${lines.length} lines\`);
    
    // Write processed data to a new file
    const processedData = lines.filter(line => line.trim().length > 0).join('\\n');
    await fs.writeFile(\`\${filePath}.processed\`, processedData);
    
    return { 
      originalLines: lines.length,
      processedLines: processedData.split('\\n').length
    };
  } catch (error) {
    console.error('Error processing file:', error);
    throw error;
  }
}

// Usage
processFile('example.txt')
  .then(result => console.log('Processing complete:', result))
  .catch(err => console.error('Processing failed:', err));
`
};

// Documentation content for frequently accessed modules
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

## fs.promises API

The fs module also provides promise-based APIs:

\`\`\`js
const fs = require('fs').promises;

async function example() {
  try {
    await fs.writeFile('/path/to/file', 'Hello Node.js');
    const data = await fs.readFile('/path/to/file', 'utf8');
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}
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

## http.request(options[, callback])

Makes an HTTP request. This method is used for more complex requests beyond simple GET requests.

\`\`\`js
const http = require('http');

const options = {
  hostname: 'example.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(JSON.parse(data));
  });
});

req.on('error', (e) => {
  console.error(\`Problem with request: \${e.message}\`);
});

req.write(JSON.stringify({ key: 'value' }));
req.end();
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

## Fetch with custom options

\`\`\`js
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer token123'
  },
  cache: 'no-cache',
  redirect: 'follow'
})
.then(response => {
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  return response.json();
})
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));
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

## Buffer Methods

\`\`\`js
// Compare buffers
const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('BCD');
const result = buf1.compare(buf2);
// result < 0 means buf1 comes before buf2 in sort order

// Copy one buffer to another
const target = Buffer.alloc(6);
const source = Buffer.from('ABC');
source.copy(target, 1);
console.log(target.toString()); // Prints: A BC

// Slice a buffer (creates a view, not a copy)
const buf = Buffer.from('Buffer example');
const slice = buf.slice(0, 6);
slice[0] = 98; // 'b' in ASCII
console.log(buf.toString()); // Prints: buffer example
\`\`\`
  `
};

// Function to search Node.js documentation topics
export const searchNodeJsDocs = async (query: string) => {
  try {
    console.log("Searching for:", query);
    
    // Basic search algorithm (case-insensitive matching)
    const lowerQuery = query.toLowerCase();
    
    // Filter topics based on the search query
    let results = NODEJS_DOC_TOPICS.filter(topic => 
      topic.name.toLowerCase().includes(lowerQuery) || 
      topic.description.toLowerCase().includes(lowerQuery)
    ).map(topic => ({
      title: topic.name,
      path: topic.name,
      url: `${NODEJS_DOCS_BASE_URL}/${topic.name}.html`,
      apiUrl: topic.name
    }));
    
    // If no direct matches, add some intelligent recommendations
    if (results.length === 0) {
      if (lowerQuery.includes('file') || lowerQuery.includes('read') || lowerQuery.includes('write')) {
        results.push({
          title: 'fs',
          path: 'fs',
          url: `${NODEJS_DOCS_BASE_URL}/fs.html`,
          apiUrl: 'fs'
        });
      }
      
      if (lowerQuery.includes('server') || lowerQuery.includes('web') || lowerQuery.includes('request')) {
        results.push({
          title: 'http',
          path: 'http',
          url: `${NODEJS_DOCS_BASE_URL}/http.html`,
          apiUrl: 'http'
        });
      }
      
      if (lowerQuery.includes('api') || lowerQuery.includes('json') || lowerQuery.includes('fetch')) {
        results.push({
          title: 'fetch',
          path: 'fetch',
          url: `${NODEJS_DOCS_BASE_URL}/fetch.html`,
          apiUrl: 'fetch'
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
    console.log("Fetching content for:", identifier);
    
    // Return content based on module identifier
    if (MODULE_CONTENT[identifier as keyof typeof MODULE_CONTENT]) {
      return MODULE_CONTENT[identifier as keyof typeof MODULE_CONTENT];
    }
    
    // For modules we don't have pre-loaded content for, return a basic template
    return `
# ${identifier}

This is documentation for the ${identifier} module in Node.js.

For detailed information, please refer to the [official Node.js documentation](${NODEJS_DOCS_BASE_URL}/${identifier}.html).

## Common Usage

\`\`\`js
const ${identifier} = require('${identifier}');
// Use ${identifier} functionality here
\`\`\`
    `;
  } catch (error) {
    console.error("Error fetching doc content:", error);
    throw error;
  }
};

// Function to detect coding assistant requests
const isCodingRequest = (query: string): boolean => {
  const lowerQuery = query.toLowerCase();
  const codingKeywords = [
    'make a script', 'create a script', 'write code', 'code example', 'example of',
    'implement', 'develop', 'build a', 'using fetch', 'using http', 'using fs',
    'how to use', 'how do i', 'how can i', 'function', 'write a', 'create a', 
    'show me', 'demonstrate', 'tutorial for', 'help with', 'jsonplaceholder',
    'api request', 'api call'
  ];
  
  return codingKeywords.some(keyword => lowerQuery.includes(keyword));
};

// Function to analyze query and determine appropriate code example
const getCodeExample = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  // Match specific code examples based on the query
  if (lowerQuery.includes('fetch') && 
     (lowerQuery.includes('jsonplaceholder') || lowerQuery.includes('json') || lowerQuery.includes('api'))) {
    return CODE_EXAMPLES.fetch_jsonplaceholder;
  }
  
  if (lowerQuery.includes('post') && 
     (lowerQuery.includes('fetch') || lowerQuery.includes('api') || lowerQuery.includes('send'))) {
    return CODE_EXAMPLES.fetch_post;
  }
  
  if (lowerQuery.includes('http') && 
     (lowerQuery.includes('server') || lowerQuery.includes('create server') || lowerQuery.includes('web server'))) {
    return CODE_EXAMPLES.http_server;
  }
  
  if ((lowerQuery.includes('fs') || lowerQuery.includes('file')) && 
     (lowerQuery.includes('read') || lowerQuery.includes('write'))) {
    return CODE_EXAMPLES.fs_read_write;
  }
  
  if (lowerQuery.includes('express') || 
     (lowerQuery.includes('server') && lowerQuery.includes('api'))) {
    return CODE_EXAMPLES.express_server;
  }
  
  if (lowerQuery.includes('async') || lowerQuery.includes('await') || lowerQuery.includes('promise')) {
    return CODE_EXAMPLES.async_await;
  }
  
  // Default fetch example if nothing else matches but it looks like a coding request
  return CODE_EXAMPLES.fetch_jsonplaceholder;
};

// Function to generate code responses for specific modules
const generateModuleCodeExample = (module: string): string => {
  switch (module) {
    case 'fs':
      return CODE_EXAMPLES.fs_read_write;
    case 'http':
      return CODE_EXAMPLES.http_server;
    case 'fetch':
      return CODE_EXAMPLES.fetch_jsonplaceholder;
    default:
      return `
// Example usage of ${module} in Node.js
const ${module} = require('${module}');

// Basic usage example
console.log('This is a simple example of using the ${module} module');
// For detailed examples, refer to the Node.js documentation
`;
  }
};

// Function for the AI chat to get responses about Node.js documentation
export const getAIChatResponse = async (query: string) => {
  try {
    console.log("Getting AI response for:", query);
    
    // Check if this is a coding request
    if (isCodingRequest(query)) {
      console.log("Detected coding request");
      
      // Determine which modules are relevant to the query
      const searchResults = await searchNodeJsDocs(query);
      let codeExample = "";
      
      // If we have a specific code example for this query, use it
      codeExample = getCodeExample(query);
      
      let response = "Here's a code example that demonstrates what you're asking for:\n\n";
      response += `\`\`\`js${codeExample}\`\`\`\n\n`;
      
      // Add references to relevant documentation
      if (searchResults.length > 0) {
        response += "For more information, you can check the Node.js documentation:\n";
        searchResults.slice(0, 3).forEach(result => {
          response += `- [${result.title}](${result.url})\n`;
        });
      }
      
      return response;
    }
    
    // If not a coding request, provide documentation information
    const searchResults = await searchNodeJsDocs(query);
    
    if (searchResults.length === 0) {
      return "I couldn't find specific information about that in the Node.js documentation. Could you try rephrasing your question or specifying which Node.js API you're interested in?";
    }
    
    // Get the content of the most relevant result
    const topResult = searchResults[0];
    const content = await getNodeJsDocContent(topResult.apiUrl);
    
    // Extract the most relevant parts (simplified approach)
    const sections = content.split('\n\n').filter(section => section.trim().length > 0);
    let relevantSections = sections.slice(0, 3).join('\n\n');
    
    return `Based on the Node.js documentation for \`${topResult.title}\`:\n\n${relevantSections}\n\nFor more information, check the [official documentation](${topResult.url}).`;
  } catch (error) {
    console.error("Error getting AI chat response:", error);
    return "I'm having trouble accessing the Node.js documentation right now. Please try again later.";
  }
};
