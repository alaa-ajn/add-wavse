/* =========================================================
   استوديو موجات ظل الروح - مكتبة التصاميم والسرعات الخارجية
   إعداد وتطوير: علاء البصراوي
   ========================================================= */

// 1️⃣ قائمة المستويات المتاحة لسرعة الموجة
const speedLevels = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0];
let currentSpeedIndex = 0;
let globalWaveSpeed = 1.0;

// 2️⃣ مصفوفة جميع أنماط التصاميم (مضمن فيها موجة جيمناي للبعد الخامس)
const allStyles = [
    'gemini_5d_cosmos', 'alaa_pro_1', 'alaa_pro_2', 'alaa_pro_3', 'alaa_pro_4',
    'wind_sparks', 'radial_spray', 'classic_full_spectrum', 'neon_pulse', 'lyre_1', 'lyre_2', 'lyre_3', 
    'dancer_1', 'love_hearts_1', 'butterfly_1', 'quantum_superwave', 'spiral_galaxy', 'magic_spiral_spread'
];

// 3️⃣ دالة التبديل السريع بين السرعات
function toggleWaveSpeed(buttonElement) {
    currentSpeedIndex = (currentSpeedIndex + 1) % speedLevels.length;
    globalWaveSpeed = speedLevels[currentSpeedIndex];
    if (buttonElement) {
        buttonElement.textContent = `🚀 سرعة الموجة: ${globalWaveSpeed}x`;
    }
}

