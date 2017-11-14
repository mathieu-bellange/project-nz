import TypeBox from './type-box';

const boxes = [
  // between step
  {
    id: -1,
    circle: false,
    keepPrevious: false,
    boxes: []
  },
  // launch
  {
    id: 0,
    circle: false,
    keepPrevious: false,
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
    circle: false,
    keepPrevious: true,
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
    circle: false,
    keepPrevious: true,
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
    keepPrevious: false,
    circle: false,
    boxes: []
  },
  // fourthStep
  {
    id: 4,
    circle: true,
    keepPrevious: false,
    boxes: [
      {
        id: 40,
        left: true,
        position: 0,
        title: 'Aéroport d\'Auckland',
        text: 'second text',
        type: TypeBox.Text
      },
      {
        id: 41,
        left: true
      }
    ]
  },
  // fifthStep
  {
    id: 5,
    keepPrevious: false,
    circle: true,
    boxes: [
      {
        id: 50,
        left: true,
        position: 0,
        title: 'Auckland',
        text: 'second text',
        type: TypeBox.Text
      },
      {
        id: 51,
        left: true
      },
      {
        id: 52,
        left: false
      },
      {
        id: 53,
        left: false,
        position: 2,
        pictures: [
          {
            id: 500,
            prin: {
              src: '/images/auckland/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5000,
                    src: '/images/auckland/02.jpg',
                    wide: false
                  },
                  {
                    id: 5001,
                    src: '/images/auckland/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 5002,
                    src: '/images/auckland/04.jpg',
                    wide: false
                  },
                  {
                    id: 5003,
                    src: '/images/auckland/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 501,
            prin: {
              src: '/images/auckland/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5004,
                    src: '/images/auckland/07.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 5005,
                    src: '/images/auckland/08.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                []
              ]
            }
          },
          {
            id: 502,
            prin: {
              src: '/images/auckland/11.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5006,
                    src: '/images/auckland/09.jpg',
                    wide: false
                  },
                  {
                    id: 5007,
                    src: '/images/auckland/10.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 5008,
                    src: '/images/auckland/12.jpg',
                    wide: false
                  },
                  {
                    id: 5009,
                    src: '/images/auckland/13.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 503,
            prin: {
              src: '/images/auckland/14.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5010,
                    src: '/images/auckland/15.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 5011,
                    src: '/images/auckland/16.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                []
              ]
            }
          },
          {
            id: 504,
            prin: {
              src: '/images/auckland/17.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5010,
                    src: '/images/auckland/18.jpg',
                    wide: false
                  },
                  {
                    id: 5011,
                    src: '/images/auckland/20.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 5012,
                    src: '/images/auckland/21.jpg',
                    wide: false
                  },
                  {
                    id: 5013,
                    src: '/images/auckland/22.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 505,
            prin: {
              src: '/images/auckland/23.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5010,
                    src: '/images/auckland/24.jpg',
                    wide: false
                  },
                  {
                    id: 5011,
                    src: '/images/auckland/25.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 5012,
                    src: '/images/auckland/26.jpg',
                    wide: false
                  },
                  {
                    id: 5013,
                    src: '/images/auckland/27.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 506,
            prin: {
              src: '/images/auckland/28.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5014,
                    src: '/images/auckland/29.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 5015,
                    src: '/images/auckland/30.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                []
              ]
            }
          },
          {
            id: 507,
            prin: {
              src: '/images/auckland/31.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5016,
                    src: '/images/auckland/32.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 5017,
                    src: '/images/auckland/33.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                []
              ]
            }
          },
          {
            id: 508,
            prin: {
              src: '/images/auckland/34.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5018,
                    src: '/images/auckland/35.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 5019,
                    src: '/images/auckland/36.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                []
              ]
            }
          },
          {
            id: 509,
            prin: {
              src: '/images/auckland/37.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5020,
                    src: '/images/auckland/38.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 5021,
                    src: '/images/auckland/39.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                []
              ]
            }
          },
          {
            id: 510,
            prin: {
              src: '/images/auckland/40.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5022,
                    src: '/images/auckland/41.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 5023,
                    src: '/images/auckland/42.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                []
              ]
            }
          },
          {
            id: 511,
            prin: {
              src: '/images/auckland/43.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5024,
                    src: '/images/auckland/44.jpg',
                    wide: false
                  },
                  {
                    id: 5025,
                    src: '/images/auckland/45.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 5026,
                    src: '/images/auckland/46.jpg',
                    wide: false
                  },
                  {
                    id: 5027,
                    src: '/images/auckland/47.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 512,
            prin: {
              src: '/images/auckland/48.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5028,
                    src: '/images/auckland/49.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 5029,
                    src: '/images/auckland/50.jpg',
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
      }
    ]
  },
  // sixthStep
  {
    id: 6,
    circle: true,
    keepPrevious: false,
    boxes: [
      {
        id: 60,
        left: false,
        position: 1,
        title: 'Te Kauwhata',
        text: 'sixth text',
        type: TypeBox.Text
      }
    ]
  },
  // seventhStep
  {
    id: 7,
    circle: false,
    keepPrevious: false,
    boxes: [
      {
        id: 70,
        left: false,
        title: 'Hamilton',
        text: 'seventh text',
        type: TypeBox.Text
      },
      {
        id: 71,
        left: false
      }
    ]
  }
];

export default boxes;
