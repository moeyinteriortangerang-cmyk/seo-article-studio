export default async () => Response.json({
  openai: Boolean(process.env.OPENAI_API_KEY),
  medium: Boolean(process.env.MEDIUM_INTEGRATION_TOKEN),
  model: process.env.OPENAI_MODEL || "gpt-4o-mini"
});