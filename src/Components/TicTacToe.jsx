import React, {useEffect, useState} from "react"
import GameFields from "./GameFields"
import WinLines from "./WinLines"
import classNames from "classnames"

const TicTacToe = () => {
    const [gameFields, setGameFields] = useState([
        {id: 1, fill: '', active: false}, {id: 2, fill: '', active: false}, {id: 3, fill: '', active: false},
        {id: 4, fill: '', active: false}, {id: 5, fill: '', active: false}, {id: 6, fill: '', active: false},
        {id: 7, fill: '', active: false}, {id: 8, fill: '', active: false}, {id: 9, fill: '', active: false}
    ])
    const [player, setPlayer] = useState('cross')
    const [winner, setWinner] = useState('')
    const [winCombination, setWinCombination] = useState('')
    const [countFilledFields, setCountFilledFields] = useState(0)
    const [restartGame, setRestartGame] = useState(false)

    useEffect(() => {
        if (restartGame) {
            const newGameFields = gameFields.map((item, index) => {
                return {id: index + 1, fill: '', active: false}
            })
            setGameFields(newGameFields)
            setPlayer('cross')
            setWinner('')
            setWinCombination('')
            setRestartGame(false)
        }
    }, [restartGame])

    const handlerRestartGame = () => {
        setRestartGame(true)
        setCountFilledFields(0)
    }

    const arrowClasses = classNames('game__arrow', `${player}`)

    return (
        <div className="game">
            <div className="game__info">
                <div className="game__player1">Player 1</div>
                <div className={arrowClasses}>
                    <i className="fa-solid fa-arrow-left-long"></i>
                </div>
                <div className="game__player2">Player 2</div>
            </div>
            <div className="game__container _container">
                <GameFields
                    gameFields={gameFields}
                    setGameFields={setGameFields}
                    setWinner={setWinner}
                    setWinCombination={setWinCombination}
                    player={player}
                    setPlayer={setPlayer}
                    restartGame={restartGame}
                    countFilledFields={countFilledFields}
                    setCountFilledFields={setCountFilledFields}
                />
                <WinLines winner={winner} winCombination={winCombination} />
            </div>
            {
                winner === 'cross' ? <div className="game__winner">Winner: Player 1</div> :
                    winner === 'zero' ? <div className="game__winner">Winner: Player 2</div> :
                        winner === '' && countFilledFields === 9 ? <div className="game__winner">Draw</div> : ''
            }
            <button onClick={handlerRestartGame} className="game__restart-btn">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Restart
            </button>
        </div>
    )
}

export default TicTacToe