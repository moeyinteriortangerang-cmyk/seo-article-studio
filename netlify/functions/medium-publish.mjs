export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const token = Netlify.env.get("MEDIUM_INTEGRATION_TOKEN");
  if (!token) return Response.json({ error: "Token Medium belum dikonfigurasi." }, { status: 400 });
  try {
    const { title, content, tags = [], publishStatus = "draft" } = await req.json();
    if (!title || !content) return Response.json({ error: "Judul dan konten wajib diisi." }, { status: 400 });
    const me = await fetch("https://api.medium.com/v1/me", { headers: { Authorization: `Bearer ${token}` } });
    const meData = await me.json();
    if (!me.ok || !meData.data?.id) return Response.json({ error: "Token Medium tidak valid." }, { status: 401 });
    const result = await fetch(`https://api.medium.com/v1/users/${meData.data.id}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ title, contentFormat: "markdown", content, tags: tags.slice(0, 5), publishStatus: ["draft", "unlisted", "public"].includes(publishStatus) ? publishStatus : "draft" })
    });
    const data = await result.json();
    if (!result.ok) return Response.json({ error: data.errors?.[0]?.message || "Gagal menerbitkan ke Medium." }, { status: result.status });
    return Response.json({ url: data.data?.url, id: data.data?.id });
  } catch (error) {
    return Response.json({ error: error.message || "Gagal menerbitkan." }, { status: 500 });
  }
};