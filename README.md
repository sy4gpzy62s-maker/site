# Student publication website (Georgian)

A static website (HTML + CSS + JavaScript, no build step) ready for **GitHub Pages**.

Pages: `index.html` (home) · `submissions.html` (gallery with search + filter) · `submission.html?id=...` (detail page rendered from data).

All links are **relative**, so the site works under `https://USERNAME.github.io/REPO-NAME/` with no base-path configuration. Do not change links to start with `/`.

## Structure
```
index.html            home page
submissions.html      student works gallery
submission.html       detail page for one work
404.html              redirects unknown URLs to home
.nojekyll             tells GitHub Pages to serve files as-is
css/style.css         all styling (colors are variables at the top)
js/content.js         ALL site text (empty - you fill it)
js/app.js             rendering logic (no need to edit)
data/submissions.js   list of student works + type labels
assets/covers/        cover images
assets/files/         PDFs, presentations, posters to download
```

## 1. Upload to GitHub
**Without installing anything**
1. Sign in at github.com → **New repository** → name it (e.g. `my-site`), keep it **Public** → *Create repository*.
2. Unzip this project on your computer.
3. In the new repo click **uploading an existing file**, drag in *everything inside the unzipped folder* (including the `css`, `js`, `data`, `assets` folders and the hidden `.nojekyll` file), then **Commit changes**.
   `index.html` must be at the repository root, not inside an extra folder.

**With Git**
```bash
cd project-folder
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git push -u origin main
```

## 2. Publish with GitHub Pages
Repository → **Settings → Pages** → *Build and deployment* → Source: **Deploy from a branch** → Branch: **main** / folder **/ (root)** → **Save**.
After 1–2 minutes the site is live at `https://USERNAME.github.io/REPO-NAME/`.

## 3. Add your text
Open `js/content.js` and write text between the quotes (site name, hero, intro, footer, button labels...).
While a field is empty the page shows a soft grey bar. When finished set `showPlaceholders: false` and any still-empty areas disappear.
The navigation labels already contain the two page names from your brief; change them there if you like.
Logo: put the file in `assets/` and set `logo: "assets/your-logo.svg"`.
Colors: edit the variables at the top of `css/style.css`.

## 4. Add student works
Open `data/submissions.js`.
1. Fill the `label` of each type (research, essay, presentation, poster, info).
2. Copy the TEMPLATE from the comment, paste it inside `window.SUBMISSIONS = [ ... ]`, and fill it in. Separate several works with commas.
3. Put the cover image in `assets/covers/` and files in `assets/files/`, then reference them: `cover: "assets/covers/work-1.jpg"`.
4. `content` accepts HTML (`<p>`, `<h2>`, `<img src="assets/...">`, lists, quotes).
   For presentations/posters use `embed` (e.g. a Google Slides "publish to web" URL or a PDF URL) and/or `files` for download links.
5. Each work automatically gets its own card, its own page (`submission.html?id=YOUR-ID`), search and filtering.
   The `id` must be unique and use latin letters, digits or dashes.

## 5. Update the site later
**In the browser:** open the file on GitHub → pencil icon → edit → **Commit changes**. To add images/PDFs: *Add file → Upload files* inside `assets/...`.
**With Git:**
```bash
git add .
git commit -m "Add new student work"
git push
```
GitHub Pages republishes automatically in about a minute (press Ctrl+F5 to bypass the browser cache).

## Test locally
Open `index.html` in a browser, or run `python3 -m http.server 8000` and visit `http://localhost:8000`.

## Troubleshooting
- Blank styling → `css/` folder was not uploaded, or files are inside an extra folder.
- 404 after enabling Pages → wait a couple of minutes; check Settings → Pages shows the branch `main` and `/ (root)`.
- Image not showing → file names are case-sensitive on GitHub (`Photo.JPG` ≠ `photo.jpg`).
- Do not store sensitive personal data of students (full contact details etc.) in a public repository.
