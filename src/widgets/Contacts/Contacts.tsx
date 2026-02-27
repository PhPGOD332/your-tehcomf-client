'use client'
import React from 'react';
import styles from './Contacts.module.scss';
import SubTitle from "@/shared/UI/SubTitle/SubTitle";

const Contacts = () => {
    return (
        <div className={styles.contacts}>
            <div className={'container'}>
                <div className={styles.wrapper}>
                    <div className={styles.mapBlock}>
                        <SubTitle classNames={styles.title}>Контакты</SubTitle>
                        <div className={styles.map}>
                            <div style={{position: "relative", overflow: "hidden"}}><a
                                href="https://yandex.ru/maps/org/tvoya_kukhnya/192446974752/?utm_medium=mapframe&utm_source=maps"
                                style={
                                    {
                                        color: "#eee",
                                        fontSize: "12px",
                                        position: "absolute",
                                        top: "0px",
                                    }
                                }>Твоя
                                кухня</a><a
                                href="https://yandex.ru/maps/213/moscow/category/kitchen_furniture/184107873/?utm_medium=mapframe&utm_source=maps"
                                style={
                                    {
                                        color: "#eee",
                                        fontSize: "12px",
                                        position: "absolute",
                                        top: "14px",
                                    }
                                }>Мебель для
                                кухни в Москве</a><a
                                href="https://yandex.ru/maps/213/moscow/category/cabinet_furniture/184107869/?utm_medium=mapframe&utm_source=maps"
                                style={
                                    {
                                        color: "#eee",
                                        fontSize: "12px",
                                        position: "absolute",
                                        top: "28px",
                                    }
                                }>Корпусная
                                мебель в Москве</a>
                                <iframe
                                    src="https://yandex.ru/map-widget/v1/?ll=37.671597%2C55.720210&mode=search&oid=192446974752&ol=biz&utm_medium=mapframe&utm_source=maps&z=17.06"
                                    width={560} height={400} allowFullScreen={true}
                                    style={{position: "relative"}}></iframe>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tableBlock}>
                        <table className={styles.contactsTable}>
                            <tbody>
                            <tr className={`${styles.tableRow} ${styles.phoneRow}`}>
                                <td>
                                    <span className={styles.tableSubTitle}>Телефон</span>
                                </td>
                                <td>
                                    <span className={styles.phone}>+7 (495) 988-55-28</span>
                                </td>
                            </tr>
                            <tr className={styles.tableRow}>
                                <td className={styles.tableSubTitle}>Адрес офиса</td>
                                <td className={styles.tableTextContent}>
                                    <span
                                        className={styles.tableMainText}>г. Зеленоград, Московская область</span><br/>
                                    <div className={styles.metroBlock}>
                                        <svg width="18" height="12" viewBox="0 0 18 12" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_1824_10572)">
                                                <path
                                                    d="M16.7979 10.3236L12.7187 0L9.26819 6.03492L5.83164 0L1.73851 10.3236H0.537109V11.8882H6.71173V10.3236H5.78973L6.68379 7.7532L9.26819 12L11.8526 7.7532L12.7467 10.3236H11.8247V11.8882H17.9993V10.3236H16.7979Z"
                                                    fill="#FF0013"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1824_10572">
                                                    <rect width="17.4622" height="12" fill="white"
                                                          transform="translate(0.537109)"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <span className={styles.tableSubText}>Дубровка, Волгоградский проспект</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className={styles.tableRow}>
                                <td className={styles.tableSubTitle}>Адрес производства</td>
                                    <td className={styles.tableTextContent}>
                                            <span
                                                className={styles.tableMainText}>г. Ульяновск, <br className={styles.transfer}/>42 Инженерный проезд, д. 6</span>
                                    </td>
                                </tr>
                                <tr className={styles.tableRow}>
                                    <td className={styles.tableSubTitle}>E-mail</td>
                                    <td className={styles.tableTextContent}>
                                        <span className={styles.tableMainText}>info@tehcomf.ru</span>
                                    </td>
                                </tr>
                                <tr className={styles.mapRow}>
                                    <td className={styles.mapCol}>
                                        <div style={{position: "relative", overflow: "hidden"}}><a
                                            href="https://yandex.ru/maps/org/tvoya_kukhnya/192446974752/?utm_medium=mapframe&utm_source=maps"
                                            style={
                                                {
                                                    color: "#eee",
                                                    fontSize: "12px",
                                                    position: "absolute",
                                                    top: "0px",
                                                }
                                            }>Твоя
                                            кухня</a><a
                                            href="https://yandex.ru/maps/213/moscow/category/kitchen_furniture/184107873/?utm_medium=mapframe&utm_source=maps"
                                            style={
                                                {
                                                    color: "#eee",
                                                    fontSize: "12px",
                                                    position: "absolute",
                                                    top: "14px",
                                                }
                                            }>Мебель для
                                            кухни в Москве</a><a
                                            href="https://yandex.ru/maps/213/moscow/category/cabinet_furniture/184107869/?utm_medium=mapframe&utm_source=maps"
                                            style={
                                                {
                                                    color: "#eee",
                                                    fontSize: "12px",
                                                    position: "absolute",
                                                    top: "28px",
                                                }
                                            }>Корпусная
                                            мебель в Москве</a>
                                            <iframe
                                                src="https://yandex.ru/map-widget/v1/?ll=37.671597%2C55.720210&mode=search&oid=192446974752&ol=biz&utm_medium=mapframe&utm_source=maps&z=17.06"
                                                width={560} height={400} allowFullScreen={true}
                                                style={{position: "relative"}}></iframe>
                                        </div>
                                    </td>
                                </tr>
                            <tr className={`${styles.tableRow} ${styles.titleRow}`}>
                                <td className={styles.titleCol}>
                                    <SubTitle>Реквизиты</SubTitle>
                                </td>
                            </tr>
                            <tr className={styles.tableRow}>
                                <td className={styles.tableSubTitle}>Юридическое лицо</td>
                                <td className={styles.tableTextContent}>
                                    <span className={styles.tableMainText}>ООО «ТК»</span>
                                </td>
                            </tr>
                            <tr className={styles.tableRow}>
                                <td className={styles.tableSubTitle}>ИНН</td>
                                    <td className={styles.tableTextContent}>
                                        <span className={styles.tableMainText}>9701160947</span>
                                    </td>
                                </tr>
                                <tr className={styles.tableRow}>
                                    <td className={styles.tableSubTitle}>ОГРН</td>
                                    <td className={styles.tableTextContent}>
                                        <span className={styles.tableMainText}>1207700295824</span>
                                    </td>
                                </tr>
                                <tr className={`${styles.tableRowOneCol} ${styles.tableNote}`}>
                                    <td className={styles.tableTextNote}>
                                        Свяжитесь с нами любым удобным способом — мы с радостью поможем подобрать идеальную мебель, ответим на все вопросы и предложим лучшие условия покупки!
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;