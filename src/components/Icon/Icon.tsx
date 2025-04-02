import React from "react";
import cn from "classnames";

import { Icon as IconUI } from "~/ui/Icons/Icons";
import { getIconType } from "./helpers";

import "./Icon.css";

type Props = {
  isLoading: boolean;
  isOpen: boolean;
  emoji: string;
  hasError: boolean;
  hasHover: boolean;
  animate: boolean;
  onAnimationEnd?: () => void;
};

export const Icon = ({
  isLoading = true,
  isOpen,
  hasError,
  emoji,
  hasHover,
  onAnimationEnd,
  animate,
}: Props) => {
  const error = hasError && !isLoading;
  const loading = isLoading && isOpen;
  const iconType = getIconType({ loading, isOpen, error });
  const size = error ? 13 : 15;
  const color = error ? "#fff" : "#000";

  // closed
  // loading
  // error
  // open

  if (hasHover || (isLoading && isOpen) || hasError) {
    return (
      <div
        className={cn("icon", {
          _error: error,
          _loading: loading,
          _wobble: animate,
        })}
        onAnimationEnd={onAnimationEnd}
      >
        <IconUI type={iconType} size={size} color={color} />
      </div>
    );
  }

  return <div className="emoji">{emoji}</div>;
};
