import moment from "moment";

const fileFormat = (url = "") => {
  const fileExtention = url.split(".").pop();
  if (
    fileExtention === "mp4" ||
    fileExtention === "webm" ||
    fileExtention === "ogg"
  ) {
    return "video";
  }
  if (fileExtention === "mp3" || fileExtention === "wav") {
    return "audio";
  }
  if (
    fileExtention === "png" ||
    fileExtention === "jpeg" ||
    fileExtention === "jpg" ||
    fileExtention === "gif"
  ) {
    return "image";
  }
  return "file";
};

// https://res.cloudinary.com/dj5q966nb/image/upload/dpr_auto/w_200/v1710344436/fafceddc-45-4ae7-a25a-632f01922b4d.png

// /dpr_auto/w_200
const transformImage = (url, width = 100) => {
  // if url is array, take the first element
  if (Array.isArray(url)) url = url[0];

  if (!url || typeof url !== "string") {
    console.warn("transformImage got non-string url:", url);
    return "/default-avatar.png"; // fallback
  }

  return url.replace("upload/", `upload/dpr_auto/w_${width}/`);
};


const getLast7Days = () => {
  const currentDate = moment();

  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");

    last7Days.unshift(dayName);
  }

  return last7Days;
};

const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get)
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  else localStorage.setItem(key, JSON.stringify(value));
};

export { fileFormat, transformImage, getLast7Days, getOrSaveFromStorage };
