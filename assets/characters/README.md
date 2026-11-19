# Georgia und Tobias

Die [gemeinsame Vorschau](vorschau.jpg) zeigt die 13 Zustände aus [Issue #5](https://github.com/venomenon328/ldr-countdown/issues/5). Für die Einzelbilder in `stages/` gilt der Dateistamm aus der Tabelle mit `-georgia.png` oder `-tobias.png` als Endung.

Jede Stufe beginnt beim Erreichen ihrer Schwelle und läuft bis zum Beginn der nächsten. Maßgeblich ist die ungerundete Restzeit, ein Tag entspricht 24 Stunden.

| Stufe | Eintritt bei Restzeit | Motiv | Dateistamm bzw. Paarbild |
| --- | --- | --- | --- |
| 1 | Mehr als 21 Tage | Großer Trennungsschmerz | `01` |
| 2 | 21 Tage | Stilles Vermissen | `02` |
| 3 | 17 Tage | Ein kleiner Trost | `03-foto` |
| 4 | 14 Tage | Erstes Lächeln | `03` |
| 5 | 10 Tage | Ein Kuss durchs Handy | `05-handykuss` |
| 6 | 7 Tage | Vorfreude | `04` |
| 7 | 4 Tage | Die Zeit gemeinsam vertreiben | `07-controller` |
| 8 | 2 Tage | Platz für zwei | `08-platz-fuer-zwei` |
| 9 | 24 Stunden | Kaum noch auszuhalten | `05` |
| 10 | 16 Stunden | Koffer packen | `10-kofferpacken` |
| 11 | 8 Stunden | Gleich geht’s los | `11-aufbruch` |
| 12 | 6 Stunden | Tobias ist unterwegs | `12-anreise` |
| 13 | 0 oder abgelaufen | Endlich wieder zusammen | `06-wiedersehen.png` |

## Platzierung auf der Website

Alle Stufen-PNGs sind 432 × 624 px groß. Die Koordinaten beziehen sich auf die linke obere Bildecke. Georgia steht links und Tobias rechts. Beide Einzelbilder werden am Fußpunkt `(216, 602)` positioniert. Bei angehobenem Fuß zählt der Bodenkontakt des Standbeins. Beim Stufenwechsel bleiben die beiden Fußpunkte an ihrer aktuellen Position.

Die Paarpose wird mit `(216, 602)` am Treffpunkt ausgerichtet. Dort liegen die Fußpunkte Georgias und Tobias’ im Paarbild bei `(80, 602)` und `(351, 602)`. Die beiden Einzelfiguren laufen bis zu diesen Positionen. Relativ zum Treffpunkt sind das horizontal `−136` und `+135` Bildpixel, jeweils multipliziert mit demselben Skalierungsfaktor wie die Bilder. Auch an diesen Positionen liegt zwischen den Silhouetten der Einzelfiguren ein sichtbarer Abstand.

## Bildgenerierung

[Georgia G3-A](references/georgia.png) und [Tobias T1-A](references/tobias.png) dienten dem integrierten ImageGen in jeder neuen Anfrage als direkte visuelle Referenzen. Eine vorhandene Einzelpose gab jeweils Zeichenstil, Proportionen und Blickrichtung vor. Die Prompts verlangten fein konturierte Ganzkörperzeichnungen mit derselben Kleidung und denselben Accessoires, Lichteinfall von links oben, echte Transparenz, vollständig sichtbare Requisiten und schriftfreie Oberflächen. Die Zeichnungen wurden anschließend im PNG-Rahmen am Fußpunkt ausgerichtet.

- **Stufe 3** · Georgia drückt ein Foto von Tobias ans Herz. Tobias betrachtet Georgias Foto und streicht mit dem Daumen über den Rand. Beide Fotos zeigen die gezeichneten Figuren.
- **Stufe 5** · Georgia schickt einen Handkuss in die Handykamera. Tobias schaut errötend aufs Display.
- **Stufe 7** · Beide halten einen Controller. Georgia grinst siegessicher, Tobias beugt sich vor Konzentration nach vorn.
- **Stufe 8** · Georgia stellt eine grüne neben eine cremefarbene Tasse. Tobias vergleicht zwei Filmhüllen mit einer Rakete und einer Berglandschaft als Bildmotive.
- **Stufe 10** · Georgia schüttelt ein zweites Kopfkissen links vor ihrem Körper auf. Tobias drückt den letzten gefalteten Pulli in den offenen Rollkoffer zwischen seinen Schuhen.
- **Stufe 11** · Georgia schaut auf ihre Armbanduhr und hebt die Fersen. Tobias bindet im Stehen einen Schuh und trägt die Jacke über dem Arm.
- **Stufe 12** · Georgia hält lächelnd Ausschau und beschattet mit der Hand ihre Augen. Tobias zieht den geschlossenen ockerfarbenen Rollkoffer im Schritt hinter sich her, die offene Jacke weht nach hinten.
