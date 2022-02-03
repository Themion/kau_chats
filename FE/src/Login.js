import React, {useState, useEffect} from 'react';

function Login() {
    const [nickname, set] = useState()

    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            /* {<Redirect
                to={{
                    pathname: "/",
                    state: {nickname: nickname}
                }} />} */
        }}>
            <input type="text" onChange={(event) => {
                set(event.target.value)
            }}/>
        </form>
    )
}

export default Login