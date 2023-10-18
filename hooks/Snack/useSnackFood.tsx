import { creatPlace } from "lib/game/snack"
import { useState } from "react"

interface Props {
    width: number;
    height: number;
}


const useSnackFood = ({ width, height }: Props) => {

    const [foodList, setFoodList] = useState<FoodItem[]>(creatPlace({ number: 10, width, height }))

    const deleteEatenFoodAndCreateNewFood = (eatFood: FoodItem) => {
        setFoodList(foodList.filter(food => food !== eatFood).concat(creatPlace({ number: 1, width, height })))
    }

    const foodsView = foodList.map((food, index) => <div key={index} className="food" style={{ left: food.x, top: food.y, background: food.background }}></div>)

    return { foodsView, foodList, setFoodList, deleteEatenFoodAndCreateNewFood }
}

export default useSnackFood