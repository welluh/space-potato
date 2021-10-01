import styles from './drawer.module.scss';

export default function Drawer({ active, place, dispatch } : { active: boolean, place: Object, dispatch: Function }) {
    function onClick() {
        dispatch({
            type: 'close',
            payload: null,
        });
    }

    return (
        <aside className={!active ? styles.drawer : `${styles.drawer} ${styles.drawerActive}`}>
            { active
                ? <DrawerContent place={place} />
                : ''
            }

            <button onClick={onClick}>
                Close
            </button>
        </aside>
    )
}

function DrawerContent({ place }: { place: Object }) {
    return (
        <div className={styles.content}>
            <div className={styles.name}>
                <h1>{place.name.fi}</h1>
                <p>{place.name.sv}</p>
            </div>

            <div className="spacer"></div>

            <div className={styles.address}>
                <p>
                    {place.location.address.street_address} <br />
                    {place.location.address.postal_code} {place.location.address.locality}
                </p>
            </div>
        </div>
    )
}