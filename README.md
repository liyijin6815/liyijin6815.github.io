# Yijin Li Academic Homepage

This is the editable v3 academic homepage. It keeps content, images, layout, and interactions separated so routine updates do not require changing the page template.

## Quick Start

For most updates, only edit:

1. `v3/content.md` for text, dates, links, publications, projects, awards, activities, collaborators, and image paths.
2. `v3/assets/images/` for the profile photo, project figures, and update images.

## File Structure

```text
.
|-- README.md              # This editing and publishing guide
|-- _config.yml            # Minimal GitHub Pages / Jekyll settings
|-- Gemfile                 # Local Jekyll/GitHub Pages dependency
|-- .gitignore              # Local build output exclusions
`-- v3/
    |-- content.md         # Main editable content file
    |-- index.html         # Jekyll/Liquid page template, published at /
    |-- styles.css         # Typography, colors, texture, spacing, and responsive layout
    |-- app.js             # Filters, project dialogs, navigation, and scrolling
    `-- assets/
        `-- images/
            |-- profile.jpg
            `-- project-sfuda.jpg
```

## Editing `v3/content.md`

`v3/content.md` keeps all editable content inside one YAML front matter block. The About text lives in the `about_markdown` field and still supports normal Markdown links and bold text. Keep the opening and closing `---` markers intact, preserve indentation, and use spaces rather than tabs.

### Profile and links

Edit `profile` to update the name, degree, affiliation, email, location, Google Scholar, and GitHub links.

```yaml
profile:
  name: Yijin Li
  email: liyijin6815@qq.com
  scholar_url: https://scholar.google.com/...
  github_url: https://github.com/liyijin6815
```

### Latest updates

Add items under `updates` and keep dates in `Month Year` format.

```yaml
updates:
  - date: August 2026
    title: Update title
    description: One concise sentence.
    image: /v3/assets/images/update-example.jpg
```

### Project highlights

Each entry under `projects` creates a horizontally scrollable card and a clickable detail dialog.

```yaml
projects:
  - id: example-project
    title: Project title
    summary: One-sentence card description.
    description: Longer detail shown after clicking the project.
    image: /v3/assets/images/project-example.jpg
    image_alt: Description of the image
    outputs:
      - "MICCAI 2026 - Publication title"
```

Use a unique lowercase `id` with hyphens for every project.

### Publications

The publication category and authorship fields drive the filter buttons automatically.

```yaml
publications:
  - title: Paper title
    authors_html: "<strong>Yijin Li</strong>, Author Two"
    venue: MICCAI
    year: "2026"
    category: conference
    paper_type: Conference Paper
    presentation: Oral
    first_author: true
    paper_url: https://example.com/paper
    code_url: https://github.com/example/project
```

Allowed `category` values are `journal`, `conference`, and `abstract`. Set `first_author` to `true` or `false`. For co-first authorship, add `<sup>#</sup>` after the relevant names in `authors_html`.

When a paper or code link is unavailable, leave it empty:

```yaml
paper_url: ""
code_url: ""
```

The page will display a disabled placeholder until a URL is added.

### Awards, funding, activities, and collaborators

- `selected_awards`: concise awards shown in About.
- `funding`: selected grants shown below the awards.
- `awards`: complete awards list in the scrollable records panel.
- `activities`: talks, presentations, and academic activities.
- `collaborators`: collaborator blocks; leave `url` empty when no public profile is available.

## Adding Images

1. Put the image in `v3/assets/images/`.
2. Use a short lowercase filename with hyphens, such as `miccai-2026.jpg`.
3. Reference it from `v3/content.md` with a root-relative path:

```yaml
image: /v3/assets/images/miccai-2026.jpg
```

Avoid spaces and Chinese characters in filenames. Compress large images before publishing when possible.

## Advanced Changes

- Edit `v3/styles.css` to change fonts, colors, paper texture, spacing, or responsive breakpoints.
- Edit `v3/app.js` to change filtering, navigation, scrolling, or dialog behavior.
- Edit `v3/index.html` only when changing the page structure or adding a new section.

Routine content edits should not require changes to these files.

## Local Preview

The page uses Jekyll, matching GitHub Pages:

```bash
bundle install
bundle exec jekyll serve
```

Open `http://127.0.0.1:4000/`. Although the source files live in `v3/`, the page template publishes directly to the site root.

## Publishing

The repository must be named exactly `liyijin6815.github.io` for the root user-site URL.

```bash
git add .
git commit -m "Update homepage content"
git push origin main
```

GitHub Pages publishes it at `https://liyijin6815.github.io/`. A rebuild can take several minutes. Check **Settings > Pages** if the site does not appear.
