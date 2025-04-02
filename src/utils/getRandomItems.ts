/* ========================================== */
/* This is just a utility to generate */
/*  random items, */
/*  details are not important here */
/* ========================================== */

import type { RawItem, ItemId } from "../types";
import { getRandomEmoji } from "./getRandomEmoji";
const SAMPLE_TEXTS = [
  "Delgough Highland",
  "Ingermouth Bluff",
  "The Raging Hillside",
  "Canolinet Slopes",
  "Walldeen Pinnacle",
  "The Gigantic Summit",
  "Wellingleche Tops",
  "The Colorless Rise",
  "The Scarlet Slopes",
  "Lavalgeo Hills",
  "Coatidale Tops",
  "The Fabled Tips",
  "Lockecouche Summit",
  "Birminggar Creek",
  "Bexlinet Rill",
  "Iris Brook",
  "Sunny Stream",
  "Rolling Beck",
  "Isolated Brook",
  "Mesmerizing Stream",
  "Shimmering Run",
  "Grantane Brook",
  "Parhead Creek",
  "Limingmeda Run",
  "Richtona Creek",
  "Light Willow Woods",
  "Exotic Apple Wood",
  "Frightened Woodland",
  "Romantic Woods",
  "Lesser Lion Woodland",
  "Alpine Lizard Forest",
  "Radshire Grove",
  "Yarval Forest",
  "Amgami Woods",
  "Granby Timberland",
];

// change for uuid
let uuid = 0;

export const getRandomItems = (id: ItemId): Array<RawItem> => {
  const randomItemsCount = Math.floor(Math.random() * 3) + 2;
  const result = [];

  for (let i = 0; i < randomItemsCount; i++) {
    const randomTitleIndex = Math.floor(Math.random() * SAMPLE_TEXTS.length);
    const randomTitle = SAMPLE_TEXTS[randomTitleIndex];
    const randomEmoji = getRandomEmoji();

    result.push({
      title: randomTitle,
      id: String(uuid++),
      emoji: randomEmoji,
      parent: id,
    });
  }

  return result;
};

export const getRandomDocumentContent = () => {
  const randomPhrasesCount = Math.floor(Math.random() * 10) + 10;
  let result = "";

  for (let i = 0; i < randomPhrasesCount; i++) {
    const randomPhraseIndex = Math.floor(Math.random() * SAMPLE_TEXTS.length);
    result += SAMPLE_TEXTS[randomPhraseIndex];
  }

  return result;
};
