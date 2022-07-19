import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FullPizza = () => {
    const { id } = useParams()
    const [pizza, setPizza] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    `https://62c875e00f32635590d909c9.mockapi.io/items?id=${id}`
                )
                setPizza(data)
            } catch (err) {
                alert(err.message)
                navigate('/')
            }
        }

        fetchPizza()
    }, [id])

    console.log(pizza)

    if (pizza.length === 0) {
        return <h1>Loading</h1>
    }

    return (
        <div className="pizza">
            <img src={pizza[0].imageUrl} alt="" />
            <h2>{pizza[0].title}</h2>
            <h4>{pizza[0].price} RUB</h4>
        </div>
    )
}

export default FullPizza
