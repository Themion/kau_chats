export function Chat({nickname, chat}) {
    return (
        <div className={styles.chat}>
            {nickname}: {chat}
        </div>
    )
}

export function Announce() {
    return (
        <div className={styles.announce} align="center">
            <hr className={styles.hr} />

            <hr className={styles.hr} />
        </div>
    )
}