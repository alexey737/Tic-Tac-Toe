import React, {useEffect, useState} from 'react'
import FieldCross from "./FieldCross"
import FieldZero from "./FieldZero"
import classNames from "classnames"

const GameFields = ({gameFields, setGameFields, setWinner, setWinCombination, player, setPlayer, restartGame, countFilledFields, setCountFilledFields}) => {
    const [crossFields, setCrossFields] = useState([])
    const [zeroFields, setZeroFields] = useState([])

    const winCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ]

    useEffect(() => {
        if (restartGame) {
            setCrossFields([])
            setZeroFields([])
        }
    }, [restartGame])

    useEffect(() => {
        let check = 0
        if (crossFields.length >= 3) {
            for (let i = 0; i < winCombinations.length; i++) {
                for (const crossField of crossFields) {
                    check = winCombinations[i].includes(crossField) ? ++check : check
                }
                if (check === 3) {
                    setWinner('cross')
                    const newGameFields = gameFields.map(item => {
                        return {...item, active: true}
                    })
                    setGameFields(newGameFields)
                    setWinCombination(i)
                    break
                } else {
                    check = 0
                }
            }
        }
    }, [crossFields])

    useEffect(() => {
        if (zeroFields.length > 0) {
            let check = 0
            if (crossFields.length >= 3) {
                for (let i = 0; i < winCombinations.length; i++) {
                    for (const zeroField of zeroFields) {
                        check = winCombinations[i].includes(zeroField) ? ++check : check
                    }
                    if (check === 3) {
                        setWinner('zero')
                        const newGameFields = gameFields.map(item => {
                            return {...item, active: true}
                        })
                        setGameFields(newGameFields)
                        setWinCombination(i)
                        break
                    } else {
                        check = 0
                    }
                }
            }
        }
    }, [zeroFields])


    const handlerPlayerTurn = event => {
        const id = +event.currentTarget.ariaValueText;
        const newGameFields = gameFields.map(item => item.id === id ? {id: id, fill: player, active: true} : item)
        setGameFields(newGameFields)
        player === 'cross' ? setCrossFields([...crossFields, id]) : setZeroFields([...zeroFields, id])
        setPlayer(player === 'cross' ? 'zero' : 'cross')
        setCountFilledFields(countFilledFields + 1)
    }

    const displayGameFields = () => {
        return gameFields.map(item => {
            const gameFieldClasses = classNames('game__field', 'field', {'active': item.active})
            return (
                <div onClick={handlerPlayerTurn} key={item.id} aria-valuetext={`${item.id}`}
                     className={gameFieldClasses}>
                    {item.fill === 'cross' ? <FieldCross/> : item.fill === 'zero' ? <FieldZero/> : ''}
                </div>
            )
        })
    }

    return (
        <>
            {displayGameFields()}
        </>
    )
}

export default GameFields
