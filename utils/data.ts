export { getPriceFromImageLink } from "./clockLayers";

export const BASE_PRICES: Record<string, number> = {
  "1a":245,"1b":220,"1c":330,"1d":255,"1e":270,
  "2a":235,"2b":250,"2c":235,
  "3a":235,"3b":230,"3c":300,
  "4a":220,"4b":340,"4c":300,
  "5a":230,"5b":290,"5c":295,
  "6a":220,"6b":235,"6c":330,
  "7a":260,"7c":330,
  "8a":250,"9a":230,"10a":220,"11a":220,"12a":280,"13a":250,"14a":250,
  "15a":320,"16a":290,"17a":280,"18a":235,"19a":260,"20a":250,"21a":230,
  "22a":245,"23a":250,"24a":220,"25a":250,"26a":220,"27a":220,"28a":250,
  "29a":230,"30a":230,"31a":280,"32a":235,"33a":230,"34a":235,"35a":260,
  "36a":250,"37a":340,"38a":235,"39a":245,"40a":250,"41a":230,"42a":260,
  "43a":250,
};

export const CLOCK_INFO: Record<string, { title: string; description: string }> = {
  "1a":{ title:"Incanto",    description:"È un orologio da parete dal design sofisticato, caratterizzato da linee armoniose che creano un effetto tridimensionale. Questo pezzo unico trasforma il tempo in un'opera d'arte, riflettendo luce e spazio con eleganza contemporanea. Perfetto per ambienti moderni che richiedono stile e personalità." },
  "1b":{ title:"Harmonia",   description:"Harmonia è un orologio da parete in specchio che celebra l'eleganza nella sua forma più pura. I cerchi concentrici evocano l'armonia e il flusso del tempo, mentre il design minimalista aggiunge raffinatezza a qualsiasi ambiente. Un'opera di classe per spazi esclusivi." },
  "1c":{ title:"Crisalide",  description:"Allude alla frammentazione in qualcosa di splendido catturando l'istante in cui il tempo sembra spezzarsi. Questo design crea un effetto dinamico che riflette la bellezza della fragilità. Un orologio che unisce forza e delicatezza simboleggiando la bellezza che nasce da ogni rottura." },
  "1d":{ title:"Nova",       description:"Un'esplosione di luce e meraviglia prende forma, catturando il dinamismo in un istante eterno. Questa forma esagonale riflette armonie celesti con un design che celebra la bellezza del movimento e l'equilibrio tra ordine e caos." },
  "1e":{ title:"Tenore",     description:"Un orologio da parete decagonale caratterizzato da linee geometriche precise e una finitura che riflette eleganza e modernità. La sua forma lo rende un pezzo unico e distintivo, perfetto per arricchire ambienti esclusivi." },
  "2a":{ title:"Aura",       description:"Questo orologio crea un'atmosfera di serenità, riflettendo la bellezza di ogni istante. Con il suo design sottile, è perfetto per chi ama il minimalismo e vuole che la bellezza parli da sola." },
  "2b":{ title:"Cronos",     description:"Cerchi concentrici che richiamano la precisione assoluta del tempo. Cronos si integra perfettamente in spazi moderni e minimalisti, trasformando ogni parete in un punto focale elegante. Il design ipnotico aggiunge profondità e carattere a qualsiasi ambiente." },
  "2c":{ title:"Cometa",     description:"Un orologio da parete elegante, ispirato alla bellezza fugace di una cometa che attraversa il cielo. Le sue linee fluide evocano movimento e armonia, trasformando ogni istante in un simbolo di raffinatezza senza tempo." },
  "3a":{ title:"Helios",     description:"Un'esperienza visiva brillante che incarna la bellezza e l'armonia. Questo orologio si riflette in una spirale incantevole rendendo omaggio al tempo che scorre. La particolare cura nei dettagli rende questo pezzo unico e pregiato." },
  "3b":{ title:"Etiopia",    description:"Un elegante gioco di cerchi concentrici dove l'equilibrio tra simmetria e leggerezza diventa protagonista aggiungendo profondità e movimento alle pareti. Un design versatile e sofisticato per chi cerca un dettaglio unico." },
  "3c":{ title:"Fenice",     description:"Si distingue per linee sinuose e sofisticate che trasmettono equilibrio e raffinatezza. Il design elegante, ispirato a forme naturali e armoniose, celebra la bellezza senza tempo trasformando ogni istante in pura essenza di stile." },
  "4a":{ title:"Aurora",     description:"Aurora celebra il tempo nella sua forma più pura e lo trasforma in un'opera d'arte. Le sue linee eleganti e il design raffinato aggiungono un tocco in più in qualsiasi ambiente, catturando l'attenzione con discrezione e stile." },
  "4b":{ title:"Trinità",    description:"Un raffinato mosaico composto da un intreccio di linee dinamiche ed eleganti. Perfetto per ambienti moderni, rappresenta l'incontro tra creatività e sofisticata eleganza, aggiungendo carattere e stile ad ogni spazio." },
  "4c":{ title:"Infinity",   description:"Esprime continuità ed equilibrio attraverso un motivo sinuoso e intrecciato. Il suo design sofisticato riflette il concetto di eleganza senza sopraffare, lasciandosi ammirare per la sua semplicità e fascino unico." },
  "5a":{ title:"Solaria",    description:"Solaria incarna armonia e perfezione, con un design radiale ispirato al movimento dei petali di un fiore. Ogni dettaglio geometrico celebra l'equilibrio e l'eleganza, trasformando il tempo in un punto focale di pura raffinatezza." },
  "5b":{ title:"Alchimia",   description:"Gioca con geometrie precise e linee prospettiche che creano profondità e movimento. Ogni dettaglio riflette un'armonia contemporanea, trasformando il tempo in un'esperienza visiva sofisticata e dall'eleganza senza compromessi." },
  "5c":{ title:"Ammalia",    description:"Caratterizzato da un elegante movimento ondulato. Le sue linee fluide e i dettagli simmetrici evocano un senso di infinito, trasformando il tempo in un elemento di design raffinato e semplice." },
  "6a":{ title:"Enigma",     description:"Orologio con un affascinante motivo geometrico circolare. Le linee che seguono un preciso movimento evocano un enigma senza tempo, conferendo al design un'eleganza unica, perfetta per ambienti sofisticati e moderni." },
  "6b":{ title:"Imperial",   description:"Un orologio dal design frammentato e geometrico, simbolo di armonia e modernità. Le linee sottili e spezzate riflettono il tempo come un'opera d'arte, unendo minimalismo ed eleganza in una creazione perfetta per ambienti di lusso." },
  "6c":{ title:"Borea",      description:"Fonde design moderno con numeri romani in pura eleganza artigianale. Ideale per ambienti esclusivi, racconta il lusso in ogni istante. Perfetto per chi cerca distinzione e raffinatezza." },
  "7a":{ title:"Giove",      description:"Giove è l'orologio da parete che celebra la dinamicità attraverso linee morbide e avvolgenti. Un capolavoro di design per ambienti sofisticati, dove ogni secondo riflette lusso e continuità." },
  "7c":{ title:"Aurea",      description:"Rende omaggio alla perfezione della sezione Aurea. Il design incarna un gioco creativo attraverso tre forme differenti intrecciate in un corpo unico che richiama l'armonia intrinseca dell'universo. Un simbolo profondo di bellezza." },
  "8a":{ title:"Eclisse",    description:"Cattura l'essenza del tempo con raggi che sembrano sprigionarsi dal cuore dell'universo. Combina numeri romani classici e un design radiale contemporaneo, ideale per ambienti raffinati." },
  "9a":{ title:"Forum",      description:"Trasforma il tempo in un percorso intricato, dove ogni ora è un punto di riferimento tra sentieri geometrici. Un design elegante che cattura l'attenzione e invita alla riflessione." },
  "10a":{ title:"Arcano",    description:"Un design che richiama un fascino misterioso e incarna l'enigma del tempo. Le sue linee suggeriscono frammenti di storie perdute, mentre l'armonia del cerchio centrale ricorda un equilibrio assoluto." },
  "11a":{ title:"Ciclo",     description:"Le strisce concentriche al centro simboleggiano il movimento perpetuo del tempo. La semplicità del design esprime la ciclicità della vita: ogni istante nasce, cresce, e torna al punto di partenza, in un eterno ritorno armonioso." },
  "12a":{ title:"Fresia",    description:"Celebra l'essenza del tempo attraverso simmetria e rigore geometrico. I numeri romani, posizionati ai quattro punti cardinali, ancorano il design con carattere classico e deciso." },
  "13a":{ title:"Giada",     description:"Un capolavoro che incarna la grazia e la regalità. Il suo design radiale crea un effetto visivo dinamico e ipnotico. Ogni dettaglio parla di equilibrio e prestigio, rendendo il tempo un'opera d'arte." },
  "14a":{ title:"Zeffiro",   description:"Il pattern a diamante crea un effetto ottico intrigante che cattura la luce. I numeri romani sottili aggiungono un tocco di eleganza classica a un design altrimenti contemporaneo." },
  "15a":{ title:"Orione",    description:"Un flusso continuo che parte dal cuore e si apre all'infinito. Questo orologio trasforma il tempo in una danza di rombi concentrici, portando sul muro un'armonia che avvolge e ipnotizza." },
  "16a":{ title:"Atena",     description:"Un simbolo di rinascita e bellezza. Le linee delicate si dispiegano come un fiore che sboccia, portando sul muro una coreografia di luce e movimento, dove ogni secondo è un nuovo inizio." },
  "17a":{ title:"Ego",       description:"Un intreccio dinamico di geometrie che converge verso un punto di pura energia. Questo orologio trasforma il passare del tempo in una sequenza vibrante, portando sul muro un senso di movimento incessante e audace." },
  "18a":{ title:"Circolo",   description:"Un design ispirato alla perfezione geometrica e alla dinamicità del tempo. Le linee intrecciate e fluide creano un senso di movimento costante, simboleggiando l'energia e l'armonia del trascorrere dei momenti." },
  "19a":{ title:"Astro",     description:"Richiama il movimento degli astri nello spazio, con linee fluide e intrecciate che formano una danza celestiale. Rappresenta l'armonia del cosmo, dove il tempo scorre seguendo orbite invisibili ma precise." },
  "20a":{ title:"Prisma",    description:"Un quadrante che richiama l'idea dell'eterno e del ciclico. La trama simmetrica, con curve che si intersecano dolcemente, rappresenta il perpetuo scorrere del tempo. Ideale per chi cerca un design intramontabile e simbolico." },
  "21a":{ title:"Atomo",     description:"Con un design sofisticato formato da linee circolari che si rincorrono senza fine, creando un motivo armonioso e bilanciato, simbolo di eternità del tempo. Un'opera elegante e distintiva." },
  "22a":{ title:"Élite",     description:"Celebra la perfezione delle geometrie e la raffinatezza di un design intricato. Le linee intrecciate creano un disegno sopraffino, simbolo di equilibrio e bellezza senza tempo." },
  "23a":{ title:"Grinfio",   description:"Un intreccio di linee spezzate e angoli taglienti evoca l'idea di graffi impressi con dinamismo e forza. L'effetto visivo cattura l'attenzione, ideale per ambienti moderni e minimali." },
  "24a":{ title:"Amnesia",   description:"Il design gioca con intrecci che sembrano muoversi in uno spazio tridimensionale, creando un senso di profondità ipnotico. Le linee dinamiche donano eleganza e carattere." },
  "25a":{ title:"Oblìo",     description:"Questo orologio fonde lusso e arte. Il design simula una spirale che sprofonda nell'eternità, simbolo del cerchio della vita. Perfetto per chi cerca un'opera esclusiva che cattura lo sguardo e l'immaginazione." },
  "26a":{ title:"Venus",     description:"Ispirato alle linee sinuose di Venere e alla scia elegante e avvolgente che richiama la sensualità e la grazia del pianeta dell'amore. Il design dona profondità e movimento in un pezzo irresistibile." },
  "27a":{ title:"Nube",      description:"Richiama l'idea di una leggera nebbia che avvolge i numeri dando un senso di eleganza eterea. Perfetto per un orologio che gioca con linee e forme morbide, creando un'atmosfera raffinata." },
  "28a":{ title:"Pegaso",    description:"Dove il tempo incontra l'eleganza più profonda. Il design, che sembra quasi raffigurare delle ali, è interrotto da orbite che sprofondano nell'infinito, dando vita a un perfetto equilibrio tra grazia e profondità." },
  "29a":{ title:"Eresìa",    description:"Le linee fluide e ondulate al centro sembrano galleggiare, evocando profondità e tridimensionalità. La cornice che integra i numeri aggiunge un tocco artistico sofisticato, un equilibrio tra dinamismo e ordine." },
  "30a":{ title:"Vibrazioni", description:"Un design animato da un motivo a zigzag che si espande e si restringe. Le linee creano un effetto visivo dinamico, catturando l'idea di movimento continuo e trasformazione." },
  "31a":{ title:"Anima",     description:"Richiama l'immagine dell'interno di un tronco d'albero nella quale racchiude la sua anima espressa attraverso gli anelli che indicano l'età, testimonianza poetica del tempo che scorre." },
  "32a":{ title:"Orbis",     description:"Dal latino 'circolo' o 'sfera'. Incarna l'eleganza del movimento continuo, con palline che si muovono lungo traiettorie circolari. Un design che simboleggia l'infinito fluire del tempo." },
  "33a":{ title:"Vela",      description:"Combina minimalismo e movimento. Le asticelle sottili in sostituzione dei numeri forniscono un design minimal. Al centro una forma ondulata e fluida conferisce profondità e un effetto quasi tridimensionale." },
  "34a":{ title:"Diamante",  description:"Riprende la perfezione geometrica e la brillantezza di un diamante, con un motivo sfaccettato che evoca la luce rifratta e la bellezza senza tempo delle gemme più preziose." },
  "35a":{ title:"Sole",      description:"Evoca la luce, l'energia e la vitalità. Sole richiama la centralità e la perfezione di un oggetto che si fa notare per la sua brillantezza in ogni ambiente." },
  "36a":{ title:"Eterno",    description:"Il suo design circolare, essenziale e raffinato, cattura l'attenzione con linee semplici che creano una sensazione di perfezione senza tempo, unendo sofisticatezza e modernità in modo discreto." },
  "37a":{ title:"Cosmo",     description:"Riflette l'infinito, dove spazio e tempo si fondono senza confini. I puntini, simili a stelle nell'universo, creano un orologio che incarna eleganza e fascino." },
  "38a":{ title:"Mistero",   description:"Un design astratto che intreccia linee irregolari e frammenti disconnessi, evocando un senso di caos controllato. Un motivo che invita l'osservatore a trovare il proprio significato." },
  "39a":{ title:"Meridiano", description:"Gioca sulla frequenza e l'armonia delle forme lineari, creando un design minimalista ma di forte impatto visivo. Le linee parallele si alternano in un ritmo equilibrato, enfatizzando ordine e modernità." },
  "40a":{ title:"Ricamo",    description:"Si distingue per la sua cornice intrecciata che richiama motivi tessili raffinati. Le figure romboidali si sovrappongono in un disegno che incarna precisione e maestria artigianale." },
  "41a":{ title:"Essenza",   description:"Il termine evoca semplicità e purezza. Questo orologio si distingue per la sua semplicità raffinata, essenza di stile, senza aggiungere complessità al tuo arredamento." },
  "42a":{ title:"Ciclone",   description:"Un design che danza in un ritmo ipnotico, evocando un movimento continuo e una direzione precisa. Ciclone trasforma il tempo in un flusso visivo unico, sintesi di modernità e stile senza tempo." },
  "43a":{ title:"Harmony",   description:"Un design caratterizzato da linee concentriche e parallele che convergono verso il centro, creando un effetto ipnotico e sofisticato. Trasmette ordine, equilibrio e precisione." },
};

