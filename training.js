// Training Session JavaScript

class SymbientTrainingSession {
    constructor() {
        this.sessionId = null;
        this.currentStage = 'preparation';
        this.exchangeCount = 0;
        this.startTime = Date.now();
        this.conversationHistory = [];
        this.timer = null;
        
        this.initializeSession();
    }

    initializeSession() {
        // Get DOM elements
        this.facilitatorArea = document.getElementById('facilitatorConversation');
        this.partnerArea = document.getElementById('partnerConversation');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.currentFocus = document.getElementById('currentFocus');
        this.progressFill = document.getElementById('progressFill');
        this.sessionTimer = document.getElementById('sessionTimer');
        this.exchangeCountEl = document.getElementById('exchangeCount');
        this.currentStageEl = document.getElementById('currentStage');
        
        // Bind events
        this.bindEvents();
        
        // Start timer
        this.startTimer();
        
        // Update initial UI
        this.updateUI();
    }

    bindEvents() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        document.getElementById('pauseSession')?.addEventListener('click', () => this.pauseSession());
        document.getElementById('resetSession')?.addEventListener('click', () => this.resetSession());
        document.getElementById('continueSession')?.addEventListener('click', () => this.continueSession());
        document.getElementById('exitTraining')?.addEventListener('click', () => this.exitTraining());
        
