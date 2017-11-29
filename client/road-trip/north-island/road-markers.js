import { Marker } from '../tools';

const markers = [
  new Marker('rnh32-rnh33', 740, 964, 738, 976),
  new Marker('rnh33-rnh34', 738, 976, 741, 974),
  new Marker('rnh33-rnh35', 738, 976, 712, 991),
  new Marker('rnh35-rnh36', 712, 991, 713, 994)
];

const buildRoads = pixelRatio => ([
  new Marker('rnh1-rnh2', 708, 502, 705, 485, pixelRatio),
  new Marker('rnh2-rnh3', 705, 485, 743, 548, pixelRatio),
  new Marker('rnh3-rnh4', 743, 548, 752, 592, pixelRatio),
  new Marker('rnh4-rnh5', 752, 592, 759, 622, pixelRatio),
  new Marker('rnh5-rnh6', 759, 622, 797, 660, pixelRatio),
  new Marker('rnh6-rnh7', 797, 660, 819, 661, pixelRatio),
  new Marker('rnh7-rnh8', 819, 661, 827, 699, pixelRatio),
  new Marker('rnh8-rnh9', 827, 699, 827, 708, pixelRatio),
  new Marker('rnh9-rnh10', 827, 708, 802, 731, pixelRatio),
  new Marker('rnh10-rnh11', 802, 731, 802, 747, pixelRatio),
  new Marker('rnh11-rnh12', 802, 747, 783, 738, pixelRatio),
  new Marker('rnh12-rnh13', 783, 738, 775, 751, pixelRatio),
  new Marker('rnh13-rnh14', 775, 751, 764, 753, pixelRatio),
  new Marker('rnh14-rnh15', 764, 753, 759, 774, pixelRatio),
  new Marker('rnh15-rnh16', 759, 774, 747, 770, pixelRatio),
  new Marker('rnh16-rnh17', 747, 770, 744, 760, pixelRatio),
  new Marker('rnh17-rnh16', 744, 760, 747, 770, pixelRatio),
  new Marker('rnh16-rnh15', 747, 770, 759, 774, pixelRatio),
  new Marker('rnh15-rnh18', 759, 774, 765, 782, pixelRatio),
  new Marker('rnh18-rnh19', 765, 782, 752, 782, pixelRatio),
  new Marker('rnh19-rnh20', 752, 782, 756, 820, pixelRatio),
  new Marker('rnh20-rnh21', 756, 820, 733, 842, pixelRatio),
  new Marker('rnh21-rnh22', 733, 842, 762, 867, pixelRatio),
  new Marker('rnh22-rnh23', 762, 867, 778, 874, pixelRatio),
  new Marker('rnh23-rnh24', 778, 874, 765, 875, pixelRatio),
  new Marker('rnh24-rnh25', 765, 875, 756, 893, pixelRatio),
  new Marker('rnh25-rnh26', 756, 893, 749, 891, pixelRatio),
  new Marker('rnh26-rnh25', 749, 891, 756, 893, pixelRatio),
  new Marker('rnh25-rnh27', 756, 893, 753, 921, pixelRatio),
  new Marker('rnh27-rnh28', 753, 921, 740, 937, pixelRatio),
  new Marker('rnh28-rnh29', 740, 937, 733, 950, pixelRatio),
  new Marker('rnh29-rnh30', 733, 950, 727, 957, pixelRatio),
  new Marker('rnh30-rnh31', 727, 957, 709, 996, pixelRatio),
  new Marker('rnh31-rnh30', 709, 996, 727, 957, pixelRatio),
  new Marker('rnh30-rnh29', 727, 957, 733, 950, pixelRatio),
  new Marker('rnh29-kb1', 733, 950, 728, 949, pixelRatio),
  new Marker('kb1-kb2', 728, 949, 720, 947, pixelRatio),
  new Marker('kb2-kb1', 720, 947, 728, 949, pixelRatio),
  new Marker('kb1-rnh29', 728, 949, 733, 950, pixelRatio),
  new Marker('rnh29-rnh32', 733, 950, 740, 964, pixelRatio)
]);

export default buildRoads;
