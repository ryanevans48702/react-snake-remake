import React, { useEffect } from 'react'
import Popup from 'reactjs-popup';
import '../App.css'

function PopupStart({dead, changeState, playing}) {

    useEffect(() => {
    }, [])

    return (
        <div>
            <Popup modal open={!playing && !dead} key={'23123'}>
                <div className='popup-div'>
                    <section className='start-title'>
                        Welcome To React Snake
                    </section>
                    <section>
                        Highscore: {localStorage.getItem('hs')}
                    </section>
                    <button onClick={() => changeState()}>start</button>
                </div>
            </Popup>
        </div>
    )
}

export default PopupStart