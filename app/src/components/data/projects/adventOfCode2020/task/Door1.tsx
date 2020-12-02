import React from 'react';
import styled from 'styled-components';
import {StyledCompProps} from "../../../../helper/types";

interface Door1Props extends StyledCompProps {
}

function Door1(props: Door1Props) {

  const stepOne = window.performance.now();
  const target = 2020;

  const startInput = [1825, 1944, 1802, 1676, 1921, 1652, 1710, 1952, 1932, 1934, 1823, 1732, 1795, 1681, 1706, 1697, 1919, 1695, 2007, 1889, 1942, 961, 1868, 1878, 1723, 416, 1875, 1831, 1890, 1654, 1956, 1827, 973, 1947, 1688, 1680, 1808, 1998, 1794, 1552, 1935, 1693, 1824, 1711, 1766, 1668, 1968, 1884, 217, 2003, 1869, 1658, 1953, 1829, 1984, 2005, 1973, 428, 1957, 1925, 1719, 1797, 321, 1804, 1971, 922, 1976, 1863, 2008, 1806, 1833, 1809, 1707, 1954, 1811, 1815, 1915, 1799, 1917, 1664, 1937, 1775, 1685, 1756, 1940, 1660, 1859, 1916, 1989, 1763, 1994, 1716, 1689, 1866, 1708, 1670, 1982, 1870, 1847, 1627, 1819, 1786, 1828, 1640, 1699, 1722, 1737, 1882, 1666, 1871, 1703, 1770, 1623, 1837, 1636, 1655, 1930, 1739, 1810, 1805, 1861, 1922, 1993, 1896, 1760, 2002, 1779, 1633, 1972, 1856, 1641, 1718, 2004, 1730, 1826, 1923, 1753, 1735, 660, 1988, 1796, 1990, 1720, 1626, 1788, 1700, 942, 1902, 1943, 1758, 1839, 1924, 938, 1634, 1724, 1983, 1683, 1687, 1904, 1907, 1757, 2001, 1910, 1849, 1781, 1981, 1743, 1851, 2009, 619, 1898, 1891, 1751, 1765, 1959, 1888, 1894, 1759, 389, 1964, 1900, 1742, 1672, 1969, 1978, 1933, 1906, 1807, 1867, 1838, 1960, 1814, 1950, 1918, 1726, 1986, 1746, 2006, 1949, 1784];
  let sortIterations = 0;
  const sortedInput = startInput.sort((a, b) => {
    sortIterations++;
    return a - b
  });
  const filteredInput = sortedInput.filter((v) => v < (target - sortedInput[0]))

  let foundedNumberOne = -1;
  let foundedNumberTwo = -1;
  let iterations = 0;
  for (let i = filteredInput.length - 1; i > 0; i--) {
    for (let j = 0; j < filteredInput.length; j++) {
      iterations++;
      if (filteredInput[i] + filteredInput[j] === target) {
        foundedNumberOne = filteredInput[i];
        foundedNumberTwo = filteredInput[j];
        i = 0;
        j = filteredInput.length;
      }
      if (filteredInput[i] + filteredInput[j] > target) {
        j = filteredInput.length;
      }
    }
  }
  const stepTwo = window.performance.now();

  const filteredInput2 = filteredInput.filter((v) => v < (target - filteredInput[0] - filteredInput[1]))
  let foundedNumber2One = -1;
  let foundedNumber2Two = -1;
  let foundedNumber2Three = -1;
  let iterations2 = 0;

  for (let i = filteredInput2.length - 1; i > 0; i--) {
    for (let j = 0; j < filteredInput2.length; j++) {
      iterations2++;
      const thirdNumber = target - (filteredInput2[i] + filteredInput2[j]);
      if (filteredInput2.includes(thirdNumber)) {
        foundedNumber2One = filteredInput2[i];
        foundedNumber2Two = filteredInput2[j];
        foundedNumber2Three = thirdNumber;
        i = 0;
        j = filteredInput.length;
      }
      if (filteredInput[i] + filteredInput[j] > target) {
      }
    }
  }
  const stepThree = window.performance.now();

  return (
    <div className={props.className}>
      <p>Zuerst sortieren wir unser Array nach der Größe: </p>
      <p>{sortedInput.map(v => " " + v)}</p>
      <p>So sehen wir gleich, dass einige Zahlen gar nicht in Frage kommen. Denn die kleinste Zahl bestimmt den
        maximalen möglichen Wert.</p>
      <p>Also streichen wir ein paar weg:</p>
      <p>{filteredInput.map(v => " " + v)}</p>
      <p> Ein Ansatz ist nun von der größten Zahl nach unten durch zu iterieren und dazu Zahlen von unten nach oben
        dazu addieren bis man über die 2020 kommt:</p>
      <ul>
        <li>Iteration über alle Zahlen von der größten zur kleinsten</li>
        <li>Weitere Iteration für jeder Zahl von der kleinsten zur größten</li>
        <li>ist die Summe der beiden Zahlen = 2020, dann haben wir unser Zahlen-Dupel gefunden</li>
        <li>wenn das Ergebnis dieser Subtraktion in unserem gefiltertem Array steht, dann haben wir das 2-Tupel
          gefunden
        </li>
      </ul>
      <p>Unser Ergebnis besteht aus folgenden zwei Zahlen (und wurde nach {iterations} Schleifendurchgängen
        gefunden): </p>
      <p>a: {foundedNumberOne}</p>
      <p>b: {foundedNumberTwo}</p>
      <p>Also ist unser Ergebnis: <u><b>{foundedNumberOne * foundedNumberTwo}</b></u></p>
      <hr/>
      <p>Nach der Eingabe unseres Ergebnisses wurden wir nun zum zweiten Teil zugelassen, dort sollen wir nun aus drei
        Zahlen ein solches Produkt bilden. Das macht die Sache etwas kniffliger.</p>
      <p>Aber zum Glück gilt weiterhin unsere erste Einschränkung mit der Filterung. Diesmal können wir sogar einen
        Schritt weiter gehen und alle Zahlen ausschließen, welche mit den zwei kleinsten Zahlen schon über 2020 kommen:
      </p>
      <p>{filteredInput2.map(v => " " + v)}</p>
      <p>Der Algorithmus zum Finden des Zahlen-Tripels kann nun wie folgt aufgebaut werden:</p>
      <ul>
        <li>Iteration über alle Zahlen von der größten zur kleinsten</li>
        <li>Weitere Iteration für jeder Zahl von der kleinsten zur größten</li>
        <li>2020 - die Summe der beiden Zahlen</li>
        <li>wenn das Ergebnis dieser Subtraktion in unserem gefiltertem Array steht, dann haben wir das Tripel
          gefunden
        </li>
      </ul>
      <p>Unser Ergebnis besteht aus folgenden 3 Zahlen (und wurde nach {iterations2} Schleifendurchgängen
        gefunden): </p>
      <p>a: {foundedNumber2One}</p>
      <p>b: {foundedNumber2Two}</p>
      <p>c: {foundedNumber2Three}</p>
      <p>Also ist unser Ergebnis: <u><b>{foundedNumber2One * foundedNumber2Two * foundedNumber2Three}</b></u></p>

      <hr/>

      <p><b>Endergebnis: </b> Um jetzt diese Lösung zu bewerten können wir uns die Schleifendurchgänge anschauen:</p>
      <ul>
        <li>{sortIterations} - Sortierung</li>
        <li>{sortedInput.length} - 1. Filterung (Länge des Arrays)</li>
        <li>{iterations} - 1. Algorithmus</li>
        <li>{filteredInput.length} - 2. Filterung (Länge des zuerst gefilterten Arrays)</li>
        <li>{iterations2} - 1. Algorithmus</li>
      </ul>
      <p>Das macht am Ende zusammen <b>{sortIterations +
      sortedInput.length +
      iterations +
      filteredInput.length +
      iterations2} Durchgänge.</b></p>

      <p> Eine weitere Beurteilung gelingt uns durch die Zeit. Unterteil in die beiden Bereiche sind folgende
        Zeitabstände entstanden (Bitte bedenke, dass diese Zeiten live berechnet werden, d.h. sie sind schneler umso
        stärker dein Endgerät ist):</p>
      <ul>
        <li>{((stepTwo - stepOne) * 1000).toFixed(2)} μs (mein Endgerät lag bei 100)</li>
        <li>{((stepThree - stepTwo) * 1000).toFixed(2)} μs (mein Endgerät lag bei 20)</li>
      </ul>
      <p> Ich bin gespannt schaffst Du weniger? Probiere es doch aus vielleicht findest du ja einen besseren Algorithmus
        ;)</p>
      <hr/>
      <hr/>
    </div>
  );
}

export default styled(Door1)`

`;
