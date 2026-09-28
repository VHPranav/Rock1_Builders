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
