function Field ( {label, name} ){
    return(
        <div className="field">
        <label>{label}</label>
        <input type="text" name={name} />
    </div>
    )
}
export default Field;