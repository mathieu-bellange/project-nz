const boxes = [
  {
    center: {
      x: 708,
      y: 502
    },
    boxes: [
      {
        box: {
          id: 1,
          text: 'Du texte un peu long pour voir ce que ça fait de ouf'
        },
        left: true,
        position: 0
      },
      {
        left: true
      },
      {
        left: false
      },
      {
        box: {
          id: 2,
          text: `Des cadres de textes/photos/vidéos qui apparaîssent au fur
          et à mesure que l'on scroll. Les cadres possèdent une
          transistion d'affichage pour les faire
          apparaître progressivement.`
        },
        left: false,
        position: 2
      }
    ]
  }
];

export default boxes;
