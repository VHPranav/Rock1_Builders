# Image prompts — Google Flow

Shared style, appended to every prompt so the set feels like one shoot:

> Editorial architectural photography, shot on 35mm film, visible fine film grain, soft natural light, muted warm palette of linen, sand and stone, calm and minimal composition, high-end real estate magazine, no people facing camera, no text, no logos.

Aspect ratio: **portrait (3:4, or 9:16 if 3:4 isn't offered)**. Each image fills half the screen on desktop.
Save as `public/images/services/<file>.jpg` and set the path in `src/content/home.ts` → `services.items[n].images`.

## 01 · Property Development & Investment Management — tone: olive `#6b6f4e`

| File | Prompt |
| --- | --- |
| `development-left.jpg` | Low-angle view of a modern Mediterranean apartment building under construction nearing completion, pale limestone facade and deep balconies, olive trees in the foreground, soft late-afternoon light, Adriatic hills behind. + shared style |
| `development-right.jpg` | Close-up architectural detail of a finished luxury residence: travertine cladding, slim bronze window frames, shadows of an olive branch across the wall, olive-green and stone tones. + shared style |

## 02 · Residency Management Services — tone: clay `#9c5b3c`

| File | Prompt |
| --- | --- |
| `residency-left.jpg` | Terracotta-tiled terrace of a premium resort residence overlooking the Bay of Kotor in Montenegro, linen lounge chairs, warm golden hour light, mountains across the water. + shared style |
| `residency-right.jpg` | Serene interior of a resort apartment: lime-plaster walls in warm clay tones, linen curtains moving in the breeze, a wooden table with a ceramic vase, sea glimpsed through an arched window. + shared style |

## 03 · Property Rental Management Assistance — tone: slate blue `#46596a`

| File | Prompt |
| --- | --- |
| `rental-left.jpg` | Calm, well-kept seaside apartment ready for guests: made bed with crisp white linen, slate-blue accents, morning light through shutters, Adriatic sea view. + shared style |
| `rental-right.jpg` | Exterior of a modern coastal residence at blue hour, slate-blue sea and sky, warm light glowing from the windows, clean landscaped entrance path. + shared style |

---

# Gateway to Europe tiles (Life Bay Montenegro)

Same shared style as above, and every prompt must read as **Montenegro** (Bay of Kotor, Budva, limestone mountains, stone villages, terracotta roofs). Aspect ratio **3:4** (tiles crop slightly to 4:5 / square).
Save as `public/images/gateway/<file>.webp` and set `gateway.tiles[n].image` in `src/content/home.ts`.

| File | Prompt |
| --- | --- |
| `amenities.webp` | Infinity pool at a luxury Mediterranean residential resort on the Adriatic coast, pool edge meeting the sea, loungers and landscaped gardens, soft morning light, warm sand and stone tones. + shared style |
| `wellness.webp` | Clearly set in Montenegro: seaside yoga deck of an Ayurvedic wellness retreat on the Bay of Kotor, rolled linen mats, brass singing bowls and fresh flowers on weathered stone, calm fjord-like water, steep limestone mountains across the bay, small stone village with terracotta roofs on the far shore, early morning mist, no people. + shared style |
| `connectivity.webp` | Clearly set in Montenegro: elevated view of the winding Adriatic coastal road above Budva, road hugging limestone cliffs with cypress trees, the old walled town of Budva with terracotta roofs on a peninsula below, turquoise and slate-blue sea, rugged mountains behind, late-afternoon light. + shared style |
| `sustainability.webp` | Clearly set in Montenegro: modern low-rise residential building of pale local limestone on a terraced hillside above the Adriatic near Budva, rooftop solar panels, olive trees, lavender and rosemary, stone rainwater channels, dry-stone terrace walls, limestone mountains and sea behind, olive-green tones. + shared style |
| `family.webp` | Clearly set in Montenegro: shaded courtyard garden in a secure residential community built in traditional Montenegrin coastal style, pale limestone walls, green wooden shutters and terracotta roofs like the Bay of Kotor old towns, small natural timber playground, stone paths, olive and fig trees, bougainvillea, afternoon light, no people. + shared style |

---

# Why Choose Montenegro cards

Same shared style, clearly **Montenegro**. Aspect ratio **3:4** (cards crop to 4:5).
Save as `public/images/why/<file>.webp` and set `whyMontenegro.reasons[n].image` in `src/content/home.ts`.

| File | Prompt |
| --- | --- |
| `economy.webp` | Modern marina in Tivat on the Bay of Kotor, new low-rise residential buildings of pale stone along the waterfront, sleek yachts moored, mountains behind, crisp morning light, slate-blue water. + shared style |
| `tax-living.webp` | Stone café terrace on a quiet square in Kotor old town, two espresso cups on a small marble table, green shutters and terracotta tones, warm morning light, relaxed and unhurried, no people. + shared style |
| `stability.webp` | Stately Venetian-era stone palazzo facade in Perast on the Bay of Kotor, pale limestone, arched windows and green shutters, calm water in front, timeless and solid, soft afternoon light. + shared style |
| `nature.webp` | Skadar Lake in Montenegro with water lilies and winding river bends between green karst hills, layered mountains fading into haze, olive-green tones. + shared style |
| `tourism.webp` | View from the coastal road toward the Sveti Stefan island village off the Montenegrin coast, pink sand beach with neat rows of parasols below, turquoise sea, summer light. + shared style |
| `climate.webp` | Sunlit terrace with lemon and olive trees in terracotta pots overlooking the Adriatic near Budva, linen lounge chair, deep blue sky, relaxed Mediterranean lifestyle, no people. + shared style |

---

# Our Projects backgrounds (illustrative)

These depict **real, named developments**, so each prompt uses only features documented on that project's page, and the section shows an "Images are illustrative" note. Montenegro projects are set in Montenegro; Indian projects are set in **Kerala** (never Montenegro). Aspect ratio **16:9** (full-screen backgrounds).
Save as `public/images/projects/<file>.webp` and set `projects.items[n].image` in `src/content/home.ts`. Replace with real photography when the client supplies it.

| File | Prompt |
| --- | --- |
| `life-bay.webp` | Montenegro: modern low-rise pale-stone apartment building with sea-view balconies on a terraced hillside at Dobra Voda (Bar Riviera), pool and landscaped terrace, parking below, Adriatic and coastal mountains beyond, late-afternoon light. + shared style, space at bottom for text |
| `ocean-crest.webp` | Montenegro: row of modern two-storey coastal villas near Dobra Voda, each with a private sea-view infinity pool and Mediterranean garden (olive, lavender), Adriatic to the horizon, golden hour. + shared style |
| `royal-habitat.webp` | Kerala: grand modern luxury residence on a large green plot, tropical architecture with deep sloped roofs, timber, laterite and glass, private pool, landscaped garden and fruit orchard (mango, banana), coconut palms, evening light. + shared style |
| `rock-star-vazhakkala.webp` | Kerala: large contemporary luxury bungalow on a landscaped estate, timber screens, stone and glass, lawns and tropical gardens, small private play area, wide multi-car garage, palms, dusk with interior lights. + shared style |
| `rock-valley.webp` | Kerala: contemporary four-bedroom villa in a green enclave of Kakkanad, white and timber facade, sloped tiled roof, private pool, tropical garden (frangipani, palms), soft morning light after rain. + shared style |
| `misty-blue.webp` | Munnar, Kerala: boutique five-star lake resort in misty hills, low stone-and-timber buildings around a calm lake and pool, small open-air amphitheatre, tea plantations and layered hills in mist. + shared style |

---

# Footer background

Clearly **Montenegro**, 16:9, centre kept calm for the menu card.
Save as `public/images/footer/footer.webp` and set `footer.image` in `src/content/site.ts`.

| File | Prompt |
| --- | --- |
| `footer.webp` | Serene living room of a modern coastal residence on the Bay of Kotor at dusk, floor-to-ceiling glass wall over calm fjord-like water, limestone mountains and a stone village with terracotta roofs and warm lights on the far shore, pale limestone floor, oak and linen furniture kept low and to the sides so the centre stays uncluttered, blue-hour light. + shared style |

## Life Bay project page: band video (2026-10-04)

Google Flow (Pranav V H), image-to-video from the real render (`design/flow/life-bay-start-frame.jpg`, 16:9 crop of the old site's Life Bay render). 8 s, 1080p upscale; original in `design/flow/life-bay-film-flow.mp4`, muted web copy `public/videos/life-bay.mp4`, poster `public/images/projects/life-bay/film-poster.webp`.

> Generate one 8-second video in 16:9 landscape, using the attached image as the exact first frame. The camera stays almost still: only a very slow, subtle push-in (about 5% closer) from the same viewpoint, no orbit, no pan, no change of angle. The building must stay identical to the image for the whole clip: same shape, same four floors, same cream and taupe walls, same balconies and the same orange timber slat panels; do not redesign or morph anything. Only the atmosphere moves: soft clouds drift slowly across the blue sky, warm late-afternoon sunlight gently brightens the facade, trees and palm leaves sway in a light breeze, reflections ripple on the wet forecourt, the people walk slowly. Photoreal, calm, cinematic, subtle film grain, no text, no logos, no music.

A first attempt with a dolly-and-arc move was rejected: mid-clip the model redesigned the building (different facade and balconies). Keep camera moves minimal for real projects.

## Inner-page hero films (2026-10-04)

Google Flow image-to-video from the existing Flow hero images (centre 16:9 crop of each 3:4 image, saved as `design/flow/<page>-start-frame.jpg`). 8 s, 1080p upscale. Flow's sparkle watermark (bottom right, about x1700–1775 / y865–935 at 1080p) is cropped out by taking the 1696×954 region at (0, 63) and scaling back to 1920×1080. Originals in `design/flow/<page>-film-flow.mp4`, web copies in `public/videos/<page>.mp4`, posters in `public/images/pages/`.

**About Us** (`why/stability.webp`, Perast palazzo):
> Generate one 8-second video in 16:9 landscape, using the attached image as the exact first frame. Perast, Bay of Kotor, Montenegro. The camera stays almost still, with only a very slow, gentle push-in toward the stone palazzo; no pan, no orbit, no change of angle. Keep the architecture identical to the image: the same limestone facade, green shutters, iron balconies and terracotta roofs; do not add, remove or redesign anything. Only the life of the scene moves: soft golden late-afternoon light slowly warming the stone, a green shutter swaying slightly in a light breeze, leaves of the trees and an olive branch moving gently, a few swallows crossing the sky, a person walking slowly past the arched doorway. Calm, photoreal, cinematic, subtle 35mm film grain, no text, no logos, no music.

**Our Services** (`services/residency-left.webp`, terrace over the Bay of Kotor):
> Generate one 8-second video in 16:9 landscape, using the attached image as the exact first frame. A private stone terrace above the Bay of Kotor, Montenegro. The camera stays almost still, with only a very slow, gentle push-in toward the bay; no pan, no orbit, no change of angle. Keep everything in the image identical: the same mountains, coastline, villages, iron railing, stone pillar, loungers and olive tree; do not add, remove or redesign anything. Only nature moves: the olive leaves and the dried grasses in the vase sway softly in a light breeze, gentle ripples and glints of light move across the water, a small boat drifts slowly in the distance, thin clouds pass slowly over the peaks, warm late-afternoon light. Calm, photoreal, cinematic, subtle 35mm film grain, no people, no text, no logos, no music.

**About Montenegro** (`gateway/wellness.webp`, Kotor waterfront):
> Generate one 8-second video in 16:9 landscape, using the attached image as the exact first frame. A waterfront terrace on the Bay of Kotor, Montenegro, with a stone village and bell tower across the calm water. The camera stays almost still, with only a very slow, gentle push-in; no pan, no orbit, no change of angle. Keep everything identical to the image: the same mountains, village, bell tower, shoreline, wooden railing, agave and folded towels; do not add, remove or redesign anything. Only nature moves: soft mist drifting slowly along the mountains, the mirror-like water gently rippling with reflections of the village, plants swaying slightly in a light breeze, soft morning light. Calm, photoreal, cinematic, subtle 35mm film grain, no people, no text, no logos, no music.

The Life Bay film (`public/videos/life-bay.mp4`) had the same watermark cropped out the same way.

## About Us team portraits (2026-10-04)

Google Flow (Nano Banana 2) image edits of the client's own team photos (`design/flow/team/*-source*.jpg`; the CEO's full-length photo was cropped to head and shoulders first). Outputs in `design/flow/team/*-flow.jpg` (896×1200), cropped to 800×1000 at (48, 30) to drop Flow's sparkle watermark (about x771–821 / y1075–1125), exported to `public/images/team/*.webp`. One uniform style: navy jacket, white open-collar shirt, warm side light, Mediterranean terrace bokeh. **Each person should approve their portrait before launch.**

> Edit the attached photo into one image, 3:4 portrait: an ultra close-up professional portrait of this exact man. Keep his face exactly as in the photo: identical facial features, face shape, skin tone, smile, moustache, hair and age; do not change his identity in any way. Dress him in a tailored navy blue suit jacket with a crisp white open-collar shirt, no tie. Tight head-and-shoulders framing, centred, looking at the camera with his natural expression. Soft warm natural window light from the left. Background: a softly blurred warm Mediterranean stone terrace with greenery, rendered as creamy bokeh, very shallow depth of field like an 85mm lens at f/1.4. Photoreal editorial corporate portrait, subtle film grain, no text, no logos, no watermark.

The other three used the same prompt with "in exactly the same style as the previous portrait(s)" and their own features listed (glasses, moustache, beard), plus "no lanyard" for Shekhar D'Costa.

## Montenegro map destinations (2026-10-04)

For the interactive map on About Montenegro (`src/content/montenegroMap.ts`). Generated in one Flow batch (Nano Banana 2, 4:3); originals in `design/flow/map/`, cropped to 1040×780 from the top-left to drop Flow's sparkle and saved as `public/images/map/<file>.webp`. Ulcinj was regenerated (the first came out looking like Sveti Stefan) with: "the old town of Ulcinj … a medieval fortress town of pale stone houses and walls on a rocky promontory rising directly from the sea, with a slender white minaret … It must not be an island and must not look like Sveti Stefan." Shared style for this set:

> Editorial travel photography, shot on 35mm film, visible fine film grain, soft natural light, muted warm palette, calm composition, high-end travel magazine, no people facing camera, no text, no logos.

| File | Place | Prompt |
| --- | --- | --- |
| `kotor.webp` | Kotor (replaces the café detail) | The walled medieval old town of Kotor, Montenegro, at the foot of steep grey limestone mountains on the Bay of Kotor: terracotta rooftops, the twin bell towers of St Tryphon's Cathedral, fortress walls zigzagging up the mountainside, calm fjord-like water. + style |
| `podgorica.webp` | Podgorica | Podgorica, Montenegro: the white cable-stayed Millennium Bridge over the emerald Morača river, the modern capital and green hills behind. + style |
| `bar.webp` | Bar | Stari Bar, Montenegro: the stone ruins of old Bar on a hilltop beneath the Rumija mountains, ancient olive trees, arched walls and the old aqueduct. + style |
| `ulcinj.webp` | Ulcinj | Ulcinj, Montenegro: the hilltop old town of stone houses above the Adriatic, a small beach and pine trees, warm evening light. + style |
| `herceg-novi.webp` | Herceg Novi | Herceg Novi, Montenegro: stepped stone streets and the old clock tower at the entrance to the Bay of Kotor, mimosa and palm trees, terracotta roofs falling to the sea. + style |
| `zabljak.webp` | Žabljak | Žabljak and Durmitor National Park, Montenegro: snow-covered Durmitor peaks reflected in the still Black Lake, dark pine forest along the shore, crisp winter light. + style |
| `podgorica-airport.webp` | Podgorica Airport | Small modern airport terminal in Montenegro at golden hour, mountains behind, a regional jet on the apron. + style |
| `tivat-airport.webp` | Tivat Airport | A passenger jet descending over the Bay of Kotor toward Tivat, Montenegro, limestone mountains and calm water below. + style |
| `velika-plaza.webp` | Velika Plaža | Velika Plaža near Ulcinj, Montenegro: a long, wide fine-sand beach stretching to the horizon along the Adriatic, gentle waves, a few parasols. + style |
| `lovcen.webp` | Lovćen | Lovćen National Park, Montenegro: the Njegoš Mausoleum on the summit of Jezerski vrh, a stone stairway path, mountain ridges falling toward the Bay of Kotor. + style |
| `ostrog.webp` | Ostrog Monastery | Ostrog Monastery, Montenegro: the white monastery built into a sheer cliff face high above the Bjelopavlići plain, mountain backdrop. + style |
| `tara.webp` | Tara Canyon | Tara River Canyon, Montenegro: the white concrete arches of the Đurđevića Tara Bridge spanning the deep forested canyon of the turquoise Tara river. + style |
