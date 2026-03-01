#!/usr/bin/env node
/**
 * generate-report.js — Generate a markdown report from the tools database
 * Usage: node generate-report.js > REPORT.md
 */

const tools = require('./tools.json');

function formatFeatures(features) {
  return features.map(f => `\`${f}\``).join(', ');
}

function formatPricing(pricing) {
  const icons = {
    'open-source': '🆓 Open source',
    'freemium': '🆓 Freemium',
    'paid': '💰 Paid',
  };
  return icons[pricing] || pricing;
}

let report = `# Developer Tools Radar Report

Generated: ${new Date().toISOString().split('T')[0]}

`;

for (const [key, category] of Object.entries(tools.categories)) {
  report += `## ${category.description}\n\n`;
  report += `| Tool | Pricing | Features |\n`;
  report += `|------|---------|---------|\n`;
  
  for (const tool of category.tools) {
    const link = `[${tool.name}](${tool.url})`;
    report += `| ${link} | ${formatPricing(tool.pricing)} | ${formatFeatures(tool.features)} |\n`;
  }
  
  report += '\n';
  
  // Detailed entries
  for (const tool of category.tools) {
    report += `### ${tool.name}\n\n`;
    report += `**URL**: ${tool.url}\n`;
    if (tool.github) report += `**GitHub**: https://github.com/${tool.github}\n`;
    report += `**Pricing**: ${formatPricing(tool.pricing)}\n`;
    report += `**Features**: ${formatFeatures(tool.features)}\n\n`;
    report += `${tool.description}\n\n`;
    report += `---\n\n`;
  }
}

process.stdout.write(report);
