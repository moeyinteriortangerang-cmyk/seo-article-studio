export default async (req) => {
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
  const apiKey = Netlify.env.get("OPENAI_API_KEY");
  if (!apiKey) return Response.json({ error: "OPENAI_API_KEY belum dipasang sebagai environment variable di Netlify." }, { status: 503 });
  try {
    const body = await req.json();
    const { topic, keyword = "", audience = "Pembaca umum", language = "Indonesia", length = 1200, tone = "Informatif dan profesional" } = body;
    if (!topic || typeof topic !== "string") return Response.json({ error: "Topik artikel wajib diisi." }, { status: 400 });
    const prompt = `Tulis artikel SEO berkualitas dalam bahasa ${language}. Topik: ${topic}. Keyword utama: ${keyword || topic}. Target pembaca: ${audience}. Gaya: ${tone}. Panjang sekitar ${length} kata. Berikan struktur H1/H2/H3 yang logis, pembuka yang menarik, informasi spesifik dan berguna, contoh praktis, kesimpulan, serta FAQ singkat. Jangan mengarang statistik, kutipan, atau sumber. Tandai klaim yang perlu diverifikasi. Kembalikan HANYA JSON valid dengan properti article (Markdown, tanpa H1 karena judul terpisah), metaTitle (maksimal 60 karakter), metaDescription (120-170 karakter), slug (lowercase-hyphen).`;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: Netlify.env.get("OPENAI_MODEL") || "gpt-4o-mini", temperature: 0.7, response_format: { type: "json_object" }, messages: [{ role: "system", content: "Anda adalah editor SEO berbahasa Indonesia. Hasil harus akurat, orisinal, mudah dibaca, dan mematuhi format JSON yang diminta." }, { role: "user", content: prompt }] })
    });
    const data = await response.json();
    if (!response.ok) return Response.json({ error: data.error?.message || "OpenAI API request gagal." }, { status: response.status });
    const result = JSON.parse(data.choices?.[0]?.message?.content || "{}");
    if (!result.article) throw new Error("Respons AI tidak berisi artikel.");
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message || "Terjadi kesalahan saat generate." }, { status: 500 });
  }
};