// 夜覽模式邏輯
const toggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️ 淺色模式';
}

toggleBtn.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        toggleBtn.textContent = '☀️ 淺色模式';
    } else {
        localStorage.setItem('theme', 'light');
        toggleBtn.textContent = '🌙 夜覽模式';
    }
});

// 建築限高計算邏輯
function calculateLimit() {
    const ratio = parseFloat(document.getElementById('zoneRatio').value);
    const distance = parseFloat(document.getElementById('distanceVal').value);
    const elevation = parseFloat(document.getElementById('elevationVal').value);
    const resultBox = document.getElementById('resultBox');

    if (isNaN(distance) || distance < 0 || isNaN(elevation)) {
        resultBox.style.display = 'block';
        resultBox.style.borderLeftColor = '#ff4444';
        resultBox.style.backgroundColor = 'rgba(255, 68, 68, 0.1)';
        resultBox.innerHTML = '⚠️ <strong>計算錯誤：</strong>請輸入有效的「距離」與「基準標高」數值。';
        return;
    }

    // 套用公式：H = E + (D / R)
    const allowedHeight = elevation + (distance / ratio);
    
    resultBox.style.display = 'block';
    resultBox.style.borderLeftColor = '#4285F4';
    resultBox.style.backgroundColor = 'var(--result-bg)';
    resultBox.innerHTML = `
        <strong>📍 試算結果：</strong><br>
        該地點建築物「絕對高度限制」為 <strong><span style="font-size: 1.2em; color: #4285F4;">${allowedHeight.toFixed(2)}</span></strong> 公尺。<br>
        <small style="opacity: 0.7; display: inline-block; margin-top: 5px;">
        (計算公式：基準標高 ${elevation} + ( 距離 ${distance} ÷ 坡度比 ${ratio} ) = ${allowedHeight.toFixed(2)})
        </small>
    `;
}
