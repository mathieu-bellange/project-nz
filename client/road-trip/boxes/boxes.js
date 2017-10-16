import TypeBox from './type-box';

const boxes = [
  // launch
  {
    id: 0,
    boxes: [
      {
        id: 0,
        left: true,
        title: 'Road To Nz',
        text: 'first text',
        type: TypeBox.Text
      }
    ]
  },
  // firstStep
  {
    id: 1,
    boxes: [
      {
        id: 1,
        left: false,
        position: 1,
        prin: '/images/DSC00864.jpg',
        pictures: [
          {
            up: true,
            src: '/images/DSC01597.jpg',
            wide: true
          },
          {
            up: false,
            src: '/images/DSC00864.jpg',
            wide: false
          },
          {
            up: false,
            src: '/images/DSC00864.jpg',
            wide: false
          }
        ],
        type: TypeBox.Picture
      },
      {
        id: 2,
        position: 2,
        left: false
      }
    ]
  },
  // secondStep
  {
    id: 2,
    boxes: [
      {
        id: 2,
        left: false,
        position: 2,
        title: 'Singapour',
        text: 'un texte sur singapour',
        pictures: [
          {
            up: true,
            src: '/images/DSC00864.jpg',
            wide: false
          },
          {
            up: true,
            src: '/images/DSC00864.jpg',
            wide: false
          },
          {
            up: false,
            src: '/images/DSC00864.jpg',
            wide: false
          }
        ],
        type: TypeBox.Mixed
      }
    ]
  },
  // thirdStep
  {
    id: 3,
    boxes: []
  },
  {
    id: 666,
    boxes: [
      {
        box: {
          id: 1,
          pictures: [
            {
              up: true,
              src: '/images/DSC01597.jpg',
              wide: true
            },
            {
              up: false,
              src: '/images/DSC00864.jpg',
              wide: false
            },
            {
              up: false,
              src: '/images/DSC00864.jpg',
              wide: false
            }
          ],
          type: TypeBox.Picture
        },
        left: false,
        position: 0
      },
      {
        left: false
      },
      {
        left: true
      },
      {
        box: {
          id: 2,
          text: `Des cadres de textes/photos/vidéos qui apparaîssent au fur
          et à mesure que l'on scroll. Les cadres possèdent une
          transistion d'affichage pour les faire
          apparaître progressivement.`,
          type: TypeBox.Text
        },
        left: true,
        position: 2
      }
    ]
  }
];

export default boxes;
