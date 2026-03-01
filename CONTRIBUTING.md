# Contributing to Developer Tools Radar

Thanks for your interest in contributing! This radar tracks high-quality developer tools.

## How to Contribute

### Adding a New Tool

1. Fork this repository
2. Edit `tools.json` to add your tool under the appropriate category
3. Follow the schema:
   ```json
   {
     "name": "Tool Name",
     "url": "https://example.com",
     "github": "owner/repo",
     "description": "One clear sentence describing what it does",
     "features": ["feature1", "feature2"],
     "pricing": "freemium | paid | open-source",
     "stars_approx": 1000
   }
   ```
4. Open a pull request with the title: `Add [Tool Name] to [category]`

### Criteria for Inclusion

Tools must:
- Be actively maintained (commits in last 6 months)
- Have clear documentation
- Solve a real problem for developers
- Not be abandonware

### Categories

| Category | Description |
|----------|-------------|
| `ai_browser_automation` | Cloud browser platforms for AI agents |
| `mcp_servers` | MCP servers for AI assistants |
| `web_scraping` | Web scraping and data extraction |

### Update Existing Entry

If information is outdated (old URL, changed pricing, etc.), submit a PR with the correction and a note explaining the change.

## Code of Conduct

Be respectful. No spam, no self-promotion without genuine value.
