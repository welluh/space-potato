import { useState } from 'react';
import styles from './marker.module.scss';

export default function Marker(
    { name, openingHours }: { lat: Number, lng: Number, name: String, openingHours: Object }
) {
    const [ active, setActive ] = useState(false);

    const weekdays = {
        '1': 'Ma',
        '2': 'Ti',
        '3': 'Ke',
        '4': 'To',
        '5': 'Pe',
        '6': 'La',
        '7': 'Su',
    };

    return (
        <div 
            className={!active ? styles.marker : `${styles.marker} ${styles.markerActive}`} 
            onClick={() => setActive(!active)}
            tabIndex={0}
        >
            <div className={styles.name}>
                { name }
            </div>

            <div className={!active ? styles.info : `${styles.info} ${styles.infoActive}`} >
                <h2>{ name }</h2>

                <div className={styles.hours}>
                    <div>
                        {
                            openingHours?.hours?.filter(hours => !!hours.opens).map((hours: Object) => {
                                return (
                                    <>
                                        <span>
                                            {weekdays[hours.weekday_id]}:
                                        </span>
                                        <span>
                                            {hours.opens} - {hours.closes}
                                        </span>       
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