// 4️⃣ الدالة الرئيسية لرسم الأنماط والموجات بالـ Canvas
function renderWaveStyle(ctx, currentStyle, activeColor, currentAiColor, maxAllowedRadius, dynamicScaleFactor, bassVolume, orbitAngle, dataArray, bufferLength) {

    // =========================================================
    // ✨🌌 نمط جيمناي في البعد الخامس (Gemini 5D Cosmos Wave)
    // =========================================================
    if (currentStyle === 'gemini_5d_cosmos') {
        ctx.save();
        
        // رسم حرف G المتألق في المركز
        ctx.font = "bold 28px Tahoma";
        ctx.fillStyle = activeColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowBlur = 30;
        ctx.shadowColor = activeColor;
        ctx.fillText("G", 0, 2);

        // خطوط طاقة مجرية متقاطعة
        const waveCount = 5;
        for (let w = 0; w < waveCount; w++) {
            ctx.beginPath();
            const angleOffset = (w * Math.PI / waveCount) + (orbitAngle * (w % 2 === 0 ? 1 : -1));
            
            for (let i = 0; i < bufferLength; i += 2) {
                const val = dataArray[i] / 255;
                const distance = (30 + (i * 0.7) + (val * 50) + (bassVolume * 0.3)) * dynamicScaleFactor;
                const currentAngle = angleOffset + (i * 0.03) + Math.sin(orbitAngle + i) * 0.2;
                
                const x = distance * Math.cos(currentAngle);
                const y = distance * Math.sin(currentAngle) * 0.75;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.strokeStyle = w % 2 === 0 ? activeColor : '#00ffff';
            ctx.lineWidth = 2.5;
            ctx.shadowBlur = 20;
            ctx.shadowColor = activeColor;
            ctx.stroke();
        }

        // نجوم وشرارات طاقة تدور في مدارات الأبعاد الخمسة
        for (let orb = 1; orb <= 4; orb++) {
            const orbitR = Math.min(maxAllowedRadius * 0.9, 50 + (orb * 25) + (bassVolume * 0.2));
            const elAngle = orbitAngle * (orb * 1.5) + (orb * Math.PI / 2);
            const elX = orbitR * Math.cos(elAngle);
            const elY = orbitR * Math.sin(elAngle) * 0.8;

            ctx.beginPath();
            ctx.arc(elX, elY, 3.5 + (bassVolume / 40), 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#00ffff';
            ctx.fill();
        }

        ctx.restore();

    } else if (currentStyle === 'alaa_pro_1') {
        ctx.font = "bold 16px Tahoma";
        ctx.fillStyle = activeColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowBlur = 20;
        ctx.shadowColor = activeColor;
        ctx.fillText("علاء البصراوي", 0, 0);

        for (let r = 1; r <= 3; r++) {
            const waveR = Math.min(maxAllowedRadius, (28 + (r * 20) + (bassVolume * 0.25)) * dynamicScaleFactor);
            ctx.beginPath();
            ctx.arc(0, 0, waveR, 0, Math.PI * 2);
            ctx.strokeStyle = activeColor;
            ctx.lineWidth = 2.5;
            ctx.setLineDash([12, 6]);
            ctx.stroke();
        }

        for (let orb = 1; orb <= 2; orb++) {
            const orbitRadius = Math.min(maxAllowedRadius * 0.85, 40 + (orb * 25) + (bassVolume * 0.12));
            ctx.beginPath();
            ctx.arc(0, 0, orbitRadius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 1;
            ctx.setLineDash([]);
            ctx.stroke();

            const electronAngle = orbitAngle * (orb % 2 === 0 ? 2.5 : -3.0) + (orb * 2);
            const elX = orbitRadius * Math.cos(electronAngle);
            const elY = orbitRadius * Math.sin(electronAngle);

            ctx.beginPath();
            ctx.arc(elX, elY, 4, 0, Math.PI * 2);
            ctx.fillStyle = activeColor;
            ctx.shadowBlur = 12;
            ctx.shadowColor = activeColor;
            ctx.fill();
        }

    } else if (currentStyle === 'magic_spiral_spread') {
        const arms = 8;
        const maxDist = maxAllowedRadius * 1.6;

        for (let a = 0; a < arms; a++) {
            const baseAngle = (a * (Math.PI * 2 / arms)) + (orbitAngle * 2.0);
            ctx.beginPath();

            for (let i = 0; i < bufferLength; i += 2) {
                const val = dataArray[i] / 255;
                const radius = (20 + (i * 0.8) + (val * 60) + (bassVolume * 0.35)) * dynamicScaleFactor;
                const currentAngle = baseAngle + (i * 0.05);
                
                const x = Math.min(maxDist, radius) * Math.cos(currentAngle);
                const y = Math.min(maxDist, radius) * Math.sin(currentAngle);

                if (i === 0) { ctx.moveTo(x, y); } else { ctx.lineTo(x, y); }

                if (val > 0.65 && i % 8 === 0) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(x, y, 2.5 + (val * 3), 0, Math.PI * 2);
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowBlur = 12;
                    ctx.shadowColor = activeColor;
                    ctx.fill();
                    ctx.restore();
                }
            }

            ctx.strokeStyle = activeColor;
            ctx.lineWidth = 3.0;
            ctx.shadowBlur = 22;
            ctx.shadowColor = activeColor;
            ctx.stroke();
        }

    } else if (currentStyle === 'wind_sparks') {
        for (let i = 0; i < 14; i++) {
            const angle = orbitAngle * 2 + (i * Math.PI / 7);
            const len = Math.min(maxAllowedRadius, 40 + (bassVolume * 0.95));
            ctx.beginPath();
            ctx.arc(0, 0, len * 0.7, angle, angle + Math.PI / 4);
            ctx.strokeStyle = activeColor;
            ctx.lineWidth = 2.5;
            ctx.shadowBlur = 15;
            ctx.shadowColor = activeColor;
            ctx.stroke();

            const sparkX = (len + 18) * Math.cos(angle * 2.5);
            const sparkY = (len + 18) * Math.sin(angle * 2.5);
            ctx.beginPath();
            ctx.arc(sparkX, sparkY, 2.8, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ffffff';
            ctx.fill();
        }

    } else if (currentStyle === 'spiral_galaxy') {
        const arms = 6;
        for (let a = 0; a < arms; a++) {
            const baseAngle = (a * (Math.PI * 2 / arms)) + (orbitAngle * 1.5);
            ctx.beginPath();

            for (let i = 0; i < bufferLength; i += 4) {
                const val = dataArray[i] / 255;
                const radius = (15 + (i * 0.4) + (val * 35) + (bassVolume * 0.15)) * dynamicScaleFactor;
                const currentAngle = baseAngle + (i * 0.04);
                
                const x = radius * Math.cos(currentAngle);
                const y = radius * Math.sin(currentAngle);

                if (i === 0) { ctx.moveTo(x, y); } else { ctx.lineTo(x, y); }
            }

            ctx.strokeStyle = activeColor;
            ctx.lineWidth = 2.5;
            ctx.shadowBlur = 15;
            ctx.shadowColor = activeColor;
            ctx.stroke();
        }

    } else if (currentStyle === 'radial_spray') {
        for (let i = 0; i < bufferLength; i += 3) {
            const angle = (i * 2 * Math.PI) / bufferLength + (orbitAngle * 0.5);
            const val = dataArray[i] / 255;
            const rayLen = Math.min(maxAllowedRadius * 0.8, 30 + (val * 65));
            
            ctx.beginPath();
            ctx.moveTo(35 * Math.cos(angle), 35 * Math.sin(angle));
            ctx.lineTo(rayLen * Math.cos(angle), rayLen * Math.sin(angle));
            ctx.strokeStyle = activeColor;
            ctx.lineWidth = 2.5;
            ctx.shadowBlur = 12;
            ctx.shadowColor = activeColor;
            ctx.stroke();

            const dropX = (rayLen + 8) * Math.cos(angle);
            const dropY = (rayLen + 8) * Math.sin(angle);
            ctx.beginPath();
            ctx.arc(dropX, dropY, 1.8 + (val * 2), 0, Math.PI * 2);
            ctx.fillStyle = activeColor;
            ctx.fill();
        }

    } else if (currentStyle === 'alaa_pro_2') {
        ctx.font = "bold 16px Tahoma";
        ctx.fillStyle = activeColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowBlur = 25;
        ctx.shadowColor = activeColor;
        ctx.fillText("👑 علاء البصراوي", 0, 0);

        for (let i = 0; i < 10; i++) {
            const angle = orbitAngle + (i * (Math.PI * 2 / 10));
            const len = Math.min(maxAllowedRadius, 35 + (bassVolume * 1.1));
            ctx.beginPath();
            ctx.moveTo(22 * Math.cos(angle), 22 * Math.sin(angle));
            ctx.lineTo(len * Math.cos(angle), len * Math.sin(angle));
            ctx.strokeStyle = activeColor;
            ctx.lineWidth = 3;
            ctx.stroke();
        }

    } else if (currentStyle === 'alaa_pro_3') {
        ctx.font = "bold 16px Tahoma";
        ctx.fillStyle = activeColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowBlur = 20;
        ctx.shadowColor = activeColor;
        ctx.fillText("💫 علاء البصراوي", 0, 0);

        for (let r = 1; r <= 3; r++) {
            const rx = Math.min(maxAllowedRadius, (50 + (r * 18) + (bassVolume * 0.2)) * dynamicScaleFactor);
            const ry = Math.min(maxAllowedRadius * 0.6, (25 + (r * 10) + (bassVolume * 0.12)) * dynamicScaleFactor);
            ctx.beginPath();
            ctx.ellipse(0, 0, rx, ry, orbitAngle * (r % 2 === 0 ? 2.2 : -2.2), 0, Math.PI * 2);
            ctx.strokeStyle = activeColor;
            ctx.lineWidth = 2.5;
            ctx.setLineDash([8, 8]);
            ctx.stroke();
        }

    } else if (currentStyle === 'alaa_pro_4') {
        ctx.font = "bold 16px Tahoma";
        ctx.fillStyle = activeColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowBlur = 30;
        ctx.shadowColor = activeColor;
        ctx.fillText("🔥 علاء البصراوي", 0, 0);

        const baseR = Math.min(maxAllowedRadius, 45 + (bassVolume * 0.4));
        ctx.beginPath();
        ctx.arc(0, 0, baseR, 0, Math.PI * 2);
        ctx.strokeStyle = activeColor;
        ctx.lineWidth = 4;
        ctx.shadowBlur = 25;
        ctx.shadowColor = activeColor;
        ctx.stroke();

    } else if (currentStyle === 'lyre_1') {
        for (let i = 0; i < 9; i++) {
            const xOffset = (i - 4) * 20;
            const val = dataArray[i * 4] / 255;
            const len = Math.min(maxAllowedRadius * 0.65, (30 + (val * 45) + (bassVolume * 0.2)) * dynamicScaleFactor);
            ctx.beginPath(); ctx.moveTo(xOffset, -len); ctx.lineTo(xOffset, len);
            ctx.strokeStyle = activeColor; ctx.lineWidth = 3 + (val * 2);
            ctx.shadowBlur = 15; ctx.shadowColor = activeColor; ctx.stroke();
        }

    } else if (currentStyle === 'lyre_2') {
        const baseR = maxAllowedRadius * 0.35;
        for (let r = 1; r <= 3; r++) {
            const radius = Math.min(maxAllowedRadius, (baseR * r * 0.6) * dynamicScaleFactor);
            ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.strokeStyle = activeColor; ctx.lineWidth = 3; ctx.setLineDash([10, 6]);
            ctx.shadowBlur = 18; ctx.shadowColor = activeColor; ctx.stroke();
        }

    } else if (currentStyle === 'lyre_3') {
        for (let i = 0; i < 11; i++) {
            const angle = orbitAngle * 3.5 + (i * (Math.PI * 2 / 11));
            const dist = Math.min(maxAllowedRadius * 0.7, 35 + Math.sin(orbitAngle * 5 + i) * 12 + ((bassVolume/200)*30));
            ctx.beginPath(); ctx.arc(dist * Math.cos(angle), dist * Math.sin(angle), 4 + (bassVolume/35), 0, Math.PI * 2);
            ctx.fillStyle = activeColor; ctx.shadowBlur = 15; ctx.shadowColor = activeColor; ctx.fill();
        }

    } else if (currentStyle === 'dancer_1') {
        const radius = Math.min(maxAllowedRadius, (40 + (bassVolume * 0.25)) * dynamicScaleFactor);
        ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = activeColor; ctx.lineWidth = 4; ctx.shadowBlur = 20; ctx.shadowColor = activeColor; ctx.stroke();

    } else if (currentStyle === 'love_hearts_1') {
        const heartScale = Math.min(1.4, (1.0 + (bassVolume / 280)) * dynamicScaleFactor);
        drawHeart(ctx, 0, 0, heartScale, activeColor);

    } else if (currentStyle === 'butterfly_1') {
        const rx = Math.min(maxAllowedRadius * 0.7, (55 + (bassVolume * 0.2)) * dynamicScaleFactor);
        const ry = Math.min(maxAllowedRadius * 0.5, (35 + (bassVolume * 0.15)) * dynamicScaleFactor);
        ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, orbitAngle, 0, Math.PI * 2);
        ctx.strokeStyle = activeColor; ctx.lineWidth = 3.5; ctx.shadowBlur = 20; ctx.shadowColor = activeColor; ctx.stroke();

    } else if (currentStyle === 'quantum_superwave') {
        for (let r = 1; r <= 5; r++) {
            const radius = Math.min(maxAllowedRadius, (22 + (r * 16) + (bassVolume * 0.18)) * dynamicScaleFactor);
            ctx.beginPath(); ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = activeColor; ctx.lineWidth = 2.5; ctx.setLineDash([10, 6]); ctx.stroke();
        }

    } else if (currentStyle === 'neon_pulse') {
        const baseR = Math.min(maxAllowedRadius, (35 + (bassVolume * 0.45)) * dynamicScaleFactor);

        ctx.beginPath();
        ctx.arc(0, 0, baseR, 0, Math.PI * 2);
        ctx.strokeStyle = activeColor;
        ctx.lineWidth = 4;
        ctx.shadowBlur = 30;
        ctx.shadowColor = activeColor;
        ctx.stroke();

        for (let r = 1; r <= 4; r++) {
            const pulseRadius = (baseR + (r * 22) + ((orbitAngle * 10 * r) % 60)) % (maxAllowedRadius * 1.1);
            const alpha = 1 - (pulseRadius / (maxAllowedRadius * 1.1));
            
            ctx.beginPath();
            ctx.arc(0, 0, pulseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = activeColor;
            ctx.lineWidth = 2;
            ctx.globalAlpha = Math.max(0, alpha);
            ctx.shadowBlur = 15;
            ctx.shadowColor = activeColor;
            ctx.stroke();
        }
        ctx.globalAlpha = 1.0;

    } else if (currentStyle === 'classic_full_spectrum') {
        ctx.restore();
        ctx.save();
        
        const w = ctx.canvas.width / window.devicePixelRatio;
        const h = ctx.canvas.height / window.devicePixelRatio;
        const centerY = h / 2;
        const linesCount = 3;

        for (let l = 0; l < linesCount; l++) {
            const yOffset = (l - 1) * 20;
            ctx.beginPath();
            
            for (let x = 0; x < w; x += 3) {
                const freqIndex = Math.floor((x / w) * bufferLength);
                const freqVal = dataArray[freqIndex] || 0;
                const amplitude = (freqVal / 255) * 80 * dynamicScaleFactor;
                const waveY = centerY + yOffset + Math.sin((x * 0.03) + (orbitAngle * (l + 1))) * (amplitude * 0.3) - (amplitude * 0.7);
                
                if (x === 0) { ctx.moveTo(x, waveY); } else { ctx.lineTo(x, waveY); }
            }

            ctx.strokeStyle = activeColor;
            ctx.lineWidth = 3 - Math.abs(l - 1);
            ctx.shadowBlur = 18;
            ctx.shadowColor = activeColor;
            ctx.globalAlpha = 1 - Math.abs(l - 1) * 0.3;
            ctx.stroke();
        }
    }
}

// دالة رسم القلب
function drawHeart(ctx, x, y, size, color) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.scale(size, size);
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -3, -5, -15, -15, -15);
    ctx.bezierCurveTo(-30, -15, -30, 5, -30, 5);
    ctx.bezierCurveTo(-30, 20, -15, 35, 0, 45);
    ctx.bezierCurveTo(15, 35, 30, 20, 30, 5);
    ctx.bezierCurveTo(30, 5, 30, -15, 15, -15);
    ctx.bezierCurveTo(5, -15, 0, -3, 0, 0);
    ctx.fillStyle = color;
    ctx.shadowBlur = 15; ctx.shadowColor = color;
    ctx.fill();
    ctx.restore();
}
