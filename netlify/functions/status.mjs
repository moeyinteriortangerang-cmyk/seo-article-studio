export default async () => Response.json({
  openai: Boolean(Netlify.env.get("OPENAI_API_KEY")),
  medium: Boolean(Netlify.env.get("MEDIUM_INTEGRATION_TOKEN")),
  model: Netlify.env.get("OPENAI_MODEL") || "gpt-4o-mini"
});