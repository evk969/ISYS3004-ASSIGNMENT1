document.addEventListener('DOMContentLoaded', function() {
    const advisorForm = document.getElementById('advisor-form');
    const resultsDiv = document.getElementById('results');
    
    advisorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const revenue = parseFloat(document.getElementById('revenue').value);
        const expenses = parseFloat(document.getElementById('expenses').value);
        const employees = parseInt(document.getElementById('employees').value);
        const industry = document.getElementById('industry').value;
        
        // Calculate metrics
        const profit = revenue - expenses;
        const profitPerEmployee = profit / employees;
        const expenseRatio = (expenses / revenue) * 100;
        
        // Generate advice
        let advice = [];
        
        // Profitability advice
        if (profit < 0) {
            advice.push({
                title: "Critical Warning",
                message: "Your business is operating at a loss. Immediate cost-cutting measures are recommended."
            });
        } else if (profit < (revenue * 0.1)) {
            advice.push({
                title: "Low Profit Margin",
                message: "Your profit margin is below 10%. Consider increasing prices or reducing costs."
            });
        } else {
            advice.push({
                title: "Healthy Profit",
                message: "Your business is profitable. Good job maintaining positive cash flow!"
            });
        }
        
        // Employee efficiency advice
        if (profitPerEmployee < 3000) {
            advice.push({
                title: "Employee Efficiency",
                message: "Revenue per employee is low. Consider training programs or optimizing workflows."
            });
        }
        
        // Industry-specific advice
        if (industry === 'retail' && expenseRatio > 80) {
            advice.push({
                title: "Retail Specific",
                message: "Your expense ratio is high for retail. Review inventory management and supplier costs."
            });
        } else if (industry === 'tech' && revenue < 50000) {
            advice.push({
                title: "Tech Startup Advice",
                message: "Consider seeking investors or grants to scale your technology business."
            });
        }
        
        // Display results
        displayResults(advice);
    });
    
    function displayResults(advice) {
        let html = '<h3>Business Advice</h3>';
        
        if (advice.length === 0) {
            html += '<p>No specific advice available for your current metrics.</p>';
        } else {
            advice.forEach(item => {
                html += `
                    <div class="advice-item">
                        <h4>${item.title}</h4>
                        <p>${item.message}</p>
                    </div>
                `;
            });
        }
        
        resultsDiv.innerHTML = html;
    }
});