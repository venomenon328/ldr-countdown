# Countdown bis zum Wiedersehen

## Termin ändern

Öffne auf dem Webserver die Datei `countdown.json` neben `index.html` und ändere den Wert von `targetDate`. Speichere die Datei und lade den gewohnten Link im Browser neu. Die Seite liest den Termin bei jedem normalen Aufruf frisch ein.

Beispiele für 18 Uhr deutscher Ortszeit im Winter und im Sommer

- Winter (`+01:00`) — `{"targetDate": "2027-01-15T18:00:00+01:00"}`
- Sommer (`+02:00`) — `{"targetDate": "2027-07-15T18:00:00+02:00"}`

UTC kann mit `Z` angegeben werden. `{"targetDate": null}` steht für einen noch offenen Termin.

Ein Link mit `?date=2027-01-15T18:00:00%2B01:00` verwendet den angegebenen Termin für diesen Aufruf. Das Pluszeichen wird im Link als `%2B` geschrieben. Termine im Link ohne Offset verwenden die lokale Zeit des Browsers.

## Lokal prüfen

Mit `python -m http.server 8000` lässt sich die Seite aus dem Repository über `http://localhost:8000/` aufrufen. Für den Aufruf unter einem Unterpfad den Server im übergeordneten Verzeichnis starten und `http://localhost:8000/ldr-countdown/` öffnen. Ein statischer Webserver kann dieselben Dateien direkt ausliefern. Die Seite braucht keinen Build und lädt Skripte, Bilder und Termin relativ zu `index.html`.

Die Logiktests laufen mit `node --test`.

Für die Illustration liefert `getCountdown` aus `countdown.mjs` die Bildstufe `stage` (1 bis 6) und den gemeinsamen Fortschritt `progress` (0 bis 1) aus derselben Restzeit. Die fünf Figurenpaare und die Wiedersehenspose liegen unter `assets/characters/stages/`. Die Seeterrasse liegt in zwei Bildformaten unter `assets/scene/`. Die [Figuren-Dokumentation](assets/characters/README.md#platzierung-auf-der-website) beschreibt die Fußpunkte, an denen die Wege der beiden Figuren enden.
