import { useEffect, useState } from "react";
import { AllItems } from "./ItemSelection";
import { Items, UserSelection, itemRarities } from "../utilities/types";
import "../styles/items.css";
import { isEmpty } from "lodash";

const MultiShopSelection: React.FC<{
  allItems: AllItems;
  handleItemSelection: (item: Items) => void;
  userSelection: UserSelection;
  setItemStack: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}> = ({ allItems, handleItemSelection, userSelection, setItemStack }) => {
  //*to store the 3 items to show for selection
  const [multiShop, setMultiShop] = useState<Items[]>([]);

  useEffect(() => {
    //*to set % chance of item rarity for the 3 items
    const getRandomRarity = (): itemRarities => {
      const randomNumber: number = Math.floor(Math.random() * 100);
      if (randomNumber < 70) {
        return itemRarities.common;
      } else if (randomNumber < 95) {
        return itemRarities.uncommon;
      } else {
        return itemRarities.legendary;
      }
    };

    //*to set a random index for determining the item to show for the given rarity of items
    const getRandomItemIndex = (itemRarityArray: Items[]): number => {
      return Math.floor(Math.random() * itemRarityArray.length);
    };

    //*to generate 3 random items of a random rarity to display for selection
    const populateMultiShop = (allItems: AllItems): Items[] => {
      const multiShopRarity = getRandomRarity();
      const rolledItems: Items[] = [];

      for (let i = 0; i < 3; i++) {
        const randomItemIndex = getRandomItemIndex(
          allItems[multiShopRarity].items
        );
        rolledItems.push(allItems[multiShopRarity].items[randomItemIndex]);
      }
      return rolledItems;
    };

    userSelection.userItems.length < 15
      ? setMultiShop(populateMultiShop(allItems))
      : setMultiShop([]);

    //*to set itemStack state var based on items selected from user in the userSelection state var
    const updateUserItemStack = (
      userSelection: UserSelection
    ): Record<string, number> => {
      const newItemStack: Record<string, number> = {};

      userSelection.userItems.forEach((item) => {
        newItemStack[item.itemName] = (newItemStack[item.itemName] || 0) + 1;
      });

      return newItemStack;
    };

    setItemStack(updateUserItemStack(userSelection));
  }, [allItems, userSelection]);

  useEffect(() => {
    console.log(multiShop);
  }, [multiShop]);

  // to update the divs for styling
  return (
    <div className="container">
      {!isEmpty(multiShop) && (
        <div className="multishop-container">
          {multiShop.map((item, index) => (
            <>
              <div className="multishop">
              
                {/* <div className="multishop-top-wrapper"> */}
                  <div className="multishop-top">
                    <div className="multishop-sliding-door"></div>
                  {/* </div> */}

                </div>
                <div className="multishop-cap"></div>
                <div className="multishop-cap-tip"></div>
                <div className="multishop-rectangle"></div>
                <img
                  className="item-image"
                  key={`${item.id}+${index}`}
                  src={`public/assets/${item.rarity}/${item.itemName}.webp`}
                  alt={item.itemName}
                  onClick={() => handleItemSelection(item)}
                />
                <div className="multishop-bottom"></div>
                <div className="multishop-bar"></div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiShopSelection;
