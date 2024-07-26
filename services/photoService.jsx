import Constants from "expo-constants";

export const interpretPhoto = async (photoBase64) => {
  // console.log('base64 photo:', photoBase64);
  // Add your photo processing logic here
  const apiUrl = "http://192.168.2.34:5001/image";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: photoBase64,
      }),
    });
    const responseData = await response.json();
    console.log("Upload success:", responseData);
  } catch (error) {
    console.error("Upload failed:", error);
  } finally {
  }

  console.log("api endpoint", apiUrl);
};
