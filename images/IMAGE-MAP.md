# Image Map

The site references the following image files. The HTML is already wired
up — you just need to download each source image and save it at the
indicated path, then commit.

## The four images you sent

| # | Source URL (original, may expire) | Save as | Used on |
|---|------------------------------------|---------|---------|
| 1 | `https://lh4.googleusercontent.com/proxy/IJ3h08JvhJPy4V-QAj0s2BdUGd9lNJ2MpG2ILykPb3rR8jVvJPNzfbBkO9JcgrBDHTiaezZF3z6Gm6VFCg1xhhOmjoMdgz7m-_-SVW6-MQkP_N4l3E8cmo8hahGwmxoA5SMZOWnlm7qdtEqybCSORDqqhH18Ks2EAg` | `images/hero/tubes-hero.jpg` | Home hero background |
| 2 | `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIHXNLblbcMT3IzsIE-X7BIx8ItCWXedftuA&s` | `images/about/bill-portrait.jpg` | About page portrait |
| 3 | `https://m.media-amazon.com/images/M/MV5BNzExODMxZDUtZmJhMS00MWFhLWE1N2UtZWE0OTdmYjc3NTY0XkEyXkFqcGc@._V1_QL75_UX297_.jpg` | `images/tubes/tubes-hero.jpg` | The Tubes hero background |
| 4 | `https://musoscribe.com/images/tubes_yrback.jpg` | `images/tubes/tubes-yrback.jpg` | The Tubes about-section portrait |

## Why can't we just link to the URLs directly?

- **Google proxy URLs** (`lh4.googleusercontent.com`, `encrypted-tbn0.gstatic.com`)
  block third-party referrers and their tokens expire — they'll appear to
  work for a few hours, then return 403 or a broken image.
- **Amazon media URLs** often work but can change without notice.
- **musoscribe.com** — hotlinking from someone else's server is bad
  etiquette and breaks the day they rename the file.

Hosting the images in this repo means they ship with every deploy and
never break.

## How to save the images

**On macOS / Chrome:** right-click the image → "Save Image As..." → choose
the filename from the table above.

**On the command line (from the repo root):**

```bash
curl -L -o images/hero/bill-hero.jpg \
  "https://lh4.googleusercontent.com/proxy/IJ3h08JvhJPy4V-QAj0s2BdUGd9lNJ2MpG2ILykPb3rR8jVvJPNzfbBkO9JcgrBDHTiaezZF3z6Gm6VFCg1xhhOmjoMdgz7m-_-SVW6-MQkP_N4l3E8cmo8hahGwmxoA5SMZOWnlm7qdtEqybCSORDqqhH18Ks2EAg"

curl -L -o images/about/bill-portrait.jpg \
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIHXNLblbcMT3IzsIE-X7BIx8ItCWXedftuA&s"

curl -L -o images/tubes/tubes-hero.jpg \
  "https://m.media-amazon.com/images/M/MV5BNzExODMxZDUtZmJhMS00MWFhLWE1N2UtZWE0OTdmYjc3NTY0XkEyXkFqcGc@._V1_QL75_UX297_.jpg"

curl -L -o images/tubes/tubes-yrback.jpg \
  "https://musoscribe.com/images/tubes_yrback.jpg"
```

Note: the Google URLs may 403 via `curl` because of referrer checks. If
so, use "Save Image As" from a browser.

## Then commit them

```bash
git add images/
git commit -m "Add hero photos"
git push
```

Render will auto-deploy.

## A note on rights

These images are almost certainly not in the public domain. If this is
the official Bill Spooner site, get permission from the photographer(s)
or use photos you/Bill own. Using Google Image Search thumbnails long-term
is asking for a takedown notice.
