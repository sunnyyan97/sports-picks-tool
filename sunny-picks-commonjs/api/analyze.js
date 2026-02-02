module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { league, matchup, comments } = req.body;

        if (!league || !matchup) {
            return res.status(400).json({ error: 'League and matchup are required' });
        }

        console.log(`Analyzing: ${league} - ${matchup}`);

        // Check for API key
        if (!process.env.ANTHROPIC_API_KEY) {
            return res.status(500).json({ 
                error: 'Server configuration error: ANTHROPIC_API_KEY not set. Please add your API key in Vercel environment variables.' 
            });
        }

        const prompt = `You are a sports betting analyst. Research: ${league} - ${matchup}${comments ? `\n\nConsider: ${comments}` : ''}

CRITICAL INSTRUCTIONS:
1. Use web search to find RECENT, VERIFIED information
2. ONLY include information you can verify from search results
3. If you cannot find specific data (like exact records or recent games), state "Data not available" rather than guessing
4. Double-check all statistics and game results
5. Include the date/source of information when possible

Search for:
- Current team records (verify with official league sources)
- Injury reports (check today's date: ${new Date().toLocaleDateString()})
- Recent game results (last 5-7 games with actual scores and dates)
- Current betting lines

Respond ONLY with this exact JSON format (no extra text):
{
"pick":"Team and spread",
"confidence":"7",
"relevantData":"**Records** (as of DATE)\\n• Team A: X-Y (verify from search)\\n• Team B: X-Y (verify from search)\\n\\n**Injuries** (as of ${new Date().toLocaleDateString()})\\n• List verified injuries or state 'No major injuries reported'\\n\\n**Recent Form** (last 5-7 games with dates and scores)\\n• Team A: List actual games with dates and scores\\n• Team B: List actual games with dates and scores",
"logic":"• Primary reason based on verified data\\n• Second reason with specific evidence\\n• Third reason with specific evidence",
"concerns":"• Risk factor with evidence\\n• Counterpoint with evidence"
}

CONFIDENCE SCALE (1-10):
- 1-3: Low confidence - significant uncertainty, conflicting data, or many concerns
- 4-6: Medium confidence - some solid factors but notable risks
- 7-8: High confidence - strong data support with manageable concerns
- 9-10: Very high confidence - overwhelming evidence, minimal concerns

Use the full 1-10 range. Avoid defaulting to middle values.

ACCURACY CHECK: Before responding, verify:
- Are these the correct team records?
- Are these actual recent games with real scores?
- Are injury reports current?
- Did I verify this information from search results?

If you cannot verify information, use phrases like "Recent data unavailable" rather than providing potentially incorrect information.`;

        // Call Claude API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 6000,
                messages: [{
                    role: 'user',
                    content: prompt
                }],
                tools: [{
                    type: 'web_search_20250305',
                    name: 'web_search'
                }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Claude API error:', errorText);
            return res.status(response.status).json({ 
                error: `Claude API error: ${response.status}` 
            });
        }

        const data = await response.json();
        
        // Extract text from response
        const fullResponse = data.content
            .map(item => item.type === 'text' ? item.text : '')
            .filter(Boolean)
            .join('\n');

        if (!fullResponse) {
            return res.status(500).json({ error: 'Empty response from Claude API' });
        }

        // Clean and parse JSON
        let cleanResponse = fullResponse.trim();
        cleanResponse = cleanResponse.replace(/```json\s*/g, '').replace(/```\s*/g, '');
        
        const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            cleanResponse = jsonMatch[0];
        }

        let analysis;
        try {
            analysis = JSON.parse(cleanResponse);
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            console.error('Response was:', cleanResponse.substring(0, 500));
            return res.status(500).json({ 
                error: 'Failed to parse Claude response. Please try again.' 
            });
        }

        // Validate required fields
        if (!analysis.pick || !analysis.confidence) {
            return res.status(500).json({ 
                error: 'Invalid response format from Claude API' 
            });
        }

        // Provide defaults for optional fields
        analysis.relevantData = analysis.relevantData || 'Data not available - please verify independently';
        analysis.logic = analysis.logic || '• Analysis not available - please verify independently';
        analysis.concerns = analysis.concerns || '• Concerns not listed - please verify independently';

        res.status(200).json({ analysis });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            error: 'Server error: ' + error.message 
        });
    }
};
