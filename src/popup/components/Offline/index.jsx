import React from 'react';
import style from './style.css';

// ## //

export default class Offline extends React.Component {
    render() {
        return (
            <div className={style.block}>
                L’ArmaTeam est hors-ligne. :(
            </div>
        );
    }
}
