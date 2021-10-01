import styles from './marker.module.scss';

export default function Marker(
    { name, openingHours }: { lat: Number, lng: Number, name: String, openingHours: Object }
) {
    return (
        <div className={styles.marker}>
            <span className={styles.name}>
                { name }
            </span>
        </div>
    );
}
