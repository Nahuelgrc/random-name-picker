export const getGifUrlByString = async (name = '') => {
  const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${name}&rating=pg`,
  );
  const { data } = await response.json();
  return data;
};
