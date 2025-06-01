require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection with enhanced error handling
const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodb.uri, config.mongodb.options);
        console.log('Connected to MongoDB Atlas');
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected. Attempting to reconnect...');
            setTimeout(connectDB, 5000);
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });

    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        console.log('Attempting to connect to local MongoDB...');
        try {
            await mongoose.connect('mongodb://localhost:27017/baccarat', config.mongodb.options);
            console.log('Connected to local MongoDB');
        } catch (localErr) {
            console.error('Failed to connect to both MongoDB instances:', localErr);
            process.exit(1);
        }
    }
};

// Initialize database connection
connectDB();

// Baccarat Shoe Schema
const shoeSchema = new mongoose.Schema({
    shoeId: String,
    numDecks: { type: Number, default: 8 }, // Default to 8 decks
    burnCard: { type: String, default: null }, // Store the burn card value
    results: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Prediction Strategies
const predictionStrategies = {
    alternate: (results) => {
        const last = results[results.length - 1];
        return last === 'B' ? 'P' : 'B';
    },
    pattern: (results) => {
        if (results.length < 3) return predictionStrategies.alternate(results);
        for (let patternLength = 2; patternLength <= 4; patternLength++) {
            const lastPattern = results.slice(-patternLength).join('');
            const searchPattern = results.slice(0, -patternLength).join('');
            const index = searchPattern.indexOf(lastPattern);
            if (index !== -1 && index + patternLength < results.length) {
                return results[index + patternLength];
            }
        }
        return predictionStrategies.alternate(results);
    },
    statistical: (results) => {
        if (results.length < 10) return predictionStrategies.alternate(results);
        const last10 = results.slice(-10);
        const bCount = last10.filter(r => r === 'B').length;
        const pCount = last10.filter(r => r === 'P').length;
        if (bCount >= 7) return 'P';
        if (pCount >= 7) return 'B';
        const last3 = results.slice(-3);
        const last3B = last3.filter(r => r === 'B').length;
        const last3P = last3.filter(r => r === 'P').length;
        return last3B > last3P ? 'P' : 'B';
    },
    streak: (results) => {
        if (results.length < 3) return predictionStrategies.alternate(results);
        let currentStreak = 1;
        const lastResult = results[results.length - 1];
        for (let i = results.length - 2; i >= 0; i--) {
            if (results[i] === lastResult) {
                currentStreak++;
            } else {
                break;
            }
        }
        return currentStreak >= 3 ? (lastResult === 'B' ? 'P' : 'B') : predictionStrategies.alternate(results);
    }
};

// Create model
const Shoe = mongoose.model('Shoe', shoeSchema);

// Add Bet Schema
const betSchema = new mongoose.Schema({
    shoeId: String,
    betType: String, // 'B' or 'P'
    amount: Number,
    result: String, // 'B' or 'P'
    win: Boolean,
    timestamp: { type: Date, default: Date.now }
});

const Bet = mongoose.model('Bet', betSchema);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.post('/api/shoe', async (req, res) => {
    try {
        const { shoeId, numDecks = 8, burnCard } = req.body;
        let shoe = await Shoe.findOne({ shoeId });
        if (shoe) {
            return res.status(400).json({ error: 'Shoe already exists' });
        }
        
        // Validate deck count
        if (numDecks < 1 || numDecks > 8) {
            return res.status(400).json({ error: 'Invalid number of decks. Must be between 1 and 8.' });
        }
        
        // Validate burn card if provided
        if (burnCard && !['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'].includes(burnCard)) {
            return res.status(400).json({ error: 'Invalid burn card value' });
        }
        
        shoe = new Shoe({ 
            shoeId, 
            numDecks,
            burnCard,
            results: [] 
        });
        await shoe.save();
        res.json(shoe);
    } catch (error) {
        console.error('Error creating shoe:', error);
        res.status(500).json({ error: 'Failed to create shoe' });
    }
});

app.get('/api/shoe/:shoeId', async (req, res) => {
    try {
        const { shoeId } = req.params;
        const shoe = await Shoe.findOne({ shoeId });
        if (!shoe) {
            return res.status(404).json({ error: 'Shoe not found' });
        }
        res.json(shoe);
    } catch (error) {
        console.error('Error getting shoe:', error);
        res.status(500).json({ error: 'Failed to get shoe' });
    }
});

app.post('/api/shoe/:shoeId/result', async (req, res) => {
    try {
        const { shoeId } = req.params;
        const { result } = req.body;
        if (!['B', 'P'].includes(result)) {
            return res.status(400).json({ error: 'Invalid result' });
        }
        let shoe = await Shoe.findOne({ shoeId });
        if (!shoe) {
            shoe = new Shoe({ shoeId, results: [] });
        }
        shoe.results.push(result);
        shoe.updatedAt = new Date();
        await shoe.save();
        res.json({ message: 'Result added', shoe });
    } catch (error) {
        console.error('Error saving result:', error);
        res.status(500).json({ error: 'Failed to save result' });
    }
});

app.get('/api/shoe/:shoeId/predict', async (req, res) => {
    try {
        const { shoeId } = req.params;
        const { strategy = 'all' } = req.query;
        const shoe = await Shoe.findOne({ shoeId });
        if (!shoe) {
            return res.status(404).json({ error: 'Shoe not found' });
        }

        if (strategy === 'all') {
            const predictions = {};
            for (const [name, strategyFn] of Object.entries(predictionStrategies)) {
                predictions[name] = strategyFn(shoe.results);
            }
            const values = Object.values(predictions);
            const mostCommon = values.reduce((a, b) => 
                values.filter(v => v === a).length >= values.filter(v => v === b).length ? a : b
            );
            const confidence = values.filter(v => v === mostCommon).length / values.length;
            res.json({
                predictions,
                finalPrediction: mostCommon,
                confidence: Math.round(confidence * 100),
                method: 'combined'
            });
        } else if (predictionStrategies[strategy]) {
            const prediction = predictionStrategies[strategy](shoe.results);
            res.json({ prediction, method: strategy });
        } else {
            res.status(400).json({ error: 'Invalid strategy' });
        }
    } catch (error) {
        console.error('Error getting prediction:', error);
        res.status(500).json({ error: 'Failed to get prediction' });
    }
});

app.get('/api/shoe/:shoeId/stats', async (req, res) => {
    try {
        const { shoeId } = req.params;
        const shoe = await Shoe.findOne({ shoeId });
        if (!shoe) {
            return res.status(404).json({ error: 'Shoe not found' });
        }

        const results = shoe.results;
        const total = results.length;
        const bCount = results.filter(r => r === 'B').length;
        const pCount = results.filter(r => r === 'P').length;

        let currentStreak = 1;
        let maxStreak = 1;
        let currentType = results[0];
        
        for (let i = 1; i < results.length; i++) {
            if (results[i] === currentType) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 1;
                currentType = results[i];
            }
        }

        // Calculate remaining cards based on deck count
        const totalCards = shoe.numDecks * 52;
        const usedCards = total * 2; // Each result uses 2 cards minimum
        const remainingCards = totalCards - usedCards;
        const remainingPercentage = Math.round((remainingCards / totalCards) * 100);

        res.json({
            total,
            banker: {
                count: bCount,
                percentage: Math.round((bCount / total) * 100)
            },
            player: {
                count: pCount,
                percentage: Math.round((pCount / total) * 100)
            },
            maxStreak,
            deckInfo: {
                numDecks: shoe.numDecks,
                burnCard: shoe.burnCard,
                totalCards,
                remainingCards,
                remainingPercentage
            },
            lastUpdated: shoe.updatedAt
        });
    } catch (error) {
        console.error('Error getting statistics:', error);
        res.status(500).json({ error: 'Failed to get statistics' });
    }
});

// Add endpoint to update shoe settings
app.put('/api/shoe/:shoeId/settings', async (req, res) => {
    try {
        const { shoeId } = req.params;
        const { numDecks, burnCard } = req.body;
        
        const shoe = await Shoe.findOne({ shoeId });
        if (!shoe) {
            return res.status(404).json({ error: 'Shoe not found' });
        }
        
        // Validate deck count if provided
        if (numDecks !== undefined) {
            if (numDecks < 1 || numDecks > 8) {
                return res.status(400).json({ error: 'Invalid number of decks. Must be between 1 and 8.' });
            }
            shoe.numDecks = numDecks;
        }
        
        // Validate burn card if provided
        if (burnCard !== undefined) {
            if (burnCard && !['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'].includes(burnCard)) {
                return res.status(400).json({ error: 'Invalid burn card value' });
            }
            shoe.burnCard = burnCard;
        }
        
        shoe.updatedAt = new Date();
        await shoe.save();
        res.json(shoe);
    } catch (error) {
        console.error('Error updating shoe settings:', error);
        res.status(500).json({ error: 'Failed to update shoe settings' });
    }
});

// Add bets endpoints
app.get('/api/bets', async (req, res) => {
    try {
        const { shoeId } = req.query;
        const query = shoeId ? { shoeId } : {};
        const bets = await Bet.find(query).sort({ timestamp: -1 });
        res.json(bets);
    } catch (error) {
        console.error('Error getting bets:', error);
        res.status(500).json({ error: 'Failed to get bets' });
    }
});

app.post('/api/bets', async (req, res) => {
    try {
        const { shoeId, betType, amount } = req.body;
        if (!['B', 'P'].includes(betType)) {
            return res.status(400).json({ error: 'Invalid bet type' });
        }
        if (amount <= 0) {
            return res.status(400).json({ error: 'Invalid bet amount' });
        }

        const bet = new Bet({
            shoeId,
            betType,
            amount,
            result: null,
            win: null
        });
        await bet.save();
        res.json(bet);
    } catch (error) {
        console.error('Error creating bet:', error);
        res.status(500).json({ error: 'Failed to create bet' });
    }
});

app.put('/api/bets/:betId/result', async (req, res) => {
    try {
        const { betId } = req.params;
        const { result } = req.body;
        if (!['B', 'P'].includes(result)) {
            return res.status(400).json({ error: 'Invalid result' });
        }

        const bet = await Bet.findById(betId);
        if (!bet) {
            return res.status(404).json({ error: 'Bet not found' });
        }

        bet.result = result;
        bet.win = bet.betType === result;
        await bet.save();
        res.json(bet);
    } catch (error) {
        console.error('Error updating bet result:', error);
        res.status(500).json({ error: 'Failed to update bet result' });
    }
});

app.get('/api/bets/stats', async (req, res) => {
    try {
        const { shoeId } = req.query;
        const query = shoeId ? { shoeId } : {};
        
        const bets = await Bet.find(query);
        const totalBets = bets.length;
        const totalWins = bets.filter(bet => bet.win).length;
        const totalAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);
        const totalWinnings = bets
            .filter(bet => bet.win)
            .reduce((sum, bet) => sum + bet.amount, 0);

        res.json({
            totalBets,
            totalWins,
            winRate: totalBets > 0 ? (totalWins / totalBets * 100).toFixed(2) : 0,
            totalAmount,
            totalWinnings,
            netProfit: totalWinnings - totalAmount
        });
    } catch (error) {
        console.error('Error getting bet stats:', error);
        res.status(500).json({ error: 'Failed to get bet statistics' });
    }
});

// Add reset endpoint
app.post('/api/shoe/:shoeId/reset', async (req, res) => {
    try {
        const { shoeId } = req.params;
        const shoe = await Shoe.findOne({ shoeId });
        if (!shoe) {
            return res.status(404).json({ error: 'Shoe not found' });
        }
        
        // Clear results but keep shoe settings
        shoe.results = [];
        shoe.updatedAt = new Date();
        await shoe.save();
        
        res.json({ message: 'Shoe reset successfully', shoe });
    } catch (error) {
        console.error('Error resetting shoe:', error);
        res.status(500).json({ error: 'Failed to reset shoe' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));