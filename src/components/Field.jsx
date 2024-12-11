function Field ( {label, name, value} ){
    return(
        <div className="field">
        <label>{label}</label>
        <input defaultValue={value} type="text" name={name} />
    </div>
    )
}
export default Field;