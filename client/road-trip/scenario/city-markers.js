import { City, Metropolis } from '../tools';

// DOING ajouter une liste de marker avec la position des villes principales trello:#76
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
    new City(697, 452, pixelRatio, 'Orewa'),
    new City(743, 548, pixelRatio, 'Te Kauwhata')
  ]
]);

export default buildCity;
