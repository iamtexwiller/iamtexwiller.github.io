# iamtexwiller.github.io

Personal portfolio and resume landing page for **Tex Willer Gusman dos Santos** — Application Support Engineer L2 | Hybrid Cloud & On-Prem @ B3.

🌐 Live at: [texwiller.com.br](https://texwiller.com.br)

---

## 🏗️ Built with

- **HTML5** — semantic structure, no frameworks
- **CSS3** — custom properties, CSS Grid, Flexbox, keyframe animations
- **Vanilla JavaScript** — no dependencies, no bundler
- **Google Fonts** — Bebas Neue, Syne, JetBrains Mono

No build step. No npm. No framework. Just files.

---

## 📁 Project structure

```
iamtexwiller.github.io/
│
├── index.html        → Full HTML structure
├── css/
│   └── style.css     → All styles: variables, layout, animations, responsive
├── js/
│   └── main.js       → Custom cursor, scroll reveal, active nav on scroll
└── assets/
    └── *.png         → Certification badges (sourced from Credly & Microsoft Learn)
```

---

## 🎨 Design decisions

| Decision | Rationale |
|---|---|
| Dark background `#000` | High contrast, reduces eye strain, editorial feel |
| Accent color `#c8ff00` (lime) | Strong visual identity, stands out on dark |
| Bebas Neue for headings | Bold, impactful — matches the infrastructure/ops profile |
| JetBrains Mono for body | Nods to the technical nature of the work |
| CSS Grid for layout | No framework needed; full control over structure |
| `mix-blend-mode: difference` on nav | Keeps nav readable over any background |
| Scroll reveal via IntersectionObserver | Native API, zero dependencies |

---

## ☁️ Infrastructure & Hosting

Hosted on **Azure Static Web Apps** (Free tier) with custom domain.

| Service | Role |
|---|---|
| Azure Static Web Apps | Hosting + SSL + global CDN |
| GitHub Actions | CI/CD — auto deploy on every push to `main` |
| Registro.br | Domain registrar for `texwiller.com.br` |

Deploy pipeline:

```
git push → GitHub Actions → Azure Static Web Apps → texwiller.com.br
```

Every push to `main` triggers an automatic build and deploy via the GitHub Actions workflow injected by Azure at setup time. Zero manual steps after the initial configuration.

---

## 🏷️ Certification badges

Badges are loaded from the `assets/` folder with a Credly/Microsoft Learn URL as `onerror` fallback.

Sources:
- **Credly** — AWS, LPIC-1, VCTA-DCV, ITIL 4, Red Hat, Oracle OCI
- **Microsoft Learn** — AZ-104, SC-900, DP-900, PL-900, AI-901, AB-730, AB-731
- **GitHub** — GitHub Foundations

---

## 📄 License

This project is open source. Feel free to use the structure as a base for your own portfolio — just swap the content.
