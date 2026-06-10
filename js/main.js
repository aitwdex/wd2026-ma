import { codeToText } from "./weatherText.js";

//イベントでデータを取得・表示
document.getElementById("getBtn").addEventListener("click", () => {
  getWeather();
});

//JSONを取得し、DOMに表示
async function getWeather() {
  //セレクトボックスから選択された都市の緯度経度と名前を取得
  const select = document.getElementById("citySelect");
  const [lat, lon] = select.value.split(",");
  const cityName = select.options[select.selectedIndex].text;

  //URL生成
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("データの取得に失敗しました");
    
    const data = await response.json();

    //データ抽出
    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;
    const code = data.current_weather.weathercode;
    const weather = codeToText(code); // 自作モジュールで変換

    //DOM更新
    document.getElementById("cityName").textContent = cityName;
    document.getElementById("weatherDesc").textContent = weather;
    document.getElementById("temp").textContent = `${temp} ℃`;
    document.getElementById("wind").textContent = `風速: ${wind} km/h`;

    //カードを表示する
    document.getElementById("resultCard").style.display = "block";

    //デバッグ用
    console.log(`${cityName}のデータを取得:`, data);

  } catch (error) {
    //エラー時の処理
    console.error("エラー:", error);
    alert("天気データの取得に失敗しました。インターネット接続などを確認してください。");
  }
}