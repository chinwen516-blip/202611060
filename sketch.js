let stopSheet; // 儲存角色站立動畫的水平精靈圖。
let runSheet; // 儲存角色跑步動畫的水平精靈圖。
let characterX; // 儲存角色目前在畫布中的水平位置。
let facingDirection = 1; // 記錄角色方向：1 代表向右，-1 代表向左。
let animationFrame = 0; // 儲存目前要播放的精靈圖影格。
const stopFrameCount = 6; // 設定站立精靈圖共有 6 張影格。
const runFrameCount = 6; // 設定跑步精靈圖共有 6 張影格。
const characterScale = 2.5; // 設定角色相對於原始精靈圖的顯示大小。
const movementSpeed = 4; // 設定角色每次繪圖時移動的像素數。
const animationSpeed = 8; // 設定每隔幾個繪圖影格切換一次動畫。

function preload() { // 在畫布開始繪製前載入角色精靈圖。
  stopSheet = loadImage("1/stop/stop.png"); // 載入 6 張站立動作的水平精靈圖。
  runSheet = loadImage("1/run/run.png"); // 載入 6 張跑步動作的水平精靈圖。
} // 結束 preload 函式。

function setup() { // 設定畫布與角色的初始位置。
  createCanvas(windowWidth, windowHeight); // 建立符合目前視窗大小的全螢幕畫布。
  imageMode(CENTER); // 讓精靈圖以指定座標作為中心點繪製。
  characterX = width / 2; // 將角色初始位置放在畫布水平中央。
} // 結束 setup 函式。

function draw() { // 每一個繪圖影格都更新並繪製角色。
  background("#caf0f8"); // 使用指定的淺藍色清除畫布背景。

  let isRunning = false; // 預設角色目前沒有移動。

  if (keyIsDown(LEFT_ARROW)) { // 檢查使用者是否按住鍵盤左方向鍵。
    characterX -= movementSpeed; // 按住左方向鍵時讓角色向左移動。
    facingDirection = -1; // 設定角色面向左側。
    isRunning = true; // 將角色動畫切換為跑步狀態。
  } // 結束左方向鍵判斷。

  if (keyIsDown(RIGHT_ARROW)) { // 檢查使用者是否按住鍵盤右方向鍵。
    characterX += movementSpeed; // 按住右方向鍵時讓角色向右移動。
    facingDirection = 1; // 設定角色面向右側。
    isRunning = true; // 將角色動畫切換為跑步狀態。
  } // 結束右方向鍵判斷。

  const activeSheet = isRunning ? runSheet : stopSheet; // 依移動狀態選擇跑步或站立精靈圖。
  const activeFrameCount = isRunning ? runFrameCount : stopFrameCount; // 取得目前動畫的影格總數。
  const frameWidth = activeSheet.width / activeFrameCount; // 計算水平精靈圖中每張影格的寬度。
  const frameHeight = activeSheet.height; // 取得精靈圖單張影格的高度。
  const displayWidth = frameWidth * characterScale; // 計算角色在畫布上的顯示寬度。
  const displayHeight = frameHeight * characterScale; // 計算角色在畫布上的顯示高度。

  characterX = constrain(characterX, displayWidth / 2, width - displayWidth / 2); // 限制角色留在畫布的左右邊界內。
  animationFrame = floor(frameCount / animationSpeed) % activeFrameCount; // 依播放速度循環切換目前動畫影格。

  push(); // 暫存畫布狀態，避免角色翻轉影響其他繪圖設定。
  translate(characterX, height / 2); // 將座標原點移至角色在畫布中的位置。
  scale(facingDirection, 1); // 依角色方向水平翻轉精靈圖。
  image( // 繪製目前動畫影格。
    activeSheet, // 指定要繪製的站立或行走精靈圖。
    0, // 將精靈圖中心繪製在目前座標原點的水平位置。
    0, // 將精靈圖中心繪製在目前座標原點的垂直位置。
    displayWidth, // 指定角色影格在畫布上的顯示寬度。
    displayHeight, // 指定角色影格在畫布上的顯示高度。
    animationFrame * frameWidth, // 指定精靈圖中目前影格的水平裁切起點。
    0, // 指定精靈圖中目前影格的垂直裁切起點。
    frameWidth, // 指定從精靈圖裁切的單張影格寬度。
    frameHeight // 指定從精靈圖裁切的單張影格高度。
  ); // 結束繪製目前影格。
  pop(); // 還原畫布狀態，取消角色的水平翻轉設定。
} // 結束 draw 函式。

function windowResized() { // 當瀏覽器視窗尺寸改變時重新調整畫布。
  resizeCanvas(windowWidth, windowHeight); // 讓畫布持續填滿整個瀏覽器視窗。
} // 結束 windowResized 函式。