export const CATALOG_IDS = [
  "1a","1b","1c","1d","1e","2a","2b","2c","3a","3b","3c","4a","4b","4c",
  "5a","5b","5c","6a","6b","6c","7a","7c","8a","9a","10a","11a","12a",
  "13a","14a","15a","16a","17a","18a","19a","20a","21a","22a","23a","24a",
  "25a","26a","27a","28a","29a","30a","31a","32a","33a","34a","35a","36a",
  "37a","38a","39a","40a","41a","42a","43a",
];

export const NC_COLOR_OPTIONS = [
  {value:"a",label:"Nessuna",inc:0},{value:"b",label:"Fumè",inc:0.20},
  {value:"c",label:"Bronzo",inc:0.20},{value:"d",label:"Invecchiato",inc:0.32},
];
export const NC_SANDBLASTING_OPTIONS = [
  {value:"a",label:"Davanti",inc:0},{value:"b",label:"Dietro",inc:0},
  {value:"c",label:"Dietro - Nero",inc:0.08},
];
export const NC_HANDS_OPTIONS = [
  {value:"a",label:"Tipo 1",inc:0},{value:"b",label:"Tipo 2",inc:0},
  {value:"c",label:"Tipo 3",inc:0},{value:"d",label:"Tipo 4",inc:0.12},
  {value:"e",label:"Tipo 5",inc:0.12},
];
export const NC_COLOR_HANDS_OPTIONS = [
  {value:"a",label:"Nero",inc:0},{value:"b",label:"Cromo",inc:0},{value:"c",label:"Oro",inc:0},
];
export const NC_SIZE_OPTIONS = [
  {value:"a",label:"50cm",inc:0},{value:"b",label:"80cm",inc:0.28},
  {value:"c",label:"100cm",inc:0.60},
];

export function calcNotCustomPrice(clockId: string, opts: string): number {
  const base = BASE_PRICES[clockId] ?? 0;
  if (!base) return 0;
  const shape = clockId.slice(-1);
  const lists = [NC_COLOR_OPTIONS,NC_SANDBLASTING_OPTIONS,NC_HANDS_OPTIONS,NC_COLOR_HANDS_OPTIONS,NC_SIZE_OPTIONS];
  let total = base;
  lists.forEach((list, i) => {
    const v = opts[i] ?? "a";
    if (i === 4 && v === "c" && shape === "c") return;
    const opt = list.find(o => o.value === v);
    if (opt?.inc) total += Math.round(base * opt.inc);
  });
  return total;
}