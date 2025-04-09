document.addEventListener('DOMContentLoaded', function() {
    const feedSelector = document.getElementById('feed-selector');
    const customFeedForm = document.getElementById('custom-feed-form');
    const customFeedUrl = document.getElementById('custom-feed-url');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const feedResults = document.getElementById('feed-results');
    
    // Event listeners
    feedSelector.addEventListener('change', function() {
        if (this.value) {
            fetchFeed(this.value);
        }
    });
    
    customFeedForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const url = customFeedUrl.value.trim();
        
        if (url) {
            fetchFeed(url);
        }
    });
    
    // Fetch and parse RSS feed
    async function fetchFeed(url) {
        // Show loading, clear previous results and errors
        loadingDiv.classList.remove('hidden');
        errorDiv.classList.add('hidden');
        feedResults.innerHTML = '';
        
        try {
            // Use a CORS proxy to avoid CORS issues (for demonstration only)
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            if (data.contents) {
                // Parse the XML content
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data.contents, "text/xml");
                
                // Check if parsing produced an error
                const errorNode = xmlDoc.querySelector('parsererror');
                if (errorNode) {
                    throw new Error('Error parsing RSS feed');
                }
                
                // Display the feed items
                displayFeedItems(xmlDoc);
            } else {
                throw new Error('No content in response');
            }
        } catch (error) {
            console.error('Error fetching feed:', error);
            errorDiv.textContent = `Error: ${error.message}`;
            errorDiv.classList.remove('hidden');
        } finally {
            loadingDiv.classList.add('hidden');
        }
    }
    
    // Display feed items
    function displayFeedItems(xmlDoc) {
        const items = xmlDoc.querySelectorAll('item');
        
        if (items.length === 0) {
            feedResults.innerHTML = '<p>No items found in this feed.</p>';
            return;
        }
        
        let html = '';
        
        items.forEach(item => {
            const title = item.querySelector('title')?.textContent || 'No title';
            const link = item.querySelector('link')?.textContent || '#';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            const description = item.querySelector('description')?.textContent || '';
            
            html += `
                <div class="feed-item">
                    <h3><a href="${link}" target="_blank" rel="noopener">${title}</a></h3>
                    ${pubDate ? `<div class="feed-meta">${pubDate}</div>` : ''}
                    <div class="feed-content">${description}</div>
                </div>
            `;
        });
        
        feedResults.innerHTML = html;
    }
});