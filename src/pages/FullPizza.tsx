import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FullPizza: React.FC = () => {
    const { id } = useParams()
    const [pizza, setPizza] = useState<{
        imageUrl: string
        title: string
        price: number
    }>({
        imageUrl: '',
        title: '',
        price: 0,
    })
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    `https://62c875e00f32635590d909c9.mockapi.io/items/${id}`
                )
                setPizza(data)
            } catch (err) {
                alert('Ошибка')
                navigate('/')
            }
        }

        fetchPizza()
    }, [id])

    console.log(pizza)

    if (!pizza) {
        return <h2>Loading</h2>
    }

    return (
        <div className="pizza">
            <img src={pizza.imageUrl} alt="" />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} RUB</h4>
        </div>
    )
}

export default FullPizza
