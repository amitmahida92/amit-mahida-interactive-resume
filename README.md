# Amit Mahida Interactive Resume

Modern React resume experience for Amit Mahida, built from the latest full-stack architect resume PDF, with an animated architecture hero, recruiter-focused metrics, timeline interactions, skill filters, and a downloadable PDF.

## Repository

- Owner: `amitmahida92`
- Repository: `amit-mahida-interactive-resume`
- Live site: `https://amitmahida92.github.io/amit-mahida-interactive-resume/`
- Custom domain: `amitmahida.dev` (pending DNS and HTTPS verification)
- Resume PDF: `public/Amit_Mahida_FullStack_Architect.pdf`

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173/`.

## Build

```bash
npm run build
```

The production output is generated in `dist/`.

## Deploy

This project includes a GitHub Pages workflow at `.github/workflows/deploy.yml`.
Push to the `main` branch and the site deploys through GitHub Actions to GitHub Pages.

The current fallback URL is `https://amitmahida92.github.io/amit-mahida-interactive-resume/`. Switch the workflow base back to `/` and restore `public/CNAME` when `amitmahida.dev` DNS and HTTPS verification are ready.
