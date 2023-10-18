import { createRuleHash } from "lib/game/snack"
import { useEffect, useState } from "react"




const useDirection = () => {
    const [isRun, setIsRun] = useState<boolean>(false)
    const [direction, setDirection] = useState<Direction>('ArrowDown')
    const [speed, setSpeed] = useState<number>(200)
    const rules = createRuleHash(direction)
    const currentRule = rules[direction]

    const changeDirection = (newDirection: Direction,) => {
        if (direction !== newDirection) {
            if (rules[newDirection].constraint) {
                setDirection(newDirection)
            }
        }
    }


    const changeSpeed = (speed: number) => {
        setSpeed(speed)
    }
    useEffect(() => {
        document.body.onkeydown = e => {
            if (e.code === 'KeyQ') {
                setSpeed(80)
            }
            if (e.code === 'Space') {
                setIsRun(!isRun)
            }
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
                const newDirection = e.code as Direction
                changeDirection(newDirection)
            }
        }
        document.body.onkeyup = e => {
            if (e.code === 'KeyQ') {
                setSpeed(200)
            }
        }
    }, [isRun, direction])

    return { direction, setIsRun, changeDirection, rules, currentRule, isRun, speed, changeSpeed, setDirection }
}
export default useDirection