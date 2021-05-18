import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import blog1Image from "../../../images/banner1024.png";
//TODO extend blog entries with createDate and tags
export interface BlogEntryInterface {
  id: number,
  title: string,
  previewText?: string;
  description?: string,
  icon?: IconDefinition;
  image?: string;
}

export type BlogEntryListInterface = {
  [key: number]: BlogEntryInterface
}
export const BLOGS: BlogEntryListInterface = {
  0: {
    id: 0,
    title: "Endlich fängt es jetzt an... ",
    image: blog1Image,
    description: "So nun habe ich also meine Blog-Seite fertig gestellt." +
      "Ich denke ich habe hier noch einiges zu verbessern, aber wenn man nicht anfängt wo kommt man dahin." +
      "\n" +
      "Nun worum soll es hier auf der Seite eigentlich gehen? Das ist mir selbst noch gar nicht so klar. Jedenfalls wollte ich eine Plattform für mich finden, auf welcher ich meine Gedanken äußern kann. Da dies eine Github-Page ist, werde ich auch nie erfahren ob jemand überhaupt diese Seiten liest. Höchstens durch Nutzung einer meiner Kontaktmöglichkeiten würde ich dies bemerken." +
      "\n" +
      "Es gibt auf dieser Seite zum Einen, die Blog-Seite und zum Anderen die Projekt-Seite. In den Blogs werde ich wohl ein wenig über meine Projekte reden. So trenne ich die Theorie und Praxis voneinander." +
      "\n" +
      "Die bisherigen Projekte bisher sind noch recht karg. Es gibt den Namens-Bewerter und Advent of Code." +
      "\n" +
      "Ersteres rechnet nur Zahlen zu einander, welche von Buchstaben abhängen. Das auch noch in einem eigenem Input-Feld was eigentlich komplett unnötig ist und nicht mal mobil-fähig ist. Aber gut." +
      "\n" +
      "Das Zweitere war mir nach dem vierten Tag zu zeitintensiv, so dass ich das Projekt relativ früh abgebrochen habe." +
      "\n" +
      "So was wird das nächste Projekt sein, welches ich in diesem Rahmen veröffentlichen werde?" +
      "\n" +
      "Ich bin ein recht großer Sammler. Und was sammle ich? Vorrangig Videospiele und Filme. Ersteres aktiver als zweiteres. Aber beides doch so ernst, dass ich so langsam den Überblick verliere." +
      "\n So kommen wir zu meiner User-Story: \n" +
      "Ich möchte ein Tool haben, in welchem ich meine Videospiele und Medien auflisten kann und mir ebenfalls dazu Gedanken aufschreiben kann und sie für mich persönlich bewerben kann. " +
      "In diesem Tool will ich weiterhin auch noch solche Medien abspeichern welche erst in Zukunft in meine Sammlung kommen sollen." +
      "\n" +
      "Die Speicherung soll als JSON gespeichert werden, welches im localStorage gespeichert wird. So brauchen wir hier keinen extra Server und können alles schön extern handeln. " +
      "\n" +
      "Weiterhin werde ich auch dieses Seite immer weiter verbessern. Diesen Blogeintrag grade, schreibe ich bisher als einfachen String mit enthaltenen \\n. Das ist natürlich relativ einschränkend. Fettdruck, Überschriften, Bilder, ... all das ist so nicht einfach möglich." +
      "Die Lösung wird dafür sein, den Blog entweder gleich in JSX zu schreiben, oder mit einem Markdown-Plugin zu arbeiten. Wir werden es sehen wohin die Reise hingeht." +
      "\n" +
      "Aber zuerst will ich mich nun um mein Tool kümmern. Also wir lesen uns später..."
  },
}
export const BLOG_IDS = Object.keys(BLOGS);

export function getLastBlogId() {
  // on values under 0, the latest entry will used
  if (!!BLOG_IDS[BLOG_IDS.length - 1]) {
    return Number(BLOG_IDS[BLOG_IDS.length - 1]);
  }
  return -1;
}
