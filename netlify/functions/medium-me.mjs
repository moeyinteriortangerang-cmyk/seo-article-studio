export default async () => {
  const token = process.env.MEDIUM_INTEGRATION_TOKEN;
  if (!token) return Response.json({ error: "MEDIUM_INTEGRATION_TOKEN belum dikonfigurasi. Anda tetap bisa mengunduh Markdown dan menerbitkan manual." }, { status: 400 });
  try {
    const r = await fetch("https://api.medium.com/v1/me", { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } });
    const data = await r.json();
    if (!r.ok) return Response.json({ error: data.errors?.[0]?.message || "Token Medium tidak valid atau sudah kedaluwarsa." }, { status: r.status });
    return Response.json({ username: data.data?.username || data.data?.name || "akun Medium" });
  } catch {
    return Response.json({ error: "Tidak dapat menghubungi Medium API." }, { status: 502 });
  }
};