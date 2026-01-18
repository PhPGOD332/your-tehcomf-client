import React, {JSX} from 'react';
import styles from './Advantages.module.scss';

export interface IAdvantageEl {
    icon: JSX.Element;
    text: string;
}

interface AdvantagesProps {
    elements: IAdvantageEl[];
}

const Advantages = (
    {
        elements
    }: AdvantagesProps
) => {
    return (
        <div className='container'>
            <div className={styles.wrapper} style={{ gridTemplateColumns: `repeat(${elements.length}, 1fr)` }}>
                {elements.map((el, num) =>
                    <div className={styles.advantageItem} key={num}>
                        <div className={styles.advantageImage}>
                            { el.icon }
                        </div>
                        <span className={styles.advantageText}>{ el.text }</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Advantages;