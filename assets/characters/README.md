# Georgia und Tobias

Die elf transparenten PNGs in `stages/` verwenden die freigegebenen Figuren Georgia G3-A und Tobias T1-A aus `references/`. Die [gemeinsame Vorschau](vorschau.jpg) zeigt die sechs Stufen aus [Issue #2](https://github.com/venomenon328/ldr-countdown/issues/2).

| Stufe | Restzeit | Dateien |
| --- | --- | --- |
| 1 | Mehr als 21 Tage | `01-georgia.png`, `01-tobias.png` |
| 2 | Mehr als 14 bis einschließlich 21 Tage | `02-georgia.png`, `02-tobias.png` |
| 3 | Mehr als 7 bis einschließlich 14 Tage | `03-georgia.png`, `03-tobias.png` |
| 4 | Mehr als 24 Stunden bis einschließlich 7 Tage | `04-georgia.png`, `04-tobias.png` |
| 5 | Mehr als 0 bis einschließlich 24 Stunden | `05-georgia.png`, `05-tobias.png` |
| 6 | Zielzeitpunkt erreicht oder überschritten | `06-wiedersehen.png` |

## Platzierung auf der Website

Alle PNGs sind 432 × 624 px groß. Die Koordinaten beziehen sich auf die linke obere Bildecke. Georgia steht links und Tobias rechts. Beide Einzelbilder werden am Fußpunkt `(216, 602)` positioniert. Beim Stufenwechsel bleiben die beiden Fußpunkte an ihrer aktuellen Position.

Die Paarpose wird mit `(216, 602)` am Treffpunkt ausgerichtet. Dort liegen die Fußpunkte Georgias und Tobias’ im Paarbild bei `(80, 602)` und `(351, 602)`. Die beiden Einzelfiguren laufen bis zu diesen Positionen. Relativ zum Treffpunkt sind das horizontal `−136` und `+135` Bildpixel, jeweils multipliziert mit demselben Skalierungsfaktor wie die Bilder. Auch an diesen Positionen liegt zwischen den Silhouetten der Einzelfiguren ein sichtbarer Abstand.

## Bildgenerierung

Beide freigegebenen PNGs dienten in jeder ImageGen-Anfrage als direkte visuelle Referenzen. Die Prompts verlangten Ganzkörperzeichnungen in warmer, fein konturierter Chibi-Zeichenweise mit derselben Kleidung, demselben Schmuck, denselben Proportionen, leichtem Lichteinfall von links oben und echter Transparenz.

- **Stufe 1** · Gesenkte Schultern, gesenkter Mund und große Tränen auf beiden Wangen.
- **Stufe 2** · Trockene Augen, trauriger Blick zum Gegenüber und zurückhaltende, geschlossene Haltung.
- **Stufe 3** · Wehmütige Brauen, ein kleines Lächeln und gelockerte Schultern. Georgia legt eine Hand ans Herz, Tobias öffnet eine Hand auf Hüfthöhe.
- **Stufe 4** · Breites Lächeln, offene Schultern und einladende Hände.
- **Stufe 5** · Strahlende Augen, gebeugte Knie und erwartungsvoll angewinkelte Arme. Die Hände bleiben nah am eigenen Körper.
- **Stufe 6** · Wange an Wange, Georgias Arm um Tobias’ Schulter und sein Arm um ihre Taille. Beide neigen sich von ihren getrennten Standpunkten zur Mitte. Das erste Bild der Umarmung diente zusätzlich als Referenz für Mimik und Armhaltung.
