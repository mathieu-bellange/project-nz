import { City, Metropolis } from '../tools';

// DONE ajouter une liste de marker avec la position des villes principales trello:#76
const buildCity = pixelRatio => ([
  [
    new City(713, 502, pixelRatio, 'Manukau')
  ],
  [
    new Metropolis([
      [706.1, 464],
      [700, 465],
      [690, 480],
      [689, 486],
      [702, 495.6],
      [705, 495],
      [712, 495],
      [717, 484],
      [695, 482],
      [714, 478],
      [706.1, 464]
    ], pixelRatio, 'Auckland', 703, 475),
    new City(722, 511, pixelRatio, 'Papakura'),
    new City(716, 521, pixelRatio, 'Pukekohe'),
    new City(721, 532, pixelRatio, 'Tuakau'),
    new City(703, 458, pixelRatio, 'Whangaparaoa'),
    new City(697, 452, pixelRatio, 'Orewa')
  ],
  [
    new City(743, 548, pixelRatio, 'Te Kauwhata'),
    new City(741, 566, pixelRatio, 'Huntly'),
    new City(741, 579, pixelRatio, 'Ngaruawahia')
  ],
  [
    new City(772, 579, pixelRatio, 'Morrinsville'),
    new City(721, 592, pixelRatio, 'Raglan'),
    new Metropolis([
      [747, 589],
      [750, 597],
      [756, 594],
      [753, 588],
      [747, 589]
    ], pixelRatio, 'Hamilton', 755, 587),
    new City(760, 605, pixelRatio, 'Cambridge'),
    new City(756, 618, pixelRatio, 'Te Awamata'),
    new City(757, 622, pixelRatio, 'KihiKihi')
  ],
  [
    new City(797, 663, pixelRatio, 'Mangakino')
  ],
  [
    new City(827, 699, pixelRatio, 'Taupo'),
    new City(799, 732, pixelRatio, 'Turangi')
  ],
  [
    new City(750, 720, pixelRatio, 'Te Kuiti')
  ],
  [
    new City(765, 782, pixelRatio, 'Ohakune')
  ],
  [
    new City(694, 822, pixelRatio, 'Waverley'),
    new City(733, 842, pixelRatio, 'Wanganui'),
    new City(762, 867, pixelRatio, 'Bulls'),
    new City(778, 874, pixelRatio, 'Feilding')
  ],
  [
    new City(756, 893, pixelRatio, 'Himatangi'),
    new Metropolis([
      [780, 885],
      [776, 892],
      [784, 889],
      [780, 885]
    ], pixelRatio, 'Palmerston North', 780, 882),
    new City(752, 904, pixelRatio, 'Foxton'),
    new City(753, 921, pixelRatio, 'Levin')
  ],
  [
    new City(740, 937, pixelRatio, 'Otaki'),
    new City(733, 950, pixelRatio, 'Waikanae'),
    new City(727, 957, pixelRatio, 'Paraparaumu')
  ],
  [
    new Metropolis([
      [715, 976],
      [711, 983],
      [712, 987],
      [718, 985],
      [720, 978],
      [715, 976]
    ], pixelRatio, 'Porirua', 715, 975),
    new Metropolis([
      [706, 993],
      [701, 999],
      [700, 1004.3],
      [705, 1008],
      [714, 1001],
      [713, 994],
      [713, 994],
      [706, 993]
    ], pixelRatio, 'Wellington', 705, 992)
  ],
  [
    new City(723, 997, pixelRatio, 'Wainuiomata'),
    new Metropolis([
      [732, 978],
      [728, 980],
      [726, 984],
      [731, 984],
      [736, 979],
      [732, 978]
    ], pixelRatio, 'Upper Hutt', 730, 977),
    new Metropolis([
      [723, 986],
      [718, 991],
      [719, 993],
      [724, 990],
      [723, 986]
    ], pixelRatio, 'Lower Hutt', 720, 990)
  ]
]);

export default buildCity;
