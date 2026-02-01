// Configuration - UPDATE THIS with your deployed backend URL
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api/analyze'
    : '/api/analyze'; // Will work with Vercel's serverless functions

function addQuickComment(comment) {
    const commentsField = document.getElementById('comments');
    if (commentsField.value) {
        commentsField.value += '; ' + comment;
    } else {
        commentsField.value = comment;
    }
}

document.getElementById('analyzeBtn').addEventListener('click', analyzePick);

document.getElementById('matchup').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') analyzePick();
});

async function analyzePick() {
    const league = document.getElementById('league').value;
    const matchup = document.getElementById('matchup').value.trim();
    const comments = document.getElementById('comments').value.trim();

    if (!league || !matchup) {
        alert('Please select a league and enter a matchup');
        return;
    }

    const loadingEl = document.getElementById('loading');
    const resultsEl = document.getElementById('results');
    const analyzeBtn = document.getElementById('analyzeBtn');

    loadingEl.classList.add('active');
    resultsEl.classList.remove('active');
    analyzeBtn.disabled = true;

    try {
        console.log('Sending request to backend...');
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                league,
                matchup,
                comments
            })
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Received data:', data);

        if (data.error) {
            throw new Error(data.error);
        }

        displayResults(matchup, league, data.analysis);

    } catch (error) {
        console.error('Error:', error);
        
        resultsEl.innerHTML = `
            <div class="error">
                <strong>Error</strong>
                ${error.message || 'Failed to analyze matchup. Please try again.'}
                <br><br>
                <small>If the problem persists, check that your backend is running.</small>
            </div>
        `;
        resultsEl.classList.add('active');
    } finally {
        loadingEl.classList.remove('active');
        analyzeBtn.disabled = false;
    }
}

function displayResults(matchup, league, analysis) {
    const resultsEl = document.getElementById('results');
    
    // Convert confidence number to color class
    const confidenceNum = parseInt(analysis.confidence) || 5;
    let confidenceClass, confidenceLabel;
    
    if (confidenceNum >= 9) {
        confidenceClass = 'confidence-high';
        confidenceLabel = 'Very High';
    } else if (confidenceNum >= 7) {
        confidenceClass = 'confidence-high';
        confidenceLabel = 'High';
    } else if (confidenceNum >= 4) {
        confidenceClass = 'confidence-medium';
        confidenceLabel = 'Medium';
    } else {
        confidenceClass = 'confidence-low';
        confidenceLabel = 'Low';
    }

    // Convert **Header** to <strong>Header</strong>
    const formatText = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    resultsEl.innerHTML = `
        <div class="pick-header">
            <h2>Analysis Results</h2>
            <div class="matchup">${league}: ${matchup}</div>
        </div>

        <div class="pick-box">
            <h3>Recommended Pick</h3>
            <div class="pick-value">${analysis.pick}</div>
            <span class="confidence-badge ${confidenceClass}">
                ${confidenceNum}/10 - ${confidenceLabel} Confidence
            </span>
        </div>

        <div class="verification-notice">
            <strong>⚠️ VERIFY BEFORE BETTING</strong>
            <p>Always independently verify stats, injuries, and game results before placing any bets. AI-generated analysis may contain errors or outdated information. Check official league sources and recent news.</p>
            <button class="quick-btn" style="margin-top: 10px;" onclick="openVerificationLinks('${league}', '${matchup.replace(/'/g, "\\'")}')">
                🔍 Quick Verify Sources
            </button>
        </div>

        <div class="analysis">
            <h3>Relevant Data</h3>
            <p>${formatText(analysis.relevantData)}</p>
        </div>

        <div class="analysis">
            <h3>Logic for Pick</h3>
            <p>${analysis.logic}</p>
        </div>

        <div class="analysis">
            <h3>Concerns</h3>
            <p>${analysis.concerns}</p>
        </div>
    `;

    resultsEl.classList.add('active');
}

function openVerificationLinks(league, matchup) {
    const searchQuery = encodeURIComponent(`${league} ${matchup} latest news stats`);
    
    // Open Google search for the matchup
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
    
    // Give user option to open more specific searches
    if (confirm('Open injury report search?')) {
        const injuryQuery = encodeURIComponent(`${league} ${matchup} injury report today`);
        window.open(`https://www.google.com/search?q=${injuryQuery}`, '_blank');
    }
}
