BLOG_TAGS: Simple GifMaker, Neues Projekt
BLOG_CREATED_AT: 18.08.2021
BLOG_PREVIEW_TEXT: Gifs erstellen leicht gemacht!

# Gifs erstellen leicht gemacht!

Habt ihr euch auch schon immer gefragt, warum alle Gif-Erstell-Seiten so schrecklich sind ?
Entweder sind sie voller Werbung - 
sperren für nicht "Pro"-Nutzer tolle Funktionen, 
oder sehen einfach so schon schrecklich aus.

Ich rede hier nicht über die Komprimierung, die diesem Format zu Grunde liegt - ich meine vor allen die kleinen Animationsvideos, welche den Namen populär gemacht haben.

Ich hab das jedenfalls nie verstanden, warum die Erstellung solcher Medien nicht nett und einfach zur Verfügung gestellt werden können.
Somit hab ich mich mal wieder für ein neues Projekt entschieden. (Ja ich weiß, ich sollte erstmal was beenden ^^).

## Simple GifMaker

Das Hauptziel dieses kleinen Projektes soll sein, Bilder entgegenzunehmen, diese simpel bearbeitbar zu machen und danach eine Sequenz an Bildern als Mini-Video in eine Gif zu packen.

Wichtig dabei sind mir vor allen die Verbindungen zwischen den Bildern. Dass heißt, ich möchte auch gerne einen Frame doppelt so lang anzeigbar machen, die Frames umsortieren können, usw.
Also eigentlich ganz einfach Funktionen, welche man immer mal gebrauchen könnte. 

Das ganze soll wieder server-unabhängig geschehen - also nur im Browser selbst berechnet werden. Ich denke, das wird gerade bei größeren Bildern bestimmt etwas schwierig.
Von daher ist das Ziel erstmal kleinere Bilder bis ca. 0,25 MP zu untersützen. Mal sehen welchen Einschränkungen größere Bilder unterliegen werden.

## Erste Umsetzung

So hab ich einfach mal angefangen eine kleine Bibliothek namens [*gif.js.optimized*](https://github.com/terikon/gif.js.optimized) einzubauen:

[Meine Umsetzung](http://localhost:3000/project/3)

Zu Beginn habe ich eine kleine Typisierung geschrieben, um überhaupt die Bibliothek für mich richtig nutzen zu können. 
Es war aber eigentlich auch nur eine Klasse. Das Problem hierbei ist eher, dass dieser Fork des eigentlichen Ursprungsprojekts auch schon recht lang brach liegt.
Wenn ich mal die Zeit dazu finde, forke ich den Fork selbst und gebe dabei die Typisierung mit. 
(Da sollte ich mich, aber auch erstmal mit dem Publishen eines `@types` packages beschäftigen)

In dem Zusammenhang hab ich mich nämlich erstmal grundlegend mit *canvas* auseinandergesetzt bzw. bin ich da grad noch dabei.
Das sind alles keine Themen, die ich sonst gewöhnt bin, aber ich find sie ja doch recht interessant.

Im derzeitigen Zustand des Projektes, gibt es ein Bild, welches man in der Breite wie auch Höhe verändern kann und jeweils zu den Frames der Gif hinzufügen kann.
Weiterhin kann man auch Bilder generieren lassen, welche eine Rotation einbauen und somit jenes Bild drehen lassen können. Eine kleine nette Spielerei eben...

Ich hab in diesem Zusammenhang noch viele Ideen, Sortierung, Einzelbildbearbeitung, ... seid gespannt, ich bin es nämlich auch!