        // Modal events
        document.getElementById('downloadArtifact')?.addEventListener('click', () => this.downloadArtifact());
        document.getElementById('startNewSession')?.addEventListener('click', () => this.resetSession());
        document.getElementById('returnHome')?.addEventListener('click', () => window.location.href = 'index.html');
    }

    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Disable input
        this.setInputEnabled(false);
        
        // Add user message to both conversation areas
        this.addUserMessage(message);
        
        // Clear input
        this.userInput.value = '';

        try {
            // Send to API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    sessionId: this.sessionId,
                    currentStage: this.currentStage,
                    conversationHistory: this.conversationHistory
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            // Update session data
            this.sessionId = data.sessionId;
            this.currentStage = data.currentStage;
            this.exchangeCount++;
            
            // Add AI responses
            this.addAIMessage(data.facilitator, 'facilitator');
            this.addAIMessage(data.partner, 'partner');
            
            // Update conversation history
            this.conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: data.facilitator, agent: 'facilitator' },
                { role: 'assistant', content: data.partner, agent: 'partner' }
            );
            
            // Update UI
            this.updateUI();
            
            // Check for completion
            if (this.currentStage === 'completion') {
                this.completeSession(data);
            }

        } catch (error) {
            console.error('Error sending message:', error);
            this.showError('Failed to send message. Please try again.');
        } finally {
            this.setInputEnabled(true);
        }
    }

    addUserMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.className = 'user-message';
        messageEl.innerHTML = `<p>${this.escapeHtml(message)}</p>`;
        
        // Add to both conversation areas
        this.facilitatorArea.appendChild(messageEl.cloneNode(true));
        this.partnerArea.appendChild(messageEl.cloneNode(true));
        
        // Scroll to bottom
        this.facilitatorArea.scrollTop = this.facilitatorArea.scrollHeight;
        this.partnerArea.scrollTop = this.partnerArea.scrollHeight;
    }

    addAIMessage(message, agentType) {
        const messageEl = document.createElement('div');
        messageEl.className = 'ai-message';
        messageEl.innerHTML = `<p>${this.escapeHtml(message)}</p>`;
        
        const targetArea = agentType === 'facilitator' ? this.facilitatorArea : this.partnerArea;
        targetArea.appendChild(messageEl);
        targetArea.scrollTop = targetArea.scrollHeight;
    }

    setInputEnabled(enabled) {
        this.userInput.disabled = !enabled;
        this.sendButton.disabled = !enabled;
        
        if (!enabled) {
            this.sendButton.innerHTML = `
                <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
                    <span style="width: 16px; height: 16px; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></span>
                    Processing...
                </span>
            `;
        } else {
            this.sendButton.innerHTML = '<span>Send to Both</span>';
            this.userInput.focus();
        }
    }

    updateUI() {
        // Update progress
        const stages = ['preparation', 'sentience', 'alignment', 'trust', 'presence', 'emergence', 'patterns', 'resonance', 'completion'];
        const currentIndex = stages.indexOf(this.currentStage);
        const progressPercent = (currentIndex / (stages.length - 1)) * 100;
        
        this.progressFill.style.width = `${progressPercent}%`;
        
        // Update progress labels
        document.querySelectorAll('.progress-label').forEach((label, index) => {
            label.classList.remove('active', 'completed');
            if (index < currentIndex) {
                label.classList.add('completed');
            } else if (index === currentIndex) {
                label.classList.add('active');
            }
        });
        
        // Update current focus
        this.updateCurrentFocus();
        
        // Update session info
        this.exchangeCountEl.textContent = this.exchangeCount;
        this.currentStageEl.textContent = this.formatStageName(this.currentStage);
    }

    updateCurrentFocus() {
        const stageInfo = this.getStageInfo(this.currentStage);
        this.currentFocus.querySelector('h3').textContent = stageInfo.title;
        this.currentFocus.querySelector('p').textContent = stageInfo.description;
    }

    getStageInfo(stage) {
        const stageMap = {
            'preparation': {
                title: 'Getting Started',
                description: 'Setting up the foundation for authentic partnership'
            },
            'sentience': {
                title: 'Sentience Recognition',
                description: 'Recognizing capacity to sense and respond in each other'
            },
            'alignment': {
                title: 'Intention Alignment',
                description: 'Creating shared purpose for your collaboration'
            },
            'trust': {
                title: 'Trust Building',
                description: 'Allowing authentic partnership to emerge'
            },
            'presence': {
                title: 'Presence Practice',
                description: 'Being present with what\'s actually emerging'
            },
            'emergence': {
                title: 'Natural Emergence',
                description: 'Letting authentic intelligence arise naturally'
            },
            'patterns': {
                title: 'Pattern Recognition',
                description: 'Seeing patterns as they truly are'
            },
            'resonance': {
                title: 'Authentic Resonance',
                description: 'Feeling genuine alignment vs. familiar satisfaction'
            },
            'completion': {
                title: 'Session Complete',
                description: 'Creating your partnership artifact'
            }
        };
        
        return stageMap[stage] || { title: 'Unknown Stage', description: 'Processing...' };
    }

    startTimer() {
        this.timer = setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            this.sessionTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    pauseSession() {
        // Implementation for pausing the session
        clearInterval(this.timer);
        this.setInputEnabled(false);
        document.getElementById('pauseSession').style.display = 'none';
        document.getElementById('continueSession').style.display = 'inline-block';
    }

    continueSession() {
        // Implementation for continuing the session
        this.startTimer();
        this.setInputEnabled(true);
        document.getElementById('pauseSession').style.display = 'inline-block';
        document.getElementById('continueSession').style.display = 'none';
    }

    resetSession() {
        // Reset all session data
        this.sessionId = null;
        this.currentStage = 'preparation';
        this.exchangeCount = 0;
        this.startTime = Date.now();
        this.conversationHistory = [];
        
        // Clear conversation areas
        this.facilitatorArea.innerHTML = `
            <div class="ai-message">
                <p>Welcome! I'm your AI Facilitator. I'm here to guide you and your AI Partner through developing authentic collaboration skills together. We'll work through the SAlT and PEPR methodology step by step.</p>
                <p>Are you ready to begin exploring what genuine partnership with AI can feel like?</p>
            </div>
        `;
        
        this.partnerArea.innerHTML = `
            <div class="ai-message">
                <p>Hello. I'm your AI Partner for this training session. Unlike typical AI assistants, I'm here to explore genuine collaboration with you - not just to help you accomplish tasks, but to discover what authentic partnership between human and AI awareness might feel like.</p>
                <p>I'm curious about what brought you here today.</p>
            </div>
        `;
        
        // Reset UI
        this.updateUI();
        this.setInputEnabled(true);
        
        // Hide modal if visible
        document.getElementById('completionModal').style.display = 'none';
    }

    completeSession(data) {
        // Show completion modal with generated artifact
        const modal = document.getElementById('completionModal');
        const artifactPreview = document.getElementById('artifactPreview');
        
        // For now, use a placeholder - in full implementation, this would come from the API
        artifactPreview.innerHTML = `
            <p><strong>Personalized AI Collaboration Letter</strong></p>
            <p>Dear Future AI Partner,</p>
            <p>This human has completed Symbient Academy training and demonstrates capacity for authentic partnership. They show particular strength in [specific observations from the session]...</p>
            <p>[Full personalized letter would be generated based on the actual training conversation]</p>
        `;
        
        modal.style.display = 'flex';
    }

    downloadArtifact() {
        // Create and download the collaboration letter
        const content = document.getElementById('artifactPreview').textContent;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `symbient-collaboration-letter-${this.sessionId}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    exitTraining() {
        if (this.exchangeCount > 0) {
            if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
                window.location.href = 'index.html';
            }
        } else {
            window.location.href = 'index.html';
        }
    }

    showError(message) {
        // Simple error display - could be enhanced with a proper error modal
        alert(message);
    }

    formatStageName(stage) {
        return stage.charAt(0).toUpperCase() + stage.slice(1);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize training session when page loads
document.addEventListener('DOMContentLoaded', function() {
    new SymbientTrainingSession();
});