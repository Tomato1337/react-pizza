import React from 'react'
import { nanoid } from 'nanoid'
import ContentLoader from 'react-content-loader'

const Skeleton = (props) => {
    return (
        <ContentLoader
            speed={2}
            key={nanoid()}
            width={280}
            className="pizza-block"
            height={465}
            viewBox="0 0 280 465"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="132" y="94" rx="0" ry="0" width="1" height="34" />
            <circle cx="128" cy="127" r="128" />
            <rect x="210" y="276" rx="0" ry="0" width="3" height="13" />
            <rect x="0" y="269" rx="10" ry="10" width="275" height="22" />
            <rect x="177" y="294" rx="0" ry="0" width="68" height="0" />
            <rect x="0" y="307" rx="10" ry="10" width="275" height="88" />
            <rect x="0" y="414" rx="10" ry="10" width="95" height="30" />
            <rect x="127" y="406" rx="25" ry="25" width="152" height="45" />
            <rect x="198" y="433" rx="0" ry="0" width="9" height="1" />
        </ContentLoader>
    )
}

export default Skeleton
