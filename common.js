// common.js
const STORAGE_KEY = 'VIXX_PROGRESS';

// 預設進度結構
function getDefaultProgress() {
    return {
        completed: {
            N: false,
            Leo: false,
            Ken: false,
            Hyuk: false
        },
        evidence: {
            N: [],      // 每個角色存放證物陣列，格式可自訂
            Leo: [],
            Ken: [],
            Hyuk: []
        }
    };
}

// 載入進度
function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // 確保結構完整（防止舊版本缺少欄位）
            if (!parsed.completed || !parsed.evidence) return getDefaultProgress();
            return parsed;
        } catch(e) {
            console.warn("讀取存檔失敗", e);
        }
    }
    return getDefaultProgress();
}

// 儲存進度
function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// 標記某角色完成，並存入證物列表 (evidenceList 為陣列)
// 回傳 true 表示標記成功，false 表示已經完成過
function markRoleComplete(roleId, evidenceList) {
    if (!roleId) return false;
    const progress = loadProgress();
    if (progress.completed[roleId]) return false;
    progress.completed[roleId] = true;
    progress.evidence[roleId] = evidenceList || [];
    saveProgress(progress);
    return true;
}

// 檢查是否全員完成
function isAllComplete() {
    const progress = loadProgress();
    return progress.completed.N && progress.completed.Leo && progress.completed.Ken && progress.completed.Hyuk;
}

// 重置所有進度
function resetAllProgress() {
    localStorage.removeItem(STORAGE_KEY);
}

// 導回主畫面 (index.html)
function redirectToMain() {
    window.location.href = 'index.html';
}

// 取得某角色獲得的證物 (可用於圓桌會議)
function getEvidenceForRole(roleId) {
    const progress = loadProgress();
    return progress.evidence[roleId] || [];
}

// 取得所有證物 (合併)
function getAllEvidence() {
    const progress = loadProgress();
    return {
        N: progress.evidence.N,
        Leo: progress.evidence.Leo,
        Ken: progress.evidence.Ken,
        Hyuk: progress.evidence.Hyuk
    };
}
