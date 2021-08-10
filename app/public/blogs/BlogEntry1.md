BLOG_TAGS: Blog, MediaMaster, Neues Projekt
BLOG_CREATED_AT: 10.08.2021
BLOG_PREVIEW_TEXT: Der Blog ist fast fertig!

# Über Blogs und der MediaMaster

### Mein Blog

Es ist nun etwas länger her, dass ich meinen letzten Blog-Eintrag geschrieben habe.
Aber ich habe die Zeit genutzt und habe die Möglichkeiten des Blogs erweitert.

Mein erster Schritt war die Blogs von Strings auf Markdown-Dateien umzustellen. Da man mit einer Standard-Create-React-App leider keine anderen Dateien 
außerhalb von CSS, HTML, JS und Bildern importieren kann, musste ich mir etwas anderes einfallen lassen. 
Daher speichere ich mir eine Liste mit allen Blog-Dateien und lade sie über fetch gegebenenfalls nach.
Leider bin ich so darauf angewiesen bei jedem neuen Blog-Eintrag auch jene Liste anzupassen.

Der nächste Schritt war dann richtige Feed-Dateien zum Abonnieren zu erstellen. 
Die von mir gefundene Bibliothek ermöglicht mir neben einen üblichen XML-Export auch einen in JSON Form.
Ich kenne wohl bislang keine Anwendung, welche diese nutzt, aber ich denke gerade als API ist es das sinnigere Format.

Ich weiß noch nicht an welche Stelle ich die Links ablegen möchte, für die Interessierten jedoch sind die beiden Links hier:

- [XML-Feed](https://buckubel.github.io/rss/feed.xml)
- [JSON-Feed](https://buckubel.github.io/rss/feed.json)

Die benutzte [Bibliothek "feed"](https://www.npmjs.com/package/feed) ist jedenfalls extrem praktisch.
Zuerst lese ich mir alle Dateien aus meinem "Blogs" Ordner nacheinander ein. Dann kann ich die Texte der einzelnen Dateien einlesen und auswerten.
Um mir beispielsweise das Erstell-Datum des einzelnen Eintrages herauszufinden, gebe ich oben eine Konstante ein und danach das Datum. Das erkennt meine Konverter und gibt der Bibliothek das Datum mit.

Am Ende jedenfalls erstelle ich einzelne ``items`` für den Feed, 
welcher mir verschieden Funktionen zur Verfügung stellt für die jeweilige Feed-Datei. Deren Inhalt erhalte ich dann als String und kann sie normal als Datei wegspeichern.

Ich bin jedenfalls von der Einfachheit dieser Bibliothek begeistert.

Mir fällt auch gerade beim Schreiben dieses Bloges ein, dass ich meine oben beschrieben Liste an Blog-Einträgen auch einfach mit der JSON-Feed Datei ersetzen kann.
Am Ende ist da nur der Unterschied, dass ich die Blogs, nicht mehr einzeln laden kann wie bisher. Aber ich denke die paar Buchstaben mehr sollten erstmal zu keinem Problem führen.
Aber vielleicht haben **Sie**, werter Leser, ja eine Idee, wie ich das besser lösen könnte. Ich wäre auf ihre Lösungsmöglichkeit gespannt.

Eine Kleinigkeit ist noch erwähnenswert. **Bilder**
    
Die Sache ist die, Bilder sind auf Webseiten ja nichts anderes als Links zu den entsprechenden wirklichen Bildern. Um nun ein Bild in diesen Blog einzubinden, schreibe ich eine solche Zeile:

> `![Testbild](/images/blog1_testImage.png)`

Leider kann ein normaler Markdown-Editor nicht die Relation zum richtigen Ordner ziehen. Dieser müsste wie folgt aussehen:

> `![Testbild](https://buckubel.github.io/images/blog1_testImage.png)`
>
> `![Testbild](../images/blog1_testImage.png)`

Ersteres wäre komplett okay, wenn ich nicht auch noch lokal meine Entwicklung laufen lassen würde - und zweiteres versteht der Browser nicht.
Also hab ich den Fall, dass immer eine Quelle, die Bilder nicht anzeigen kann. 
Ich hab mich jedpch dafür entschieden bei der relativen URL zu bleiben.

Der letzte Punkte der bei den Blogs noch zu erledigen ist, sind die Kategorien. Es gibt wohl bereits, welche auf der Webseite jedoch werden diese nicht weiter verwendet.
Ich kann mir gut vorstellen, dass ich diese irgendwann als kleine Tags anklickbar mache, so dass man auf eine darauf gefilterte Liste kommt. Aber da habe ich noch Zeit bis es überhaupt was zu filtern gibt :D

---
### MediaMaster

Mein anderes großes Thema war ja der MediaMaster. Und ja, ich habe ihn angefangen.
Jedoch muss ich gestehen, dass ich nach 8 Stunden Arbeit in der Webentwicklung meinen Kopf für so etwas meist nicht frei habe.
Das ist zwar schade, aber einige Fortschritte habe ich ja gemacht. 
Ich hab die Datenstruktur vorbereitet und auch schon die Listen-Ansicht für Spiele angefangen.
Ich muss zugeben, es ist alles prototypisch und muss noch sehr erweitert werden - aber für einen einfachen Überblick würde das schon mal ausreichen.

Der nächste große Punkt wäre dann ein Erstell- und Bearbeitungs-Formular. Damit habe ich auch schon angefangen - aber nach ein paar Stunden fehlte mir dort irgendwie die Motivation.
Der Vorteil ist jedoch, wenn ich das nächste Mal anfangen möchte, muss ich nur weitere Formularfelder erstellen, der größte Teil der Architektur ist schon vorbereitet und einsatzbereit.

Ihr seht, es ist noch viel zu tun an dem Punkt.

---

### Was ist noch so los ?

Ich habe in letzter Zeit ein wenig meine kreative Ader ausgelebt und habe mich mit Pixel-Art angefreundet.
Dabei hab ich bemerkt, dass viele kostenlose Grafiktools etwaige Schwächen haben für meine Herangehensweisen.

Viele Graphik-Tools sind halt auch nicht dafür gedacht, sondern haben eher den Anspruch richtige Bilder zu verschönern, durch Anpassung an Kontrast, Farbsättigung, etc.

Daher denke ich werd ein paar kleine simple Graphiktools über diese Webseite veröffentlichen. Ich hätte beispielsweise gerne einen kleinen Gifmaker der nicht komplett mit Werbung überladen ist.

Eine Internet-Bekanntschaft von mir hat auch ein cooles [Graphik-Tool](https://pixelpalette.webfussel.de) geschrieben, welches PixelArt in einen String komprimiert.
Ich finde die Idee-Klasse. Ich denke ich werde die Idee des Tools übernehmen und erweitern. Ihr könnt gespannt sein, was ich mir noch so ausdenken werde!


``Und nun führe ich nur einen Befehl auf meinem Projekt aus und schon ist der Blog geupdated ^^``
