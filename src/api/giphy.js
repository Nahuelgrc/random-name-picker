export const getGifUrlByString = async (name = "") => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${
      import.meta.env.VITE_GIPHY_API_KEY
    }&q=${name}`
  );
  const { data } = await response.json();
  return data;
};
