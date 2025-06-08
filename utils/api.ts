import myPlatesAxios from "../configs/axios";

export const postMealRecord = async (
  memo: string,
  imageUri: string,
  mimeType: string,
  fileName: string
) => {
  const formData = new FormData();

  // 画像ファイル（image）
  formData.append("image", {
    uri: imageUri,
    type: mimeType,
    name: fileName,
  } as any);

  // テキストデータ（memo）
  formData.append("memo", memo);

  try {
    console.log(myPlatesAxios.defaults);
    console.log(mimeType);
    const response = await myPlatesAxios.post("/api/v1/meal", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("アップロード成功:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("アップロード失敗:", error?.response?.data || error.message);
    throw error;
  }
};
