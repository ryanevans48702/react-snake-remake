import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import '../App.css'
function PopupEnd({dead, score}) {
    const [hs, setHs] = useState();
    const reset = () => {
        window.location.reload();
    }

    useEffect(() => {
        const temp = localStorage.getItem('hs')
        setHs(temp)
        console.log('dead' + dead)
        
        if(temp < score){      
            asyncCall();  
        }
    }, [dead])

    async function asyncCall() {
        localStorage.setItem('hs', score)   
        setHs(localStorage.getItem('hs'))  
      }
    
    return (
        <div>
            <Popup modal open={dead} key={'123'}>                         
                <div className='popup-div'>
                    <section className='end-game-over'>
                        Game Over!
                    </section>
                    <section className='end-score'>
                        Score: {score}
                    </section>
                    <section className='end-hs'>
                        Highscore: {hs}
                    </section>
                    <section className='end-play-div'>
                        <button className='end-play-button' onClick={() => reset()}>Play Again</button>
                    </section>


                </div>
            </Popup>
        </div>
    )
}

export default PopupEnd