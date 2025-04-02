import React, { useCallback, useEffect, useState } from "react";

// here you can add styles
import "./ListItem.css";
// here is the ts type of the data
import { ItemId } from "../types";
// here are the icons if you need them

import { Icon } from "./Icon/Icon";
import useResolveItems from "~/hooks/useResolveItems";
import { useItemsStore } from "~/store/useItemsStore";

interface Props {
  id: ItemId;
}

// TODO: подписка на состояние резолвера, чтобы новые данные не прокидвать по дереву, а доставать по месту (звучит как глобальный стейт)
// TODO: стейтменеджер
// TODO: дедупликация запросов
// TODO: реализация levelov кеша (level?: Level,key ?: string, expiration ?: number)
// TODO: husky
// TODO: тесты, jest testing library
// TODO: useCache?
// TODO: storybook?
// TODO: ssr? а как? айдишники рандомные
// TODO: роутинг? а как? айдишники рандомные
// TODO: деплой
// FIXME: убрать лишние перерисовки

// DONE: ошибка не попадает в тайминг

export const ListItem = ({ id }: Props) => {
  const { selectItem, setItem } = useItemsStore((state) => state);
  const [hasHover, setHasHover] = useState(false);
  const [hasIconError, setHasIconError] = useState(false);
  const [animateIcon, setAnimateIcon] = useState(false);
  const { isOpen, isLoading, error, title, emoji, childrens } = selectItem(id);
  const { refetch } = useResolveItems({ id, title: title });

  const clickHandler = useCallback(() => {
    if (error) {
      // set open state for further data display
      setItem(id, { isOpen: true });
      refetch();
      return;
    }

    const currentState = !isOpen;
    setItem(id, { isOpen: currentState });
  }, [error, isOpen]);

  // awaits for data flow
  useEffect(() => {
    if (!isOpen || !childrens) {
      return;
    }

    setHasIconError(false);
  }, [childrens, isOpen]);

  // awaits for error flow
  useEffect(() => {
    if (!error || !isOpen) {
      return;
    }

    setHasIconError(true);
    setAnimateIcon(true);
  }, [error, isOpen]);

  // override css rules to control the state of the icon from a single location (<Icon> component)
  const mouseEnterHandler = () => {
    setHasHover(true);
  };

  const mouseLeaveHandler = () => {
    setHasHover(false);
  };

  const onIconAnimationEnd = () => {
    setAnimateIcon(false);
  };

  return (
    <>
      <button
        className="item"
        onClick={clickHandler}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <Icon
          isLoading={isLoading}
          isOpen={isOpen}
          emoji={emoji}
          hasError={hasIconError}
          hasHover={hasHover}
          onAnimationEnd={onIconAnimationEnd}
          animate={animateIcon}
        />
        <div className="title">{title}</div>
      </button>

      <div className="items">
        {isOpen ? childrens?.map((id) => <ListItem id={id} key={id} />) : null}
      </div>
    </>
  );
};
