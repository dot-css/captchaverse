import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity } from 'react-native-web';
import { FaSyncAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const difficulties = {
  easy: { time: 10, points: { correct: 1, wrong: -2 } },
  medium: { time: 5, points: { correct: 5, wrong: -5 } },
  hard: { time: 3, points: { correct: 10, wrong: -5 } },
};

const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 7 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const Captchaverse = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(difficulties[difficulty].time);
  const [uc, setUc] = useState(0);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current; // Set initial value to 1

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setTimer(difficulties[difficulty].time);
  };
  useEffect(() => {
    setTimer(difficulties[difficulty].time);
    setCaptcha(generateCaptcha());
  }, [difficulty]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev > 0) return prev - 1;
        refreshCaptcha();
        return difficulties[difficulty].time;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [difficulty]);

  const handleSubmit = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    const points = userInput === captcha ? difficulties[difficulty].points.correct : difficulties[difficulty].points.wrong;
    setUc(prev => Math.max(0, prev + points));
    toast[userInput === captcha ? 'success' : 'error'](
      `${userInput === captcha ? 'Correct' : 'Wrong'}! ${userInput === captcha ? `You earned ${points} UC.` : `You lost ${-points} UC.`}`
    );

    refreshCaptcha();
    setUserInput('');
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
 };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Captchaverse</Text>
        <Text style={styles.uc}>UC {uc}</Text>
      </View>

      <View style={styles.difficultyButtons}>
        {Object.keys(difficulties).map(level => (
          <TouchableOpacity
            key={level}
            style={[styles.button, difficulty === level && styles.activeButton]}
            onPress={() => handleDifficultyChange(level)}
          >
            <Text style={styles.buttonText}>{level.charAt(0).toUpperCase() + level.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Animated.View style={[styles.captchaContainer, { opacity: fadeAnim }]}>
        <Text style={styles.captchaText}>{captcha}</Text>
        <TouchableOpacity onPress={refreshCaptcha}>
          <FaSyncAlt style={styles.refreshIcon} />
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.timer}>Time left: {timer}s</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter CAPTCHA"
        value={userInput}
        onChangeText={setUserInput}
      />

      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>

      <ToastContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1f1f1f', padding: 20, justifyContent: 'center', alignItems: 'center', minHeight: '100vh' },
  headerContainer: { width: '90%', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: 20, left: 20, right: 20 },
  title: { color: '#FFF', fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  uc: { color: '#FFF', fontSize: 20, textAlign: 'center' },
  difficultyButtons: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 20},
  button: { padding: 15, borderRadius: 5, backgroundColor: '#333', marginHorizontal: 10, flex: 1, alignItems: 'center'},
  activeButton: { backgroundColor: '#7A1CAC' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  captchaContainer: { flexDirection: 'row',  padding: 15,justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginVertical: 50, borderRadius: 5, borderColor: '#333', borderWidth: 1, backgroundColor: '#2c2c2c'},
  captchaText: { fontSize: 32, color: '#FFF', fontFamily: 'monospace' },
  refreshIcon: { marginLeft: 10, cursor: 'pointer', color: '#FFF' },
  timer: { fontSize: 18, color: '#fff', marginBottom: 50 },
  input: { fontSize: 18, width: '100%', padding: 20, borderRadius: 5, borderColor: '#333', borderWidth: 1, color: '#FFF', backgroundColor: '#2c2c2c', marginBottom: 20 },
  submitButton: { width: '100%', paddingVertical: 10, paddingHorizontal: 50, borderRadius: 5, backgroundColor: '#7A1CAC', alignItems: 'center', justifyContent: 'center' },
  submitButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default Captchaverse;
