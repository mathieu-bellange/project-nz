import TypeBox from './type-box';
import roadToNz from './road-to-nz.md';
import singapour from './singapour.md';
import aucklandAirport from './auckland-airport.md';
import aucklandCBD from './auckland-cbd.md';
import teKauwhata from './te-kauwhata.md';
import hamilton from './hamilton.md';
import lakeMaraetai from './lake-maraetai.md';
import taupo from './taupo.md';
import tongariroAlpineCrossing from './tongariro-alpine-crossing.md';
import gollumsPool from './gollums-pool.md';
import mountRuapehu from './mount-ruapehu.md';
import ruatihiDomain from './ruatihi-domain.md';
import roadToWanganui from './road-to-wanganui.md';
import wanganui from './wanganui.md';
import feilding from './feilding.md';
import himatangiBeach from './himatangi-beach.md';
import levin from './levin.md';
import waikanae from './waikanae.md';
import wellington from './wellington.md';
import kapitiIsland from './kapiti-island.md';
import roadToRivendell from './road-to-rivendell.md';
import rivendell from './rivendell.md';

const boxAirplaneTxt = {
  id: 0,
  left: true,
  text: roadToNz,
  date: '6 Janvier',
  type: TypeBox.Text
};
const boxAirplaneImg = {
  id: 10,
  left: false,
  position: 1,
  title: 'Airplane',
  pictures: [
    {
      id: 10,
      prin: {
        id: 100,
        src: '/images/airplane/01.jpg'
      },
      secondary: {
        sources: [
          [
            {
              id: 101,
              src: '/images/airplane/02.jpg',
              wide: false
            },
            {
              id: 102,
              src: '/images/airplane/03.jpg',
              wide: false
            }
          ],
          [
            {
              id: 103,
              src: '/images/airplane/04.jpg',
              wide: false
            },
            {
              id: 104,
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
        id: 105,
        src: '/images/airplane/06.jpg'
      },
      secondary: {
        sources: [
          [
            {
              id: 106,
              src: '/images/airplane/07.jpg',
              wide: false,
              turn: true
            },
            {
              id: 107,
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
};

const boxAirplaneMixed = {
  id: 20,
  left: false,
  position: 2,
  title: 'Singapour',
  break: true,
  pictures: [
    {
      id: 20,
      prin: {
        id: 200,
        text: singapour
      },
      secondary: {
        sources: [
          [
            {
              id: 201,
              src: '/images/singapour/01.jpg',
              wide: false
            },
            {
              id: 202,
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
        id: 203,
        src: '/images/singapour/03.jpg'
      },
      secondary: {
        sources: [
          [
            {
              id: 204,
              src: '/images/singapour/04.jpg',
              turn: true
            },
            {
              id: 205,
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
};

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
      boxAirplaneTxt
    ]
  },
  // firstStep
  {
    id: 1,
    circle: false,
    keepPrevious: false,
    boxes: [
      boxAirplaneTxt,
      boxAirplaneImg,
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
    keepPrevious: false,
    boxes: [
      boxAirplaneTxt,
      boxAirplaneImg,
      boxAirplaneMixed
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
        date: '7 janvier',
        text: aucklandAirport,
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
        date: '7 janvier',
        text: aucklandCBD,
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
              id: 5000,
              src: '/images/auckland/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5001,
                    src: '/images/auckland/02.jpg',
                    wide: false
                  },
                  {
                    id: 5002,
                    src: '/images/auckland/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 5003,
                    src: '/images/auckland/04.jpg',
                    wide: false
                  },
                  {
                    id: 5004,
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
              id: 5005,
              src: '/images/auckland/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5006,
                    src: '/images/auckland/07.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 5007,
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
              id: 5008,
              src: '/images/auckland/11.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5009,
                    src: '/images/auckland/09.jpg',
                    wide: false
                  },
                  {
                    id: 5010,
                    src: '/images/auckland/10.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 5011,
                    src: '/images/auckland/12.jpg',
                    wide: false
                  },
                  {
                    id: 5012,
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
              id: 5013,
              src: '/images/auckland/14.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5014,
                    src: '/images/auckland/15.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 5015,
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
              id: 5016,
              src: '/images/auckland/17.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5017,
                    src: '/images/auckland/18.jpg',
                    wide: false
                  },
                  {
                    id: 5018,
                    src: '/images/auckland/20.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 5019,
                    src: '/images/auckland/21.jpg',
                    wide: false
                  },
                  {
                    id: 5020,
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
              id: 5021,
              src: '/images/auckland/23.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5022,
                    src: '/images/auckland/24.jpg',
                    wide: false
                  },
                  {
                    id: 5023,
                    src: '/images/auckland/25.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 5024,
                    src: '/images/auckland/26.jpg',
                    wide: false
                  },
                  {
                    id: 5025,
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
              id: 5026,
              src: '/images/auckland/28.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5027,
                    src: '/images/auckland/29.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 5028,
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
              id: 5029,
              src: '/images/auckland/31.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5030,
                    src: '/images/auckland/32.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 5031,
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
              id: 5032,
              src: '/images/auckland/34.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5033,
                    src: '/images/auckland/35.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 5034,
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
              id: 5035,
              src: '/images/auckland/37.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5036,
                    src: '/images/auckland/38.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 5037,
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
              id: 5038,
              src: '/images/auckland/40.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5039,
                    src: '/images/auckland/41.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 5040,
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
              id: 5041,
              src: '/images/auckland/43.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5042,
                    src: '/images/auckland/44.jpg',
                    wide: false
                  },
                  {
                    id: 5043,
                    src: '/images/auckland/45.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 5044,
                    src: '/images/auckland/46.jpg',
                    wide: false
                  },
                  {
                    id: 5045,
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
              id: 5046,
              src: '/images/auckland/48.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 5047,
                    src: '/images/auckland/49.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 5048,
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
        date: '16 janvier',
        text: teKauwhata,
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
        date: '17 janvier',
        text: hamilton,
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
        text: lakeMaraetai,
        date: '17 janvier',
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
              id: 8000,
              src: '/images/maraetai/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 8001,
                    src: '/images/maraetai/02.jpg',
                    wide: false
                  },
                  {
                    id: 8002,
                    src: '/images/maraetai/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 8003,
                    src: '/images/maraetai/04.jpg',
                    wide: false
                  },
                  {
                    id: 8004,
                    src: '/images/maraetai/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 801,
            prin: {
              id: 8005,
              src: '/images/maraetai/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 8006,
                    src: '/images/maraetai/07.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 8007,
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
            id: 802,
            prin: {
              id: 8008,
              src: '/images/maraetai/09.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 8009,
                    src: '/images/maraetai/10.jpg',
                    wide: false
                  },
                  {
                    id: 8010,
                    src: '/images/maraetai/11.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 8011,
                    src: '/images/maraetai/12.jpg',
                    wide: false
                  },
                  {
                    id: 8012,
                    src: '/images/maraetai/13.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 803,
            prin: {
              id: 8013,
              src: '/images/maraetai/14.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 8014,
                    src: '/images/maraetai/15.jpg',
                    wide: false
                  },
                  {
                    id: 8015,
                    src: '/images/maraetai/16.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 8016,
                    src: '/images/maraetai/17.jpg',
                    wide: false
                  },
                  {
                    id: 8017,
                    src: '/images/maraetai/18.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 804,
            prin: {
              id: 8018,
              src: '/images/maraetai/19.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 8019,
                    src: '/images/maraetai/20.jpg',
                    wide: false
                  },
                  {
                    id: 8020,
                    src: '/images/maraetai/21.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 8021,
                    src: '/images/maraetai/22.jpg',
                    wide: false
                  },
                  {
                    id: 8022,
                    src: '/images/maraetai/23.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 805,
            prin: {
              id: 8023,
              src: '/images/maraetai/24.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 8024,
                    src: '/images/maraetai/25.jpg',
                    wide: false
                  },
                  {
                    id: 8025,
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
        date: '19 janvier',
        text: taupo,
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
              id: 9000,
              src: '/images/taupo/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 9001,
                    src: '/images/taupo/02.jpg',
                    wide: false
                  },
                  {
                    id: 9002,
                    src: '/images/taupo/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 9003,
                    src: '/images/taupo/04.jpg',
                    wide: false
                  },
                  {
                    id: 9004,
                    src: '/images/taupo/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 901,
            prin: {
              id: 9005,
              src: '/images/taupo/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 9006,
                    src: '/images/taupo/07.jpg',
                    wide: false
                  },
                  {
                    id: 9007,
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
        date: '20 janvier',
        text: tongariroAlpineCrossing,
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
              id: 10000,
              src: '/images/kaimanawa/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 10001,
                    src: '/images/kaimanawa/02.jpg',
                    wide: false
                  },
                  {
                    id: 10002,
                    src: '/images/kaimanawa/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 10003,
                    src: '/images/kaimanawa/04.jpg',
                    wide: false
                  },
                  {
                    id: 10004,
                    src: '/images/kaimanawa/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 1001,
            prin: {
              id: 10005,
              src: '/images/kaimanawa/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 10006,
                    src: '/images/kaimanawa/07.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 10007,
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
            id: 1002,
            prin: {
              id: 10008,
              src: '/images/kaimanawa/09.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 10009,
                    src: '/images/kaimanawa/10.jpg',
                    wide: false
                  },
                  {
                    id: 10010,
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
        date: '21 Janvier',
        text: gollumsPool,
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
              id: 11000,
              src: '/images/gollum/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 11001,
                    src: '/images/gollum/02.jpg',
                    wide: false
                  },
                  {
                    id: 11002,
                    src: '/images/gollum/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 11003,
                    src: '/images/gollum/04.jpg',
                    wide: false
                  },
                  {
                    id: 11004,
                    src: '/images/gollum/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 1101,
            prin: {
              id: 11005,
              src: '/images/gollum/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 11006,
                    src: '/images/gollum/07.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 11007,
                    src: '/images/gollum/08.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                [
                  {
                    id: 11008,
                    src: '/images/gollum/09.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 11009,
                    src: '/images/gollum/10.jpg',
                    wide: false,
                    turn: true
                  }
                ]
              ]
            }
          },
          {
            id: 1102,
            prin: {
              id: 11010,
              src: '/images/gollum/11.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 11011,
                    src: '/images/gollum/12.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 11012,
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
            id: 1103,
            prin: {
              id: 11013,
              src: '/images/gollum/14.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 11014,
                    src: '/images/gollum/15.jpg',
                    wide: false
                  },
                  {
                    id: 11015,
                    src: '/images/gollum/16.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 11016,
                    src: '/images/gollum/17.jpg',
                    wide: false
                  },
                  {
                    id: 11017,
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
        position: 0,
        pictures: [
          {
            id: 1200,
            prin: {
              id: 12000,
              date: '21 Janvier',
              text: mountRuapehu
            },
            secondary: {
              sources: [
                [
                  {
                    id: 12001,
                    src: '/images/mangahuia/01.jpg',
                    wide: false
                  },
                  {
                    id: 12002,
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
      },
      {
        id: 121,
        left: true
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
        date: '23 Janvier',
        text: ruatihiDomain,
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
              id: 13000,
              src: '/images/ruatihi/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 13001,
                    src: '/images/ruatihi/02.jpg',
                    wide: false
                  },
                  {
                    id: 13002,
                    src: '/images/ruatihi/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 13003,
                    src: '/images/ruatihi/04.jpg',
                    wide: false
                  },
                  {
                    id: 13004,
                    src: '/images/ruatihi/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 1301,
            prin: {
              id: 13005,
              src: '/images/ruatihi/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 13006,
                    src: '/images/ruatihi/07.jpg',
                    wide: false
                  },
                  {
                    id: 13007,
                    src: '/images/ruatihi/08.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 13008,
                    src: '/images/ruatihi/09.jpg',
                    wide: false
                  },
                  {
                    id: 13009,
                    src: '/images/ruatihi/10.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 1302,
            prin: {
              id: 13010,
              src: '/images/ruatihi/11.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 13011,
                    src: '/images/ruatihi/12.jpg',
                    wide: false
                  },
                  {
                    id: 13012,
                    src: '/images/ruatihi/13.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 13013,
                    src: '/images/ruatihi/14.jpg',
                    wide: false
                  },
                  {
                    id: 13014,
                    src: '/images/ruatihi/15.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 1303,
            prin: {
              id: 13015,
              src: '/images/ruatihi/16.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 13016,
                    src: '/images/ruatihi/17.jpg',
                    wide: false
                  },
                  {
                    id: 13017,
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
        date: '25 Janvier',
        text: roadToWanganui,
        type: TypeBox.Text
      },
      {
        id: 141,
        left: false
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
        date: '26 Janvier',
        text: wanganui,
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
              id: 15000,
              src: '/images/wanganui/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 15001,
                    src: '/images/wanganui/02.jpg',
                    wide: false
                  },
                  {
                    id: 15002,
                    src: '/images/wanganui/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 15003,
                    src: '/images/wanganui/04.jpg',
                    wide: false
                  },
                  {
                    id: 15004,
                    src: '/images/wanganui/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 1501,
            prin: {
              id: 15005,
              src: '/images/wanganui/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 15006,
                    src: '/images/wanganui/07.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 15007,
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
            id: 1502,
            prin: {
              id: 15008,
              src: '/images/wanganui/09.jpg',
              bad: true
            },
            secondary: {
              sources: [
                [
                  {
                    id: 15009,
                    src: '/images/wanganui/10.jpg',
                    wide: false
                  },
                  {
                    id: 15010,
                    src: '/images/wanganui/11.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 15011,
                    src: '/images/wanganui/12.jpg',
                    wide: false
                  },
                  {
                    id: 15012,
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
        date: '27 Janvier',
        text: feilding,
        type: TypeBox.Text
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
        id: 170,
        left: false,
        position: 1,
        date: '28 Janvier',
        text: himatangiBeach,
        type: TypeBox.Text
      }
    ]
  },
  // eighteenthStep
  {
    id: 18,
    circle: false,
    keepPrevious: false,
    boxes: [
      {
        id: 180,
        left: false,
        position: 0,
        date: '30 Janvier',
        text: levin,
        type: TypeBox.Text
      }
    ]
  },
  // nineteenthStep
  {
    id: 19,
    circle: true,
    keepPrevious: false,
    boxes: [
      {
        id: 190,
        left: true,
        position: 1,
        date: '31 Janvier',
        text: waikanae,
        type: TypeBox.Text
      },
      {
        id: 191,
        left: false,
        position: 1,
        pictures: [
          {
            id: 1900,
            prin: {
              id: 19000,
              src: '/images/waikanae/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 19001,
                    src: '/images/waikanae/02.jpg',
                    wide: false
                  },
                  {
                    id: 19002,
                    src: '/images/waikanae/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 19003,
                    src: '/images/waikanae/04.jpg',
                    wide: false
                  },
                  {
                    id: 19004,
                    src: '/images/waikanae/05.jpg',
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
  // twentiethStep
  {
    id: 20,
    circle: false,
    keepPrevious: false,
    boxes: [
      {
        id: 200,
        left: false,
        position: 0,
        date: '2 Février',
        text: wellington,
        type: TypeBox.Text
      },
      {
        id: 201,
        left: false
      }
    ]
  },
  // twenty first Step
  {
    id: 21,
    circle: false,
    keepPrevious: false,
    boxes: [
      {
        id: 210,
        left: true,
        date: '3 février',
        text: kapitiIsland,
        type: TypeBox.Text
      },
      {
        id: 211,
        left: false
      },
      {
        id: 212,
        left: false,
        position: 2,
        pictures: [
          {
            id: 2100,
            prin: {
              id: 21000,
              src: '/images/kapiti-island/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 21001,
                    src: '/images/kapiti-island/02.jpg',
                    wide: false
                  },
                  {
                    id: 21002,
                    src: '/images/kapiti-island/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 21003,
                    src: '/images/kapiti-island/04.jpg',
                    wide: false
                  },
                  {
                    id: 21004,
                    src: '/images/kapiti-island/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 2101,
            prin: {
              id: 21005,
              src: '/images/kapiti-island/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 21006,
                    src: '/images/kapiti-island/07.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 21007,
                    src: '/images/kapiti-island/08.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                []
              ]
            }
          },
          {
            id: 2102,
            prin: {
              id: 21008,
              src: '/images/kapiti-island/09.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 21009,
                    src: '/images/kapiti-island/10.jpg',
                    wide: false
                  },
                  {
                    id: 21010,
                    src: '/images/kapiti-island/11.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 21011,
                    src: '/images/kapiti-island/12.jpg',
                    wide: false
                  },
                  {
                    id: 21012,
                    src: '/images/kapiti-island/13.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 2103,
            prin: {
              id: 21013,
              src: '/images/kapiti-island/14.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 21014,
                    src: '/images/kapiti-island/15.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 21015,
                    src: '/images/kapiti-island/16.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                []
              ]
            }
          },
          {
            id: 2104,
            prin: {
              id: 21016,
              src: '/images/kapiti-island/17.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 21017,
                    src: '/images/kapiti-island/18.jpg',
                    wide: false
                  },
                  {
                    id: 21018,
                    src: '/images/kapiti-island/19.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 21019,
                    src: '/images/kapiti-island/20.jpg',
                    wide: false
                  },
                  {
                    id: 21020,
                    src: '/images/kapiti-island/21.jpg',
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
  // twenty second Step
  {
    id: 22,
    circle: false,
    keepPrevious: false,
    boxes: [
      {
        id: 220,
        left: false,
        position: 0,
        date: '4 Février',
        text: roadToRivendell,
        type: TypeBox.Text
      },
      {
        id: 221,
        left: false
      }
    ]
  },
  // twenty third Step
  {
    id: 23,
    circle: true,
    keepPrevious: false,
    boxes: [
      {
        id: 231,
        left: true,
        position: 0,
        date: '4 Février',
        text: rivendell,
        type: TypeBox.Text
      },
      {
        id: 230,
        left: true
      },
      {
        id: 232,
        left: false,
        position: 1,
        pictures: [
          {
            id: 2300,
            prin: {
              id: 23000,
              src: '/images/rivendell/01.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 23001,
                    src: '/images/rivendell/02.jpg',
                    wide: false
                  },
                  {
                    id: 23002,
                    src: '/images/rivendell/03.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 23003,
                    src: '/images/rivendell/04.jpg',
                    wide: false
                  },
                  {
                    id: 23004,
                    src: '/images/rivendell/05.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 2301,
            prin: {
              id: 23005,
              src: '/images/rivendell/06.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 23006,
                    src: '/images/rivendell/07.jpg',
                    wide: false
                  },
                  {
                    id: 23007,
                    src: '/images/rivendell/08.jpg',
                    wide: false
                  }
                ],
                [
                  {
                    id: 23008,
                    src: '/images/rivendell/09.jpg',
                    wide: false
                  },
                  {
                    id: 23009,
                    src: '/images/rivendell/10.jpg',
                    wide: false
                  }
                ]
              ]
            }
          },
          {
            id: 2302,
            prin: {
              id: 23010,
              src: '/images/rivendell/11.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 23011,
                    src: '/images/rivendell/12.jpg',
                    wide: false,
                    turn: true
                  },
                  {
                    id: 23012,
                    src: '/images/rivendell/13.jpg',
                    wide: false,
                    turn: true
                  }
                ],
                []
              ]
            }
          },
          {
            id: 2303,
            prin: {
              id: 23013,
              src: '/images/rivendell/14.jpg'
            },
            secondary: {
              sources: [
                [
                  {
                    id: 23014,
                    src: '/images/rivendell/15.jpg',
                    wide: false
                  },
                  {
                    id: 23015,
                    src: '/images/rivendell/16.jpg',
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
  // twenty fourth Step
  {
    id: 24,
    circle: false,
    keepPrevious: false,
    boxes: [
      {
        id: 240,
        left: false,
        position: 0,
        title: 'Ferry',
        text: 'text',
        type: TypeBox.Text
      },
      {
        id: 241,
        left: false
      }
    ]
  }
];

export default boxes;
