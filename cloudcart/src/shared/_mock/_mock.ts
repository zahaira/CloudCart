import { fSub } from "@/utils/format-time";

import {
  _id,
  _prices,
  _emails,
  _ratings,
  _nativeS,
  _nativeM,
  _nativeL,
  _percents,
  _booleans,
  _sentences,
  _lastNames,
  _fullNames,
  _firstNames,
  _descriptions,
  _phoneNumbers,
  _smartphoneImages,
  _pcImages,
  _accessoriesImages,
} from "./assets";

// ----------------------------------------------------------------------

export const _mock = {
  id: (index: number) => _id[index],
  time: (index: number) => fSub({ days: index, hours: index }),
  boolean: (index: number) => _booleans[index],
  // Text
  sentence: (index: number) => _sentences[index],
  description: (index: number) => _descriptions[index],
  // Contact
  email: (index: number) => _emails[index],
  phoneNumber: (index: number) => _phoneNumbers[index],
  // Name
  firstName: (index: number) => _firstNames[index],
  lastName: (index: number) => _lastNames[index],
  fullName: (index: number) => _fullNames[index],
  // Number
  number: {
    percent: (index: number) => _percents[index],
    rating: (index: number) => _ratings[index],
    price: (index: number) => _prices[index],
    nativeS: (index: number) => _nativeS[index],
    nativeM: (index: number) => _nativeM[index],
    nativeL: (index: number) => _nativeL[index],
    range: (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
  // Image
  image: {
    smartphone: (index: number) => _smartphoneImages[index],
    pc: (index: number) => _pcImages[index],
    accessories: (index: number) => _accessoriesImages[index],
  },
};

const statuses = ["Actif", "Suspendu", "Bloqué", "Supprimé"];

export const _mockListUsers = {
  id: (index: number) => _id[index],
  time: (index: number) => fSub({ days: index, hours: index }),
  boolean: (index: number) => _booleans[index],
  status: (index: number) => {
    const random = Math.random();
    if (random < 0.7) {
      return statuses[0];
    }

    const otherIndex = 1 + Math.floor(Math.random() * (statuses.length - 1));
    return statuses[otherIndex];
  },
  // Text
  sentence: (index: number) => _sentences[index],
  description: (index: number) => _descriptions[index],
  // Contact
  email: (index: number) => _emails[index],
  phoneNumber: (index: number) => _phoneNumbers[index],
  // Name
  firstName: (index: number) => _firstNames[index],
  lastName: (index: number) => _lastNames[index],
  fullName: (index: number) => _fullNames[index],
  // Number
  number: {
    percent: (index: number) => _percents[index],
    rating: (index: number) => _ratings[index],
    price: (index: number) => _prices[index],
    nativeS: (index: number) => _nativeS[index],
    nativeM: (index: number) => _nativeM[index],
    nativeL: (index: number) => _nativeL[index],
  },
};
