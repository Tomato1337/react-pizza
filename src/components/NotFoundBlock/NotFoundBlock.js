import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {
    return (
        <div className="error_404">
            <div className="error_404_block">
                <img
                    src="https://cdn1.iconfinder.com/data/icons/webina-seo-development-and-marketing/128/seo_web-76-256.png"
                    alt=""
                />
                <h3>Ничего не найдено ;(</h3>
            </div>
        </div>
    )
}

export default NotFoundBlock
