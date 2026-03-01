#!/usr/bin/env node
/**
 * check-stars.js — Fetch live GitHub star counts for tracked tools
 * Usage: node check-stars.js
 */

const https = require('https');

const tools = require('./tools.json');

function fetchStars(owner, repo) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}`,
      headers: {
        'User-Agent': 'dev-tools-radar/1.0',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {}),
      },
    };
    
    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ stars: parsed.stargazers_count, forks: parsed.forks_count });
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching star counts for tracked tools...\n');
  
  for (const [category, categoryData] of Object.entries(tools.categories)) {
    console.log(`## ${categoryData.description}`);
    
    for (const tool of categoryData.tools) {
      if (tool.github) {
        const [owner, repo] = tool.github.split('/');
        try {
          const { stars, forks } = await fetchStars(owner, repo);
          console.log(`  ${tool.name}: ⭐ ${stars.toLocaleString()} stars, 🍴 ${forks.toLocaleString()} forks`);
          // rate limit pause
          await new Promise(r => setTimeout(r, 200));
        } catch (e) {
          console.log(`  ${tool.name}: error fetching stars`);
        }
      } else {
        console.log(`  ${tool.name}: no GitHub repo tracked`);
      }
    }
    console.log('');
  }
}

main().catch(console.error);
