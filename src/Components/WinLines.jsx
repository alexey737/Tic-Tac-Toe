import React from "react"
import classNames from "classnames"

const WinLines = ({winner, winCombination}) => {

    const winLinesClasses = classNames('game__win-lines', 'win-lines', {
        'active' : winner !== ''
    })


    return (
        <div className={winLinesClasses}>
            <div className="win-lines__h-lines h-lines">
                <div className={`h-lines__h-line h-line1 win-line${winCombination === 0 ? ' active' : ''}`}></div>
                <div className={`h-lines__h-line h-line2 win-line${winCombination === 1 ? ' active' : ''}`}></div>
                <div className={`h-lines__h-line h-line3 win-line${winCombination === 2 ? ' active' : ''}`}></div>
            </div>
            <div className="win-lines__v-lines v-lines">
                <div className={`v-lines__v-line v-line1 win-line${winCombination === 3 ? ' active' : ''}`}></div>
                <div className={`v-lines__v-line v-line2 win-line${winCombination === 4 ? ' active' : ''}`}></div>
                <div className={`v-lines__v-line v-line3 win-line${winCombination === 5 ? ' active' : ''}`}></div>
            </div>
            <div className="win-lines__d-lines d-lines">
                <div className={`d-lines__d-line d-line1 win-line${winCombination === 6 ? ' active' : ''}`}></div>
                <div className={`d-lines__d-line d-line2 win-line${winCombination === 7 ? ' active' : ''}`}></div>
            </div>
        </div>
    )
}

export default WinLines