// common.js
const STORAGE_KEY = 'VIXX_PROGRESS';

function getDefaultProgress() {
    return {
        completed: {
            N: false,
            Leo: false,
            Ken: false,
            Hyuk: false
        },
        evidence: {
            N: [],
            Leo: [],
            Ken: [],
            Hyuk: []
        }
    };
}

function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (!parsed.completed || !parsed.evidence) return getDefaultProgress();
            return parsed;
        } catch(e) {
            console.warn("讀取存檔失敗", e);
        }
    }
    return getDefaultProgress();
}

function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function markRoleComplete(roleId, evidenceList) {
    if (!roleId) return false;
    const progress = loadProgress();
    if (progress.completed[roleId]) return false;
    progress.completed[roleId] = true;
    progress.evidence[roleId] = evidenceList || [];
    saveProgress(progress);
    return true;
}

function isAllComplete() {
    const progress = loadProgress();
    return progress.completed.N && progress.completed.Leo && progress.completed.Ken && progress.completed.Hyuk;
}

function resetAllProgress() {
    localStorage.removeItem(STORAGE_KEY);
}

// 修改此處：跳轉到 main.html 而不是 index.html
function redirectToMain() {
    window.location.href = 'main.html';
}

function getEvidenceForRole(roleId) {
    const progress = loadProgress();
    return progress.evidence[roleId] || [];
}

function getAllEvidence() {
    const progress = loadProgress();
    return {
        N: progress.evidence.N,
        Leo: progress.evidence.Leo,
        Ken: progress.evidence.Ken,
        Hyuk: progress.evidence.Hyuk
    };
}