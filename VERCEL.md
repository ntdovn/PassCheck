# 🚀 Deploy Frontend to Vercel

## Quick Steps:

1. **Go to [Vercel.com](https://vercel.com/)** and login

2. **Import Project**
   - Click "Add New" → "Project"
   - Import from GitHub: `ntdovn/PassCheck`

3. **Configure Project**
   - Framework Preset: **Vite**
   - Root Directory: **`frontend`**
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)

4. **Add Environment Variable**
   ```
   VITE_API_URL=https://passcheck-production.up.railway.app/api
   ```

5. **Deploy!** 🎉

6. **Add Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add: `passcheck.carterfill.me`
   - Configure DNS:
     ```
     Type: CNAME
     Name: passcheck
     Value: cname.vercel-dns.com
     ```
   - Wait 5-30 minutes for DNS propagation

## Done! 
Your website will be live at:
- Vercel URL: `https://your-project.vercel.app`
- Custom Domain: `https://passcheck.carterfill.me`

---

Made with ❤️ by Carter Fill
