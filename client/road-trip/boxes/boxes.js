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
        id: 10,
        left: false,
        position: 1,
        pictures: [
          {
            id: 10,
            prin: {
              src: '/images/airplane/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 100,
                    src: '/images/airplane/02.jpg',
                    wide: false
                  },
                  {
                    id: 101,
                    src: '/images/airplane/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 102,
                    src: '/images/airplane/04.jpg',
                    wide: false
                  },
                  {
                    id: 103,
                    src: '/images/airplane/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 11,
            prin: {
              src: '/images/airplane/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 104,
                    src: '/images/airplane/07.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 105,
                    src: '/images/airplane/08.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                []
              ]
            }
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
        pictures: [
          {
            id: 20,
            prin: {
              title: 'Singapour',
              text: 'un texte sur singapour'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 200,
                    src: '/images/singapour/01.jpg',
                    wide: false
                  },
                  {
                    id: 201,
                    src: '/images/singapour/02.jpg',
                    wide: false
                  }
                ],
                []
              ]
            }
          },
          {
            id: 21,
            prin: {
              id: 204,
              src: '/images/singapour/03.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 205,
                    src: '/images/singapour/04.jpg',
                    turn: true
                  },
                  {
                    id: 206,
                    src: '/images/singapour/05.jpg',
                    turn: true
                  }
                ],
                []
              ]
            }
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
