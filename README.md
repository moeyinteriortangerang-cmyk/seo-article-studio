# SEO Article Studio

Aplikasi web untuk membuat draft artikel SEO dengan OpenAI, melakukan audit on-page dasar, dan mengunduh artikel sebagai Markdown.

## Fitur
- Generator artikel melalui Netlify Function dan OpenAI API.
- Meta title, meta description, dan URL slug.
- Audit SEO heuristik (bukan skor Google atau jaminan peringkat).
- Ekspor Markdown dan salin artikel.
- Endpoint pemeriksaan token Medium lama.

## Deploy ke Netlify
1. Hubungkan repository ini ke Netlify.
2. Build settings: publish directory `public`; functions directory `netlify/functions`.
3. Tambahkan environment variable `OPENAI_API_KEY` sebagai secret.
4. Opsional: `OPENAI_MODEL` (default `gpt-4o-mini`).
5. Deploy ulang setelah mengubah environment variables.

OpenAI API ditagihkan terpisah dari langganan ChatGPT. Jangan pernah menaruh API key di kode frontend atau commit ke Git.

## Medium
Medium tidak lagi menyediakan integration token baru secara umum. Endpoint pemeriksaan hanya berguna bila Anda sudah memiliki token legacy yang valid. Bila tidak, gunakan ekspor Markdown dan terbitkan secara manual.

## Batasan
- Audit SEO adalah pemeriksaan heuristik lokal, bukan penilaian Google.
- Artikel AI harus diperiksa fakta, sumber, dan orisinalitasnya sebelum diterbitkan.
- Draft tersimpan di browser; aplikasi ini belum menyediakan sinkronisasi cloud atau akun pengguna.
