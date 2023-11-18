import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import PopupEnd from './components/PopupEnd';
import PopupStart from './components/PopupStart';

function App() {
  const [snake, setSnake] = useState([[400, 400]]);
  const [direction, setDirection] = useState('');
  const [newDirection, setNewDirection] = useState([40, 0]);
  const [apple, setApple] = useState([120, 400]);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [dead, setDead] = useState(false);
  const canvasRef = useRef();

  const detectKeyDown = (e) => {
    // Update the direction state based on the keyboard input, but only if it's a new direction
    if (e.key === 'ArrowRight' && direction !== 'right' && direction !== 'left' || e.key === 'd' && direction !== 'right' && direction !== 'left') {
      setNewDirection([40, 0]);
      setDirection('right');
    } else if (e.key === 'ArrowLeft' && direction !== 'left' && direction !== 'right' || e.key === 'a' && direction !== 'left' && direction !== 'right') {
      setNewDirection([-40, 0]);
      setDirection('left');
    } else if (e.key === 'ArrowUp' && direction !== 'up' && direction !== 'down' || e.key === 'w' && direction !== 'up' && direction !== 'down' ) {
      setNewDirection([0, -40]);
      setDirection('up');
    } else if (e.key === 'ArrowDown' && direction !== 'down' && direction !== 'up' || e.key === 's' && direction !== 'down' && direction !== 'up') {
      setNewDirection([0, 40]);
      setDirection('down');
    }
  };

  const changeState = () => {
    setPlaying(true);
  };

  const generateNewApple = () => {
    const temp1 = 40 * Math.floor(Math.random() * 10);
    const temp2 = 40 * Math.floor(Math.random() * 10);
    return [temp1, temp2];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
  
    const gameLoop = setInterval(() => {
      if (playing && ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const newSnake = snake.map((segment, index) =>
          index === 0
            ? [segment[0] + newDirection[0], segment[1] + newDirection[1]]
            : snake[index - 1]
        );
  
        setSnake(newSnake);
  
        for (let i = 1; i < newSnake.length; i++) {
          if (newSnake[i][0] === newSnake[0][0] && newSnake[i][1] === newSnake[0][1]) {
            setPlaying(false);
            setDead(true);
            console.log(dead)
            clearInterval(gameLoop);
            break;
          }
        }
  
        if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
          setApple(generateNewApple());
          setScore(score + 1);
          setSnake([...newSnake, snake[snake.length - 1]]);
        }
  
        // Render the snake
        newSnake.forEach((segment, index) => {
          ctx.fillStyle = index === 0 ? 'green' : 'limegreen'; // Green for head, lime green for the body
          ctx.fillRect(segment[0], segment[1], 40, 40);
        });
  
        ctx.fillStyle = 'red';
        ctx.fillRect(apple[0], apple[1], 40, 40);
      }
    }, 100);
  
    return () => {
      clearInterval(gameLoop);
    };
  
  }, [snake, newDirection, playing, apple, score]);


  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown);
    return () => {
      document.removeEventListener('keydown', detectKeyDown);
    };
  }, [direction]);

  return (
    <div className="App">
      <div className='container'>
        <div>
          <div className='score'>Score: {score}</div>
          <canvas width={800} height={800} ref={canvasRef}></canvas>
        </div>
      </div>
      <PopupEnd dead={dead} score={score} playing={playing}/>
      <PopupStart dead={dead} changeState={changeState} playing={playing}/>

    </div>
  );
}

export default App;
