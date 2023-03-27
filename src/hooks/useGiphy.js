import { useEffect, useState } from "react";
import { getGifUrlByString } from "../api/giphy";

export function useGiphy({ pickedName, isOpen }) {
  const [gifUrl, setGifUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);
    getGifUrlByString(pickedName)
      .then((data) => {
        if (data.length === 0) return;
        const position = Math.floor(Math.random() * data.length - 1) + 1;
        setGifUrl(data[position].images.downsized_large.url);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pickedName, isOpen]);

  return { gifUrl, isLoading };
}
