import classes from './Loader.module.scss';

function Loader(props) {
    return (
    <div className={classes["loader-container"]}>
        <div className={classes.spinner}></div>
    </div>);
}

export default Loader;