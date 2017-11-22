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
  },
  // eigthStep
  {
    id: 8,
    circle: true,
    keepPrevious: false,
    boxes: [
      {
        id: 80,
        left: true
      },
      {
        id: 81,
        left: true,
        position: 2,
        title: 'Lac Maraetai',
        text: 'eigth text',
        type: TypeBox.Text
      },
      {
        id: 82,
        left: false,
        position: 0,
        pictures: [
          {
            id: 800,
            prin: {
              src: '/images/maraetai/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 801,
                    src: '/images/maraetai/02.jpg',
                    wide: false
                  },
                  {
                    id: 802,
                    src: '/images/maraetai/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 803,
                    src: '/images/maraetai/04.jpg',
                    wide: false
                  },
                  {
                    id: 804,
                    src: '/images/maraetai/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 805,
            prin: {
              src: '/images/maraetai/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 806,
                    src: '/images/maraetai/07.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 807,
                    src: '/images/maraetai/08.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                []
              ]
            }
          },
          {
            id: 808,
            prin: {
              src: '/images/maraetai/09.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 809,
                    src: '/images/maraetai/10.jpg',
                    wide: false
                  },
                  {
                    id: 810,
                    src: '/images/maraetai/11.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 811,
                    src: '/images/maraetai/12.jpg',
                    wide: false
                  },
                  {
                    id: 812,
                    src: '/images/maraetai/13.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 813,
            prin: {
              src: '/images/maraetai/14.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 814,
                    src: '/images/maraetai/15.jpg',
                    wide: false
                  },
                  {
                    id: 815,
                    src: '/images/maraetai/16.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 816,
                    src: '/images/maraetai/17.jpg',
                    wide: false
                  },
                  {
                    id: 817,
                    src: '/images/maraetai/18.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 818,
            prin: {
              src: '/images/maraetai/19.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 819,
                    src: '/images/maraetai/20.jpg',
                    wide: false
                  },
                  {
                    id: 820,
                    src: '/images/maraetai/21.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 821,
                    src: '/images/maraetai/22.jpg',
                    wide: false
                  },
                  {
                    id: 822,
                    src: '/images/maraetai/23.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 823,
            prin: {
              src: '/images/maraetai/24.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 824,
                    src: '/images/maraetai/25.jpg',
                    wide: false
                  },
                  {
                    id: 825,
                    src: '/images/maraetai/26.jpg',
                    wide: false
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
        id: 83,
        left: false
      }
    ]
  },
  // ninthStep
  {
    id: 9,
    circle: true,
    keepPrevious: false,
    boxes: [
      {
        id: 90,
        left: false,
        position: 1,
        title: 'Lac Taupo',
        text: 'ninth text',
        type: TypeBox.Text
      },
      {
        id: 91,
        left: true
      },
      {
        id: 92,
        left: true,
        position: 2,
        pictures: [
          {
            id: 900,
            prin: {
              src: '/images/taupo/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 901,
                    src: '/images/taupo/02.jpg',
                    wide: false
                  },
                  {
                    id: 902,
                    src: '/images/taupo/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 903,
                    src: '/images/taupo/04.jpg',
                    wide: false
                  },
                  {
                    id: 904,
                    src: '/images/taupo/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 905,
            prin: {
              src: '/images/taupo/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 906,
                    src: '/images/taupo/07.jpg',
                    wide: false
                  },
                  {
                    id: 907,
                    src: '/images/taupo/08.jpg',
                    wide: false
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
        id: 83,
        left: false
      }
    ]
  },
  // tenthStep
  {
    id: 10,
    circle: true,
    keepPrevious: false,
    boxes: [
      {
        id: 100,
        left: true,
        position: 1,
        title: 'Forêt',
        text: 'tenth text',
        type: TypeBox.Text
      },
      {
        id: 101,
        left: false,
        position: 1,
        pictures: [
          {
            id: 1000,
            prin: {
              src: '/images/kaimanawa/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 1001,
                    src: '/images/kaimanawa/02.jpg',
                    wide: false
                  },
                  {
                    id: 1002,
                    src: '/images/kaimanawa/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 1003,
                    src: '/images/kaimanawa/04.jpg',
                    wide: false
                  },
                  {
                    id: 1004,
                    src: '/images/kaimanawa/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 1005,
            prin: {
              src: '/images/kaimanawa/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 1006,
                    src: '/images/kaimanawa/07.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 1007,
                    src: '/images/kaimanawa/08.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                []
              ]
            }
          },
          {
            id: 1008,
            prin: {
              src: '/images/kaimanawa/09.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 1009,
                    src: '/images/kaimanawa/10.jpg',
                    wide: false
                  },
                  {
                    id: 1010,
                    src: '/images/kaimanawa/11.jpg',
                    wide: false
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
  // eleventhStep
  {
    id: 11,
    circle: true,
    keepPrevious: false,
    boxes: [
      {
        id: 110,
        left: true,
        position: 0,
        title: 'Forêt',
        text: 'tenth text',
        type: TypeBox.Text
      },
      {
        id: 111,
        left: true,
        position: 2,
        pictures: [
          {
            id: 1100,
            prin: {
              src: '/images/gollum/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 1101,
                    src: '/images/gollum/02.jpg',
                    wide: false
                  },
                  {
                    id: 1102,
                    src: '/images/gollum/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 1103,
                    src: '/images/gollum/04.jpg',
                    wide: false
                  },
                  {
                    id: 1104,
                    src: '/images/gollum/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 1105,
            prin: {
              src: '/images/gollum/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 1106,
                    src: '/images/gollum/07.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 1107,
                    src: '/images/gollum/08.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                [
                  {
                    id: 1108,
                    src: '/images/gollum/09.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 1109,
                    src: '/images/gollum/10.jpg',
                    wide: false,
                    turn: true
                  }
                ]
              ]
            }
          },
          {
            id: 1110,
            prin: {
              src: '/images/gollum/11.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 1111,
                    src: '/images/gollum/12.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 1112,
                    src: '/images/gollum/13.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                []
              ]
            }
          },
          {
            id: 1113,
            prin: {
              src: '/images/gollum/14.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 1114,
                    src: '/images/gollum/15.jpg',
                    wide: false
                  },
                  {
                    id: 1115,
                    src: '/images/gollum/16.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 1116,
                    src: '/images/gollum/17.jpg',
                    wide: false
                  },
                  {
                    id: 1117,
                    src: '/images/gollum/18.jpg',
                    wide: false
                  }
                ]
              ]
            }
          }
        ],
        type: TypeBox.Picture
      }
    ]
  },
  // twelvethStep
  {
    id: 12,
    circle: true,
    keepPrevious: false,
    boxes: [
      {
        id: 120,
        left: true,
        position: 1,
        pictures: [
          {
            id: 1200,
            prin: {
              title: 'Mangahuia',
              text: 'un texte sur Mangahuia'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 1201,
                    src: '/images/mangahuia/01.jpg',
                    wide: false
                  },
                  {
                    id: 1202,
                    src: '/images/mangahuia/02.jpg',
                    wide: false
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
  // thirteenthStep
  {
    id: 13,
    circle: true,
    keepPrevious: false,
    boxes: [
      {
        id: 130,
        left: true,
        position: 2,
        title: 'Ruatihi domain',
        text: 'text',
        type: TypeBox.Text
      },
      {
        id: 131,
        left: true,
        position: 0,
        pictures: [
          {
            id: 1300,
            prin: {
              src: '/images/ruatihi/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 1301,
                    src: '/images/ruatihi/02.jpg',
                    wide: false
                  },
                  {
                    id: 1302,
                    src: '/images/ruatihi/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 1303,
                    src: '/images/ruatihi/04.jpg',
                    wide: false
                  },
                  {
                    id: 1304,
                    src: '/images/ruatihi/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 1305,
            prin: {
              src: '/images/ruatihi/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 1306,
                    src: '/images/ruatihi/07.jpg',
                    wide: false
                  },
                  {
                    id: 1307,
                    src: '/images/ruatihi/08.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 1308,
                    src: '/images/ruatihi/09.jpg',
                    wide: false
                  },
                  {
                    id: 1309,
                    src: '/images/ruatihi/10.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 1310,
            prin: {
              src: '/images/ruatihi/11.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 1311,
                    src: '/images/ruatihi/12.jpg',
                    wide: false
                  },
                  {
                    id: 1312,
                    src: '/images/ruatihi/13.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 1313,
                    src: '/images/ruatihi/14.jpg',
                    wide: false
                  },
                  {
                    id: 1314,
                    src: '/images/ruatihi/15.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 1315,
            prin: {
              src: '/images/ruatihi/16.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 1316,
                    src: '/images/ruatihi/17.jpg',
                    wide: false
                  },
                  {
                    id: 1317,
                    src: '/images/ruatihi/18.jpg',
                    wide: false
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
  // fourteenthStep
  {
    id: 14,
    circle: false,
    keepPrevious: false,
    boxes: [
      {
        id: 140,
        left: false,
        title: 'Road to Wanganui',
        text: 'text',
        type: TypeBox.Text
      }
    ]
  },
  // fifteenthStep
  {
    id: 15,
    circle: true,
    keepPrevious: false,
    boxes: [
      {
        id: 150,
        left: false,
        position: 1,
        title: 'Wanganui',
        text: 'text',
        type: TypeBox.Text
      },
      {
        id: 151,
        left: true,
        position: 0,
        pictures: [
          {
            id: 1500,
            prin: {
              src: '/images/wanganui/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 1501,
                    src: '/images/wanganui/02.jpg',
                    wide: false
                  },
                  {
                    id: 1502,
                    src: '/images/wanganui/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 1503,
                    src: '/images/wanganui/04.jpg',
                    wide: false
                  },
                  {
                    id: 1504,
                    src: '/images/wanganui/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 1505,
            prin: {
              src: '/images/wanganui/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 1506,
                    src: '/images/wanganui/07.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 1507,
                    src: '/images/wanganui/08.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                []
              ]
            }
          },
          {
            id: 1508,
            prin: {
              src: '/images/wanganui/09.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 1509,
                    src: '/images/wanganui/10.jpg',
                    wide: false
                  },
                  {
                    id: 1510,
                    src: '/images/wanganui/11.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 1511,
                    src: '/images/wanganui/12.jpg',
                    wide: false
                  },
                  {
                    id: 1512,
                    src: '/images/wanganui/13.jpg',
                    wide: false
                  }
                ]
              ]
            }
          }
        ],
        type: TypeBox.Picture
      },
      {
        id: 152,
        left: true
      }
    ]
  },
  // sixteenthStep
  {
    id: 16,
    circle: true,
    keepPrevious: false,
    boxes: [
      {
        id: 160,
        left: false,
        position: 1,
        title: 'Feilding',
        text: 'text',
        type: TypeBox.Text
      },
      {
        id: 161,
        left: true,
        position: 1,
        pictures: [
          {
            id: 1600,
            prin: {
              src: '/images/feilding/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 1601,
                    src: '/images/feilding/02.jpg',
                    wide: false
                  },
                  {
                    id: 1602,
                    src: '/images/feilding/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 1603,
                    src: '/images/feilding/04.jpg',
                    wide: false
                  },
                  {
                    id: 1604,
                    src: '/images/feilding/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          }
        ],
        type: TypeBox.Picture
      }
    ]
  },
  // seventeenthStep
  {
    id: 17,
    circle: true,
    keepPrevious: false,
    boxes: [
      {
        id: 160,
        left: false,
        position: 1,
        title: 'Minatangi Beach',
        text: 'text',
        type: TypeBox.Text
      }
    ]
  }
];

export default boxes;
