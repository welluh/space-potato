import React, { useState } from 'react';
import styles from './marker.module.scss';

const weekdays = {
    '1': 'Ma',
    '2': 'Ti',
    '3': 'Ke',
    '4': 'To',
    '5': 'Pe',
    '6': 'La',
    '7': 'Su',
};

export default function Marker(
    { place, name, openingHours, dispatch }: { place: Object, lat: Number, lng: Number, name: String, openingHours: Object, dispatch: Function }
) {
    const [ active, setActive ] = useState(false);

    function onClick() {
        setActive(!active);
        dispatch({
            type: !active ? 'open' : 'close',
            payload: { active: !active, place },
        });
    }

    return (
        <div 
            className={!active ? styles.marker : `${styles.marker} ${styles.markerActive}`} 
            onClick={onClick}
            tabIndex={0}
        >
            <div className={styles.name}>
                { name }
            </div>

            <div className={!active ? styles.info : `${styles.info} ${styles.infoActive}`} >
                <h2>{ name }</h2>

                <div className={styles.hours}>
                    {
                        openingHours?.hours?.filter(hours => !!hours.opens).map((hours: Object, index: number) => {
                            return (
                                <React.Fragment key={index}>
                                    <span>
                                        {weekdays[hours.weekday_id]}:
                                    </span>
                                    <span>
                                        {hours.opens} - {hours.closes}
                                    </span>       
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
