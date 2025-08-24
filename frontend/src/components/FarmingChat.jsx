import React, { useState, useRef, useEffect } from 'react';
import { analyzeFarmerData, getJSONData } from '../gen-ai/config.js';
import { farmingKnowledgeBase } from '../gen-ai/farmingKnowledge.js';
import './FarmingChat.css';

const FarmingChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);

  const crops = [
    'Wheat', 'Rice', 'Corn', 'Soybeans', 'Cotton', 'Potatoes', 
    'Tomatoes', 'Onions', 'Carrots', 'Lettuce', 'Spinach', 'Peas',
    'Beans', 'Lentils', 'Chickpeas', 'Sunflower', 'Canola', 'Barley'
  ];

  const locations = [
    'North India', 'South India', 'East India', 'West India', 'Central India',
    'Himalayan Region', 'Coastal Areas', 'Desert Region', 'Plateau Region'
  ];

  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        console.log('Voice recognition started');
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
        console.log('Voice input:', transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          alert('Please allow microphone access to use voice features.');
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      setVoiceEnabled(true);
    } else {
      console.log('Speech recognition not supported');
      setVoiceEnabled(false);
    }

    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
      setVoiceEnabled(true);
    } else {
      console.log('Speech synthesis not supported');
      setVoiceEnabled(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      type: 'bot',
      content: `Welcome to the Farming Expert Chat! 

I'm here to help you with:
• Crop management advice
• Weather-based recommendations  
• Soil health analysis
• Pest and disease control
• Harvest timing guidance

You can type your questions or use voice commands! Just click the microphone button to speak.`,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages([welcomeMessage]);
  }, []);

  const getRelevantKnowledge = (crop, query) => {
    try {
      console.log('Knowledge base available:', !!farmingKnowledgeBase);
      console.log('Crop selected:', crop);
      console.log('Query:', query);
      
      const queryLower = query.toLowerCase();
      let knowledgeText = '';
      
      // Check if knowledge base is available
      if (!farmingKnowledgeBase) {
        return 'Knowledge base is currently loading. Please try again in a moment.';
      }
      
      // Direct knowledge lookup for common questions
      if (queryLower.includes('harvest') || queryLower.includes('when')) {
        if (crop && farmingKnowledgeBase.harvestGuidelines && farmingKnowledgeBase.harvestGuidelines[crop]) {
          const harvest = farmingKnowledgeBase.harvestGuidelines[crop];
          knowledgeText += `Harvest Guidelines for ${crop}:\n\n`;
          knowledgeText += `Timing: ${harvest.Timing}\n`;
          knowledgeText += `Optimal Moisture: ${harvest['Optimal Moisture']}\n`;
          knowledgeText += `Visual Indicators: ${harvest['Visual Indicators']}\n\n`;
        }
      }
      
      if (queryLower.includes('water') || queryLower.includes('irrigation') || queryLower.includes('amount')) {
        if (crop && farmingKnowledgeBase.crops && farmingKnowledgeBase.crops[crop] && farmingKnowledgeBase.crops[crop].waterRequirements) {
          const water = farmingKnowledgeBase.crops[crop].waterRequirements;
          knowledgeText += `Water Requirements for ${crop}:\n\n`;
          knowledgeText += `Total Water Needed: ${water.total}\n`;
          knowledgeText += `Critical Stages: ${water.criticalStages.join(', ')}\n`;
          knowledgeText += `Irrigation Method: ${water.irrigationMethod}\n\n`;
        }
      }
      
      if (queryLower.includes('fertilizer') || queryLower.includes('nutrient')) {
        if (crop && farmingKnowledgeBase.crops && farmingKnowledgeBase.crops[crop] && farmingKnowledgeBase.crops[crop].growthStages) {
          knowledgeText += `Fertilizer Application for ${crop}:\n\n`;
          Object.entries(farmingKnowledgeBase.crops[crop].growthStages).forEach(([stage, info]) => {
            if (info.requirements.includes('fertilizer') || info.requirements.includes('nitrogen')) {
              knowledgeText += `${stage} Stage: ${info.requirements}\n`;
              knowledgeText += `Care: ${info.care}\n\n`;
            }
          });
        }
      }
      
      if (queryLower.includes('pest') || queryLower.includes('control') || queryLower.includes('naturally')) {
        if (farmingKnowledgeBase.pestManagement && farmingKnowledgeBase.pestManagement['Natural Control Methods']) {
          knowledgeText += `Natural Pest Control Methods:\n\n`;
          farmingKnowledgeBase.pestManagement['Natural Control Methods'].forEach((method, index) => {
            knowledgeText += `${index + 1}. ${method}\n`;
          });
          knowledgeText += '\n';
        }
        
        if (crop && farmingKnowledgeBase.crops && farmingKnowledgeBase.crops[crop] && farmingKnowledgeBase.crops[crop].pestManagement) {
          const pest = farmingKnowledgeBase.crops[crop].pestManagement;
          knowledgeText += `Crop-Specific Pest Management for ${crop}:\n\n`;
          knowledgeText += `Common Pests: ${pest.commonPests.join(', ')}\n`;
          knowledgeText += `Natural Control: ${pest.naturalControl}\n\n`;
        }
      }
      
      if (queryLower.includes('soil') || queryLower.includes('ph')) {
        if (farmingKnowledgeBase.soilManagement && farmingKnowledgeBase.soilManagement['pH Management']) {
          knowledgeText += `Soil Management Guidelines:\n\n`;
          Object.entries(farmingKnowledgeBase.soilManagement['pH Management']).forEach(([condition, solutions]) => {
            knowledgeText += `Condition: ${condition}\n`;
            solutions.forEach((solution, index) => {
              knowledgeText += `   ${index + 1}. ${solution}\n`;
            });
            knowledgeText += '\n';
          });
        }
      }
      
      if (queryLower.includes('weather') || queryLower.includes('temperature') || queryLower.includes('rain')) {
        if (farmingKnowledgeBase.weatherRecommendations) {
          knowledgeText += `Weather Management Strategies:\n\n`;
          Object.entries(farmingKnowledgeBase.weatherRecommendations).forEach(([condition, info]) => {
            knowledgeText += `Condition: ${condition}\n`;
            knowledgeText += `   Effects: ${info.effects}\n`;
            knowledgeText += `   Actions: ${info.actions.join(', ')}\n\n`;
          });
        }
      }
      
      // If no specific knowledge found, provide general crop info
      if (!knowledgeText && crop && farmingKnowledgeBase.crops && farmingKnowledgeBase.crops[crop]) {
        const cropInfo = farmingKnowledgeBase.crops[crop];
        knowledgeText += `Crop Information for ${crop} (${cropInfo.scientificName}):\n\n`;
        knowledgeText += `Growth Stages: ${Object.keys(cropInfo.growthStages).join(', ')}\n`;
        knowledgeText += `Soil pH: ${cropInfo.soilRequirements.pH}\n`;
        knowledgeText += `Water Needs: ${cropInfo.waterRequirements.total}\n\n`;
      }
      
      return knowledgeText;
    } catch {
      console.error('Error in getRelevantKnowledge');
      return 'I encountered an issue accessing the knowledge base. Please try again or ask a different question.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Create sample farmer data based on user input
      const sampleFarmerData = {
        farmer_name: "Farmer",
        crop_type: selectedCrop || "wheat",
        seeding_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
        ndvi_value: 0.45,
        weather_forecast: {
          temperature: "25-32°C",
          rainfall: "Light rain expected",
          humidity: "65-75%",
          wind: "5-10 km/h"
        },
        soil_conditions: {
          ph: 6.8,
          moisture: "45%",
          nutrients: "Moderate",
          organic_matter: "2.5%"
        },
        field_info: {
          size: "2 hectares",
          irrigation: "Drip irrigation",
          crop_rotation: "Wheat-Rice-Pulses",
          pest_history: "Low pest pressure"
        }
      };

      // Get relevant knowledge from our farming database
      const relevantKnowledge = getRelevantKnowledge(selectedCrop, inputMessage);
      
      // Analyze with AI
      await analyzeFarmerData(sampleFarmerData);
      const jsonData = getJSONData();

      let botResponse = '';
      
      if (jsonData) {
        // Use structured AI response with detailed advice
        if (jsonData.detailed_advice) {
          botResponse = jsonData.detailed_advice;
        } else {
          // Fallback to structured format if detailed_advice is not available
          botResponse = `AI Analysis for ${jsonData.crop_type}\n\n`;
          botResponse += `Crop Health: ${jsonData.crop_health}\n`;
          botResponse += `Growth Stage: ${jsonData.growth_stage}\n`;
          botResponse += `Critical Alerts: ${jsonData.critical_alerts}\n\n`;
          
          if (jsonData.recommendations.length > 0) {
            botResponse += `Recommendations:\n`;
            jsonData.recommendations.slice(0, 3).forEach((rec, index) => {
              botResponse += `${index + 1}. ${rec}\n`;
            });
          }
          
          if (jsonData.next_actions.length > 0) {
            botResponse += `\nNext Actions:\n`;
            jsonData.next_actions.slice(0, 3).forEach((action, index) => {
              botResponse += `${index + 1}. ${action}\n`;
            });
          }
        }
      } else {
        // Fallback response with better knowledge retrieval
        try {
          if (relevantKnowledge && relevantKnowledge !== 'Knowledge base is currently loading. Please try again in a moment.') {
            // Clean up the knowledge response by removing excessive formatting
            let cleanKnowledge = relevantKnowledge
              .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
              .replace(/\n{3,}/g, '\n\n') // Reduce excessive line breaks
              .trim();
            
            botResponse = `Farming Expert Advice for ${selectedCrop || 'your crops'}:\n\n`;
            botResponse += cleanKnowledge;
          } else {
            // Provide basic farming advice without relying on knowledge base
            botResponse = `Farming Expert Advice:\n\n`;
            botResponse += `I understand you're asking about ${selectedCrop || 'farming'}. Here are some general tips:\n\n`;
            
            if (inputMessage.toLowerCase().includes('harvest')) {
              botResponse += `Harvest Timing:\n`;
              botResponse += `• Monitor crop maturity indicators\n`;
              botResponse += `• Check moisture content\n`;
              botResponse += `• Consider weather conditions\n\n`;
            }
            
            if (inputMessage.toLowerCase().includes('pest') || inputMessage.toLowerCase().includes('control')) {
              botResponse += `Natural Pest Control:\n`;
              botResponse += `• Use crop rotation\n`;
              botResponse += `• Plant companion crops\n`;
              botResponse += `• Encourage beneficial insects\n`;
              botResponse += `• Use physical barriers\n\n`;
            }
            
            if (inputMessage.toLowerCase().includes('water') || inputMessage.toLowerCase().includes('irrigation')) {
              botResponse += `Water Management:\n`;
              botResponse += `• Monitor soil moisture\n`;
              botResponse += `• Water at root level\n`;
              botResponse += `• Avoid overwatering\n`;
              botResponse += `• Consider drip irrigation\n\n`;
            }
            
            if (inputMessage.toLowerCase().includes('fertilizer') || inputMessage.toLowerCase().includes('nutrient')) {
              botResponse += `Fertilizer Tips:\n`;
              botResponse += `• Test soil before applying\n`;
              botResponse += `• Use organic options when possible\n`;
              botResponse += `• Apply at right growth stages\n`;
              botResponse += `• Don't over-fertilize\n\n`;
            }
            
            botResponse += `For personalized advice:\n`;
            botResponse += `• Select your crop type above\n`;
            botResponse += `• Be specific about your question\n`;
            botResponse += `• Include current conditions\n`;
          }
        } catch {
          console.error('Error in fallback response');
          botResponse = `Farming Expert Advice:\n\n`;
          botResponse += `I'm here to help with your farming questions! Here are some general tips:\n\n`;
          botResponse += `Best Practices:\n`;
          botResponse += `• Monitor crop health regularly\n`;
          botResponse += `• Maintain proper soil conditions\n`;
          botResponse += `• Use integrated pest management\n`;
          botResponse += `• Consider local weather patterns\n\n`;
          botResponse += `For specific advice:\n`;
          botResponse += `• Select your crop type above\n`;
          botResponse += `• Ask detailed questions\n`;
          botResponse += `• Include current conditions\n`;
        } finally {
          setIsLoading(false);
        }
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Speak the bot response
      speakBotResponse(botResponse);
      
      // Add to chat history
      // setChatHistory(prev => [...prev, { // This line was removed as per the edit hint
      //   user: inputMessage,
      //   bot: botResponse,
      //   timestamp: new Date().toISOString()
      // }]);

    } catch {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again or check your internet connection.',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const quickQuestions = [
    "When should I harvest my wheat?",
    "How to control pests naturally?",
    "Best time for fertilizer application?",
    "Watering schedule for vegetables?",
    "Signs of crop disease?",
    "Soil testing frequency?"
  ];



  // Enhanced voice input with better error handling
  const startListening = () => {
    if (recognitionRef.current && voiceEnabled) {
      try {
        // Clear any previous input
        setInputMessage('');
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting voice recognition:', error);
        setIsListening(false);
        alert('Unable to start voice recognition. Please try again.');
      }
    } else {
      alert('Voice recognition is not available. Please use text input instead.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Voice output functions
  const speakMessage = (text) => {
    if (synthesisRef.current && voiceEnabled) {
      // Stop any ongoing speech
      synthesisRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for better understanding
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Try to use an Indian English voice if available
      const voices = synthesisRef.current.getVoices();
      const indianVoice = voices.find(voice => 
        voice.lang.includes('en') && 
        (voice.name.includes('India') || voice.name.includes('Indian'))
      );
      
      if (indianVoice) {
        utterance.voice = indianVoice;
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthesisRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Auto-speak bot responses
  const speakBotResponse = (response) => {
    if (voiceEnabled) {
      // Extract the main content without timestamps and formatting
      const cleanResponse = response.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
      speakMessage(cleanResponse);
    }
  };



  return (
    <div className="farming-chat">
      <div className="chat-header">
        <h2>Farming Expert Chat</h2>
        <div className="voice-indicator">
          {voiceEnabled && (
            <div className={`voice-status-indicator ${isListening ? 'listening' : isSpeaking ? 'speaking' : 'idle'}`}>
              {isListening ? '🎤 Listening...' : isSpeaking ? '🔊 Speaking...' : '🎤 Voice Ready'}
            </div>
          )}
        </div>
        <div className="chat-controls">
          <select 
            value={selectedCrop} 
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="crop-selector"
          >
            <option value="">Select Crop</option>
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
          
          <select 
            value={selectedLocation} 
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="location-selector"
          >
            <option value="">Select Location</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-content">
              {message.content}
            </div>
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-questions">
        <h4>Quick Questions:</h4>
        <div className="question-buttons">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="quick-question-btn"
            >
              {question}
            </button>
          ))}
        </div>
        

      </div>

      <div className="chat-input">
        <div className="input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me about farming, crops, weather, or soil..."
            className="message-input"
          />
          
          {/* Voice Control Buttons */}
          {voiceEnabled && (
            <div className="voice-controls">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`voice-button ${isListening ? 'listening' : ''}`}
                title={isListening ? 'Stop listening' : 'Start voice input'}
              >
                {isListening ? '🔴' : '🎤'}
              </button>
              
              <button
                onClick={isSpeaking ? stopSpeaking : () => speakMessage(inputMessage)}
                className={`voice-button ${isSpeaking ? 'speaking' : ''}`}
                title={isSpeaking ? 'Stop speaking' : 'Speak input text'}
                disabled={!inputMessage.trim()}
              >
                {isSpeaking ? '⏹️' : '🔊'}
              </button>
            </div>
          )}
        </div>
        
        <button 
          onClick={handleSendMessage} 
          disabled={isLoading || !inputMessage.trim()}
          className="send-button"
        >
          {isLoading ? '⏳' : 'Send'}
        </button>
      </div>

      <div className="chat-info">
        <p>Tip: Select your crop and location for more personalized advice!</p>
        <p>Your conversations are private and not stored permanently.</p>
        {voiceEnabled && (
          <div className="voice-status">
            <p>🎤 Voice features enabled - Click microphone to speak, speaker to hear responses</p>
            <p>💡 Voice commands: "What's the weather like?", "How to grow wheat?", "Pest control tips"</p>
          </div>
        )}
        {!voiceEnabled && (
          <p>🔇 Voice features not available in this browser</p>
        )}
      </div>
    </div>
  );
};

export default FarmingChat;
